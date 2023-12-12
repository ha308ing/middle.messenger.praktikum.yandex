import UsersAPI from "@/api/usersAPI";
import avatarFix from "@/utils/avatarFix";
import threadsAPI from "@/api/threadsAPI";
import { type Thread } from "@/types/types.api";
import STORE, { StoreEvents } from "@/system/store";
import router from "@/system/router";
// import threadsAPI from "@/api/threadsAPI";
// import wsController from "./wsController";
// import router from "@/system/router";
// import Router from "@/system/Router";
// import sb from "@/system/State";

class ThreadsController {
  public async getThreads(offset?: number, limit?: number, title?: string): Promise<Thread[]> {
    const response = await threadsAPI.getThreads(offset, limit, title);
    if (response == null) return [];
    return response;
  }

  // public async saveThreads() {
  public async updateThreads() {
    const threads = await this.getThreads();
    const threadsMod: Thread[] = [];

    threads.forEach(thread => {
      thread.avatar = avatarFix(thread.avatar);
      threadsMod.push({ ...thread });
      STORE.emit(StoreEvents.gotThread, thread);
    });
    STORE.set("threads", threadsMod);
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
    const responseJson = JSON.parse(response);
    const { id: newThreadId } = responseJson;
    this.updateThreads().then(
      () => {
        STORE.set("activeThread", newThreadId);
      }
      // rej => {}
    );
    return null;
  }

  public async findUser(login: string) {
    const response = await UsersAPI.findUsers(login);
    if (response === false) return false;
    const foundUsers = response.reduce((acc: any[], user: any) => {
      let { id, login, avatar } = user;
      avatar = avatarFix(avatar);
      return [...acc, { id, login, avatar, isMember: false }];
    }, []);
    STORE.emit(StoreEvents.findUsers, foundUsers);
    return true;
  }

  public async addUsers(userId: number, threadId: number) {
    const response = await threadsAPI.addUsers(userId, threadId);
    if (response === false) return false;
    const users = await this.getThreadUsers(threadId);
    STORE.emit(StoreEvents.updateUsers, users);
    return true;
  }

  public async getThreadUsers(threadId: number) {
    const response = await threadsAPI.getThreadUsers(threadId);

    if (response === false) return false;

    const formattedUsers = response.reduce((acc: any, user: any) => {
      let { id, login, avatar } = user;
      avatar = avatarFix(avatar);
      return [...acc, { id, login, avatar }];
    }, []);
    STORE.emit(StoreEvents.updateUsers, formattedUsers);
    return true;
  }

  public async removeUsers(userId: number, threadId: number) {
    const response = await threadsAPI.removeUsers(userId, threadId);
    if (!response) return false;
    const users = await this.getThreadUsers(threadId);
    STORE.emit(StoreEvents.updateUsers, users);
    return true;
  }

  public async removeThread(threadId: number) {
    const response = await threadsAPI.removeThread(threadId);
    if (!response) return false;
    this.updateThreads().then(() => {
      STORE.set("activeThread", null);
      router.go("/messenger");
    });
    return true;
  }
}

export default new ThreadsController();
