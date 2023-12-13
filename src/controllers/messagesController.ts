import MessagesAPI from "@/api/messagesAPI";

class MessagesController {
  async getNewMessagesCount(threadId: number) {
    const response = await MessagesAPI.getNewMessagesCount(threadId);
    return response;
  }
}

export default new MessagesController();
