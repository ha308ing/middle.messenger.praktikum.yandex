import { type User, type Thread } from "@/types/types.api";
import { BaseAPI } from "@/api/baseAPI";
import store from "@/system/store";
import avatarFix from "@/utils/avatarFix";

class ThreadsAPI extends BaseAPI {
  public async getThreads(offset = 0, limit = 10, title = ""): Promise<Thread[] | null> {
    try {
      const request = await this.transporter.get("/chats", {
        headers: { "Content-Type": "application/json" },
        data: { offset, limit, title },
      });
      const { status, response } = request;
      const responseJson = JSON.parse(response);
      if (status !== 200) throw new Error(`${status}: ${responseJson.reason}`);
      return responseJson;
    } catch (e) {
      console.error("ThreadsAPI: getThreads failed");
      console.error(e);
    }
    return null;
  }

  public async createThread(title: string) {
    try {
      const request = await this.transporter.post("/chats", {
        data: JSON.stringify({ title }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { status, response } = request;
      if (status === 200) return response;
      throw new Error(`ThreadAPI: createThread failed: ${status}`);
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  public async addUsers(userId: number, threadId: number) {
    try {
      const addUserObject = { users: [userId], chatId: threadId };
      const request = await this.transporter.put("/chats/users", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: JSON.stringify(addUserObject),
      });

      const { status, response } = request;
      if (status === 200) {
        return response;
      }
      const response_ = JSON.parse(response);
      throw new Error(`${status}, ${response_.reason}`);
    } catch (e) {
      console.error("ThreasdAPI: addUsers failed");
      console.error(e);
    }
    return false;
  }

  public async getThreadUsers(threadId: number): Promise<User[] | false> {
    try {
      const request = await this.transporter.get(`/chats/${threadId}/users`, { withCredentials: true });

      const { status, response } = request;
      const response_ = JSON.parse(response);
      if (status === 200) return response_;
      throw new Error(`${status},${response_.reason}`);
    } catch (e) {
      console.error("ThreadAPI getThreadUsers failed");
      console.error(e);
    }
    return false;
  }

  public async removeUsers(userId: number, threadId: number) {
    try {
      const removeUserObject = { users: [userId], chatId: threadId };
      const request = await this.transporter.delete(`/chats/users`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: JSON.stringify(removeUserObject),
      });

      const { status, response } = request;
      if (status === 200) return true;
      const { reason } = JSON.parse(response);

      throw new Error(`${status}: ${reason}`);
    } catch (e) {
      console.error("ThreadAPI: removeUser failed");
      console.error(e);
    }
    return false;
  }

  public async removeThread(threadId: number) {
    try {
      const formattedRemoveThreadObj = { chatId: threadId };
      const request = await this.transporter.delete(`/chats`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: JSON.stringify(formattedRemoveThreadObj),
      });

      const { status, response } = request;
      if (status === 200) return true;
      const { reason } = JSON.parse(response);

      throw new Error(`${status}: ${reason}`);
    } catch (e) {
      console.error("ThreadsAPI: removeThread failed");
      console.error(e);
    }
    return false;
  }

  public async getThreadToken(threadId: number) {
    try {
      const request = await this.transporter.post(`/chats/token/${threadId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { status, response } = request;

      const response_ = JSON.parse(response);
      if (status === 200) return response_.token;
      throw new Error(`${status}, ${response_.reason}`);
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
      const request = await this.transporter.post("/resources", { data: formData });

      const { status, response } = request;
      const response_ = JSON.parse(response);
      if (status === 200) {
        return response_;
      }
      alert(response_.reason);
      throw new Error(`${status},${response_.reason}`);
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
      const request = await this.transporter.put("/chats/avatar", {
        data: avatarFormData,
      });

      const { status, response } = request;
      if (status === 200) {
        let { avatar } = JSON.parse(response);
        avatar = avatarFix(avatar);
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
