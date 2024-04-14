import UsersAPI from "@/api/usersAPI";
import { avatarFix, avatarFixObj } from "@/utils/avatarFix";
import threadsAPI from "@/api/threadsAPI";
import { type User, type Thread } from "@/types/types.api";
import store, { StoreEvents } from "@/system/store";
import router from "@/system/router";
import wsController from "./wsController";
import { brandImage } from "@/system/consts";

type Threads = Record<number, { avatar: string }>;

class ThreadsController {
  public async getThreads(offset?: number, limit?: number, title?: string): Promise<Threads> {
    const response = await threadsAPI.getThreads(offset, limit, title);
    if (response == null) return {};
    const responseFormed = response.reduce((acc: Threads, t: Thread) => {
      if (t == null) return acc;
      const t_ = avatarFixObj(t) as Thread;
      if (t_.id == null) return acc;
      wsController.connect(t.id);
      this.getThreadUsers(t.id).then(res => {
        if (res != null) {
          store.set(`threads_.${t.id}.users`, res);
        }
      });
      acc[t_.id] = t_;
      return acc;
    }, {});
    return responseFormed;
  }

  public async updateThreads() {
    const threads = await this.getThreads();
    store.set("threads_", threads);
  }

  public async createThread() {
    const titleRegexp = /\w{5,}/;
    let title: string | null = "";
    do {
      title = prompt("Enter thread title (at least 5 letters): ", "Thread");
      if (title === null) return null;
    } while (!titleRegexp.test(title));

    const response = await threadsAPI.createThread(title);

    if (response == null) {
      alert("Failed to create thread");
      return null;
    }
    const { id: newThreadId } = response;
    await wsController.connect(newThreadId);
    store.set("threads_", {
      [newThreadId]: { id: newThreadId, title, avatar: brandImage, users: [store.get("user")] },
    });
    store.emit(StoreEvents.activateThread, newThreadId);

    return null;
  }

  public async findUser(login: string) {
    const response = await UsersAPI.findUsers(login);
    if (response === false) return false;
    const activeThreadId = store.get("activeThread");

    const members = store.get(`threads_.${activeThreadId}.users`) as User[];

    const foundUsers = response.reduce((acc: User[], user: User) => {
      let { id, login, avatar } = user;
      if (members.find(m => m.id === id) != null) {
        return acc;
      }
      avatar = avatarFix(avatar);
      return [...acc, { id, login, avatar, isMember: false, class: "foundUser" }];
    }, []);
    store.emit(StoreEvents.findUsers, foundUsers);
    return true;
  }

  public async addUsers(userId: number, threadId: number) {
    const { result, message } = await threadsAPI.addUsers(userId, threadId);
    alert(message);
    if (!result) {
      return false;
    }
    await this.getThreadUsers(threadId);
    return true;
  }

  public async getThreadUsers(threadId: number) {
    const response = await threadsAPI.getThreadUsers(threadId);

    if (response === false) return false;

    const formattedUsers = response.reduce((acc: Array<Pick<User, "id" | "login" | "avatar" | "role">>, user: User) => {
      let { id, login, avatar, role } = user;
      const isCurrentUser = id === store.get("user.id");
      const isAdmin = role === "admin";

      avatar = avatarFix(avatar);
      return [...acc, { id, login, avatar, role, isAdmin, isCurrentUser }];
    }, []);
    store.set(`threads_.${threadId}.users`, formattedUsers);
    return formattedUsers;
  }

  public async removeUsers(userId: number, threadId: number) {
    const { result, message } = await threadsAPI.removeUsers(userId, threadId);
    alert(message);
    if (!result) {
      return false;
    }
    await this.getThreadUsers(threadId);
    return true;
  }

  public async removeThread(threadId: number) {
    const { message } = await threadsAPI.removeThread(threadId);
    alert(message);
    wsController.sockets[threadId].close();
    store.set("activeThread", null);
    store.set(`threads_.${threadId}`, null);
    router.go("/messenger");
    this.updateThreads();
    return true;
  }
}

export default new ThreadsController();
