import MessagesAPI from "@/api/messagesAPI";

class MessagesController {
  async getNewMessagesCount(threadId: number) {
    const response = await MessagesAPI.getNewMessagesCount(threadId);
    console.log(`Messages controller got from API new messages:`);
    return response;
  }
}

export default new MessagesController();
