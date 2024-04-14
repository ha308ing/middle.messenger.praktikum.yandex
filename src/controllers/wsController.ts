import store from "@/system/store";
import { WSTransport, WSEvents } from "@/system/wsTransport";
import MessagesController from "@/controllers/messagesController";
import threadsAPI from "@/api/threadsAPI";

class WebSocketController {
  sockets: Record<string, WSTransport> = {};
  tokens: Record<string, string> = {};
  async connect(threadId: number) {
    const userId = store.get("user.id");
    const token = this.tokens[threadId] ?? (await threadsAPI.getThreadToken(threadId));

    if (userId == null || threadId == null || token == null) {
      throw new Error(`WebSocketController failed to connent, not all parameters passed:
      userId: ${userId},
      threadId: ${threadId},
      token: ${token}
      `);
    }

    if (this.sockets[threadId] != null) {
      console.log(`socket isn't null`);
      this.sockets[threadId].close();
    }

    const ws = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${threadId}/${token}`);

    ws.on(WSEvents.openConnection, () => {
      const currentMessages = store.get(`messages.${threadId}`) ?? [];
      if (currentMessages.length === 0) {
        console.log("getting old messages");
        this.getOldMessages(threadId);
      } else {
        ws.ping();
      }
    });

    ws.on(WSEvents.newMessage, newMessages => {
      const messagesPath = `messages.${threadId}`;
      const currentMessages = store.get(messagesPath) ?? [];
      const messages = [...currentMessages, ...newMessages];
      store.set(messagesPath, messages);
      const view = document.querySelector(".messages_container");
      if (view != null) view.scrollTo(0, view.scrollHeight);
    });

    ws.on(WSEvents.errorConnection, input => {
      console.log(`ws ${threadId} emitted error`);
      console.error(input);
    });

    this.sockets[threadId] = ws;
  }

  sendMessage(threadId: number, message: string) {
    this.sockets[threadId].send(message);
  }

  sendFile(threadId: number, contentId: string) {
    this.sockets[threadId].send(contentId, "file");
  }

  async getUnreadMessages(threadId: number) {
    const socket = this.sockets[threadId];
    let newMessagesCount = await MessagesController.getNewMessagesCount(threadId);
    while (newMessagesCount > 0) {
      const lastMessageId = store.get(`messages.${threadId}`)[0].id;
      socket.getOld(lastMessageId);
      newMessagesCount = await MessagesController.getNewMessagesCount(threadId);
    }
  }

  getOldMessages(threadId: number) {
    this.sockets[threadId].getOld(0);
  }
}

export default new WebSocketController();
