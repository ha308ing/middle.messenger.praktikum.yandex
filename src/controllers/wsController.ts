import store from "@/system/store";
import WSTransport, { WSEvents } from "@/system/wsTransport";
import MessagesController from "@/controllers/messagesController";

class WebSocketController {
  async connect(userId: number, threadId: number, threadToken: string) {
    if (userId == null || threadId == null || threadToken == null) {
      throw new Error(`WebSocketController failed to connent, not all parameters passed:
      userId: ${userId},
      threadId: ${threadId},
      threadToken: ${threadToken}
      `);
    }
    const ws = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${threadId}/${threadToken}`);

    ws.on(WSEvents.openConnection, content => {
      console.log(`socket ${threadId} opened connection`, content);
      if (store.get(`messages.${threadId}`) == null) {
        store.set(`messages.${threadId}`, []);

        this.getOldMessages(threadId).then(
          res => {
            console.log("ws get new messages on connect res");
            console.log(res);
          },
          rej => {
            console.log("ws get new messages on connect rej");

            console.log(rej);
          }
        );

        console.log(`No unread messages for thread`, threadId);
      }
    });

    ws.on(WSEvents.newMessage, eventData => {
      const messagesPath = `messages.${threadId}`;
      let currentMessages = [];
      if (store.get(messagesPath) != null) {
        currentMessages = store.get(messagesPath) as any[];
      }
      console.log(`ws ${threadId} emitted new message`);
      console.log(messagesPath);
      store.set(messagesPath, [...currentMessages, eventData]);
      if (eventData?.type === "message") {
        const view = document.querySelector(".messages_container");
        if (view != null) view.scrollTo(0, view.scrollHeight);
      }
    });

    ws.on(WSEvents.errorConnection, input => {
      console.log(`ws ${threadId} emitted error`);
      console.error(input);
    });

    return ws;
  }

  sendMessage(threadId: number, message: string) {
    const socket = store.get(`sockets.${threadId}`) as WSTransport;
    console.log("sending message to", threadId, "; message:", message);
    socket.send(message);
  }

  sendFile(threadId: number, contentId: string) {
    const socket = store.get(`sockets.${threadId}`) as WSTransport;
    /* http transport first put to resources */
    socket.send(contentId, "file");
  }

  async getOldMessages(threadId: number) {
    const socket = store.get(`sockets.${threadId}`) as WSTransport;
    let newMessagesCount = await MessagesController.getNewMessagesCount(threadId);
    console.log("newMessagesCount", newMessagesCount);
    while (newMessagesCount > 0) {
      const lastMessageId = store.get(`messages.${threadId}`)[0].id;
      socket.getOld(lastMessageId);
      newMessagesCount = await MessagesController.getNewMessagesCount(threadId);
    }
  }
}

export default new WebSocketController();
