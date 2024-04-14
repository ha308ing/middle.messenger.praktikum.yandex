import store, { StoreEvents } from "@/system/store";
import { storeConnector } from "@/system/storeConnector";
import { type Thread } from "@/types/types.api";
import router from "@/system/router";
import { ThreadsList } from "./threadsList";

store.on(StoreEvents.clickThread, id => {
  store.emit(StoreEvents.activateThread, id);
  router.go("/messenger");

  const view = document.querySelector(".messages_container");
  if (view != null) view.scrollTo(0, view.scrollHeight);
});

export const ThreadsListConnected = storeConnector<typeof ThreadsList>(state => {
  const { activeThread, threads_: threads } = state;

  if (threads == null) return { threads: [] };

  const threadItems = Object.values(threads as Record<string, Thread>).reduce((acc: Thread[], t: Thread) => {
    if (t == null) return acc;

    const { last_message } = t;
    let lastMessage = {};
    if (last_message != null) {
      const { user: last_messageUser, time: last_messageTime, content: last_messageContent } = last_message;

      const { login: last_messageUserLogin } = last_messageUser;

      lastMessage = { last_messageUser, last_messageUserLogin, last_messageTime, last_messageContent };
    }

    const active = t.id === activeThread ? { "data-threadActive": true } : {};

    return [
      {
        ...t,
        "data-threadId": t.id,
        ...active,
        ...lastMessage,
      },
      ...acc,
    ];
  }, []);

  return { threads: threadItems };
})(ThreadsList);
