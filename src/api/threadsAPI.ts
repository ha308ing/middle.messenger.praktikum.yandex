import { type User, type Thread } from "@/types/types.api";
import { BaseAPI } from "@/api/baseAPI";
import store from "@/system/store";
import avatarFix from "@/utils/avatarFix";

class ThreadsAPI extends BaseAPI {
  public async getThreads(offset = 0, limit = 10, title = ""): Promise<Thread[] | null> {
    try {
      const { status, response } = await this.transporter.get("/chats", {
        headers: { "Content-Type": "application/json" },
        data: { offset, limit, title },
      });
      if (status !== 200) throw new Error(`${status}: ${response.reason}`);
      return response;
    } catch (e) {
      console.error("ThreadsAPI: getThreads failed");
      console.error(e);
    }
    return null;
  }

  public async createThread(title: string) {
    try {
      const { status, response } = await this.transporter.post("/chats", {
        data: JSON.stringify({ title }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (status === 200) return response;
      throw new Error(`ThreadAPI: createThread failed: ${status}`);
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  public async addUsers(userId: number, threadId: number) {
    let message = "Ok";
    try {
      const addUserObject = { users: [userId], chatId: threadId };
      const { status, response } = await this.transporter.put("/chats/users", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: JSON.stringify(addUserObject),
      });

      if (status === 200) {
        return { result: true, message };
      }
      message = response.reason;
      throw new Error(`${status}, ${response.reason}`);
    } catch (e) {
      console.error("ThreasdAPI: addUsers failed");
      console.error(e);
    }
    return { result: false, message: `Failed to add user: ${message}` };
  }

  public async getThreadUsers(threadId: number): Promise<User[] | false> {
    try {
      const { status, response } = await this.transporter.get(`/chats/${threadId}/users`, { withCredentials: true });
      if (status === 200) return response;
      throw new Error(`${status},${response.reason}`);
    } catch (e) {
      console.error("ThreadAPI getThreadUsers failed");
      console.error(e);
    }
    return false;
  }

  public async removeUsers(userId: number, threadId: number) {
    let message = "Ok";
    try {
      const removeUserObject = { users: [userId], chatId: threadId };
      const { status, response } = await this.transporter.delete(`/chats/users`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: JSON.stringify(removeUserObject),
      });
      if (status === 200) return { result: true, message };
      message = response.reason;
      throw new Error(`${status}: ${response.reason}`);
    } catch (e) {
      console.error("ThreadAPI: removeUser failed");
      console.error(e);
    }
    return { result: false, message: `Failed to remove user: ${message}` };
  }

  public async removeThread(threadId: number) {
    let message = "Ok";
    try {
      const formattedRemoveThreadObj = { chatId: threadId };
      const { status, response } = await this.transporter.delete(`/chats`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: JSON.stringify(formattedRemoveThreadObj),
      });
      if (status === 200) return { result: true, message };
      message = response.reason;
      throw new Error(`${status}: ${response.reason}`);
    } catch (e) {
      console.error("ThreadsAPI: removeThread failed");
      console.error(e);
    }
    return { result: false, message: `Failed to remove thread: ${message}` };
  }

  public async getThreadToken(threadId: number) {
    try {
      const { status, response } = await this.transporter.post(`/chats/token/${threadId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (status === 200) return response.token;
      throw new Error(`${status}, ${response.reason}`);
    } catch (e) {
      console.error("ThradsAPI: getThreadToken failed");
      console.error(e);
    }
    return null;
  }

  public async sendFile(file: FileList) {
    try {
      const formData = new FormData();
      formData.set("reource", file[0]);
      const { status, response } = await this.transporter.post("/resources", { data: formData });
      if (status === 200) {
        return response;
      }
      alert(response.reason);
      throw new Error(`${status},${response.reason}`);
    } catch (e) {
      console.error("ThreadsAPI: sendFile failed");
    }
    return false;
  }

  public async changeAvatar(avatar: File) {
    try {
      const avatarFormData = new FormData();
      avatarFormData.set("avatar", avatar);
      avatarFormData.append("chatId", store.get("activeThread"));
      const { status, response } = await this.transporter.put("/chats/avatar", {
        data: avatarFormData,
      });
      if (status === 200) {
        const avatar = avatarFix(response.avatar);
        store.set(`threads_.${store.get("activeThread")}.avatar`, avatar);
        return;
      }
      throw new Error(`Avatar upload failed. Try smaller image`);
    } catch (e) {
      alert(e);
    }

    return null;
  }
}

export default new ThreadsAPI();
