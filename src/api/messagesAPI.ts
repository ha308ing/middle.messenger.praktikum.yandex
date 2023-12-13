import { BaseAPI } from "@/api/baseAPI";

class MessagesAPI extends BaseAPI {
  async getNewMessagesCount(threadId: number) {
    console.log("MessagesAPI: getNewMessagesCount");
    try {
      const { status, response } = await this.transporter.get(`/chats/new/${threadId}`);
      if (status === 200) return response;
      throw new Error(`${status}, ${response.reason}`);
    } catch (e) {
      console.error("MessagesAPI: getNewMessagesCount failed");
      console.error(e);
    }
    return null;
  }
}

export default new MessagesAPI();
