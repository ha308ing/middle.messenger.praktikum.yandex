import UsersAPI from "@/api/usersAPI";
import avatarFix, { avatarFixObj } from "@/utils/avatarFix";
import threadsAPI from "@/api/threadsAPI";
import { type User, type Thread } from "@/types/types.api";
import STORE, { StoreEvents } from "@/system/store";
import router from "@/system/router";
import wsController from "./wsController";
import sweater from "@/assets/sweater.png";

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
          STORE.set(`threads_.${t.id}.users`, res);
        }
      });
      acc[t_.id] = t_;
      return acc;
    }, {});
    return responseFormed;
  }

  public async updateThreads() {
    const threads = await this.getThreads();
    STORE.set("threads_", threads);
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
    STORE.set("threads_", { [newThreadId]: { id: newThreadId, title, avatar: sweater, users: [STORE.get("user")] } });
    STORE.emit(StoreEvents.activateThread, newThreadId);

    return null;
  }

  public async findUser(login: string) {
    const response = await UsersAPI.findUsers(login);
    if (response === false) return false;
    const foundUsers = response.reduce((acc: User[], user: User) => {
      let { id, login, avatar } = user;
      avatar = avatarFix(avatar);
      return [...acc, { id, login, avatar, isMember: false }];
    }, []);
    STORE.emit(StoreEvents.findUsers, foundUsers);
    return true;
  }

  public async addUsers(userId: number, threadId: number) {
    const response = await threadsAPI.addUsers(userId, threadId);
    if (response === false) {
      alert("Failed to add user");
      return false;
    }
    const users = await this.getThreadUsers(threadId);
    STORE.emit(StoreEvents.updateUsers, users);
    return true;
  }

  public async getThreadUsers(threadId: number) {
    const response = await threadsAPI.getThreadUsers(threadId);

    if (response === false) return false;

    const formattedUsers = response.reduce((acc: Array<Pick<User, "id" | "login" | "avatar">>, user: User) => {
      let { id, login, avatar } = user;
      avatar = avatarFix(avatar);
      return [...acc, { id, login, avatar }];
    }, []);
    STORE.set(`threads_.${threadId}.users`, formattedUsers);
    return formattedUsers;
  }

  public async removeUsers(userId: number, threadId: number) {
    const response = await threadsAPI.removeUsers(userId, threadId);
    if (!response) {
      alert("Failed to remove user");
      return false;
    }
    const users = await this.getThreadUsers(threadId);
    STORE.emit(StoreEvents.updateUsers, users);
    return true;
  }

  public async removeThread(threadId: number) {
    const response = await threadsAPI.removeThread(threadId);
    if (response) {
      wsController.sockets[threadId].close();
      STORE.set("activeThread", null);
      STORE.set(`threads_.${threadId}`, null);
      router.go("/messenger");

      this.updateThreads();
    }
    return true;
  }
}

export default new ThreadsController();
