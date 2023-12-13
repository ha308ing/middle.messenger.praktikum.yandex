import store from "@/system/store";
import WSTransport, { WSEvents } from "@/system/wsTransport";
import MessagesController from "@/controllers/messagesController";
import { type Message } from "@/types/types.api";

class WebSocketController {
  async connect(userId: number, threadId: number, token: string) {
    if (userId == null || threadId == null || token == null) {
      throw new Error(`WebSocketController failed to connent, not all parameters passed:
      userId: ${userId},
      threadId: ${threadId},
      token: ${token}
      `);
    }
    const ws = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${threadId}/${token}`);

    ws.on(WSEvents.openConnection, () => {
      if (store.get(`messages.${threadId}`) == null) {
        store.set(`messages.${threadId}`, []);
        this.getOldMessages(threadId);
      }
    });

    ws.on(WSEvents.newMessage, messages => {
      const messagesPath = `messages.${threadId}`;
      const currentMessages = store.get(messagesPath);
      const updatedMessages = currentMessages != null ? [...currentMessages, ...messages] : messages;
      store.set(
        messagesPath,
        updatedMessages.sort((a: Message, b: Message) => a.id - b.id)
      );
      const view = document.querySelector(".messages_container");
      if (view != null) view.scrollTo(0, view.scrollHeight);
    });

    ws.on(WSEvents.errorConnection, input => {
      console.log(`ws ${threadId} emitted error`);
      console.error(input);
    });

    return ws;
  }

  async sendMessage(threadId: number, message: string): Promise<boolean> {
    return new Promise((_resolve, _reject) => {
      let socket = store.get(`sockets.${threadId}`) as WSTransport;
      if (socket.socket.readyState !== 1) {
        let retries = 10;
        const t = setInterval(() => {
          socket = store.get(`sockets.${threadId}`) as WSTransport;
          if (socket.socket.readyState === 1 && retries > 0) {
            socket.send(message);
            clearInterval(t);
            _resolve(true);
          } else {
            if (retries === 0) {
              clearInterval(t);
              _reject(new Error(`failed to send message. socket ${threadId} is not opened`));
            }
            retries--;
          }
        }, 1000);
      } else {
        socket.send(message);
      }
    });
  }

  sendFile(threadId: number, contentId: string) {
    const socket = store.get(`sockets.${threadId}`) as WSTransport;
    /* http transport first put to resources */
    socket.send(contentId, "file");
  }

  async getUnreadMessages(threadId: number) {
    const socket = store.get(`sockets.${threadId}`) as WSTransport;
    let newMessagesCount = await MessagesController.getNewMessagesCount(threadId);
    while (newMessagesCount > 0) {
      const lastMessageId = store.get(`messages.${threadId}`)[0].id;
      socket.getOld(lastMessageId);
      newMessagesCount = await MessagesController.getNewMessagesCount(threadId);
    }
  }

  getOldMessages(threadId: number, lastMessageId = 0) {
    const socket = store.get(`sockets.${threadId}`) as WSTransport;
    socket.getOld(lastMessageId);
  }
}

export default new WebSocketController();
