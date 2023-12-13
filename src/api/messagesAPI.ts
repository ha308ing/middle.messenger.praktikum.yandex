import { BaseAPI } from "@/api/baseAPI";

class MessagesAPI extends BaseAPI {
  async getNewMessagesCount(threadId: number) {
    console.log("MessagesAPI: getNewMessagesCount");
    try {
      const request = await this.transporter.get(`/chats/new/${threadId}`);

      const { status, response } = request;

      const responseJson = JSON.parse(response);
      if (status === 200) return responseJson;
      throw new Error(`${status}, ${response.reason}`);
    } catch (e) {
      console.error("MessagesAPI: getNewMessagesCount failed");
      console.error(e);
    }
    return null;
  }
}

export default new MessagesAPI();
