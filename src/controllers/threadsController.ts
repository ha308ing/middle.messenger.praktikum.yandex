import UsersAPI from "@/api/usersAPI";
import avatarFix, { avatarFixObj } from "@/utils/avatarFix";
import threadsAPI from "@/api/threadsAPI";
import { type User, type Thread } from "@/types/types.api";
import STORE, { StoreEvents } from "@/system/store";
import router from "@/system/router";
// import threadsAPI from "@/api/threadsAPI";
// import wsController from "./wsController";
// import router from "@/system/router";
// import Router from "@/system/Router";
// import sb from "@/system/State";

type ThreadsAndAvatars = {
  threads: Thread[];
  avatars: Record<number, { avatar: string }>;
};

class ThreadsController {
  public async getThreads(offset?: number, limit?: number, title?: string): Promise<ThreadsAndAvatars> {
    const response = await threadsAPI.getThreads(offset, limit, title);
    if (response == null) return { threads: [], avatars: {} };
    const responseFormed = response.reduce(
      (acc: ThreadsAndAvatars, t: Thread) => {
        if (t == null) return acc;
        const t_ = avatarFixObj(t) as Thread;
        if (t_.id == null) return acc;
        acc.threads = [...acc.threads, t_];
        acc.avatars[t_.id] = { avatar: t_.avatar };
        return acc;
      },
      { threads: [], avatars: {} }
    );
    return responseFormed;
  }

  public async updateThreads() {
    const threadsAndAvatars = await this.getThreads();
    STORE.set("threads", threadsAndAvatars.threads);
    STORE.set("threads_", threadsAndAvatars.avatars);

    threadsAndAvatars.threads.forEach(thread => {
      STORE.emit(StoreEvents.gotThread, thread);
    });
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
    this.updateThreads().then(
      () => {
        STORE.set("activeThread", newThreadId);
        router.go("/messenger");
      }
      // rej => {}
    );
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
    // STORE.emit(StoreEvents.updateUsers, formattedUsers);
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
    console.log(response);
    if (response) {
      STORE.set("activeThread", null);
      router.go("/messenger");
      this.updateThreads().then(() => {
        return true;
      });
    }
  }
}

export default new ThreadsController();
