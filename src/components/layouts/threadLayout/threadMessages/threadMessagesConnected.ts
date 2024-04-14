import { storeConnector } from "@/system/storeConnector";
import store from "@/system/store";
import { type WSMessage, type User } from "@/types/types.api";
import { ThreadMessages } from "./threadMessages";

export const ThreadMessagesConnected = storeConnector<typeof ThreadMessages>(state => {
  const { activeThread } = state;
  if (activeThread == null) return { hide: true };
  const messages = state?.messages?.[activeThread] ?? [];
  if (messages.length === 0) return { messages: [], hide: false, activeThread, emptyThread: true };
  const items = messages.map((m: WSMessage) => {
    const date = new Date(m.time);
    const time = date.toLocaleTimeString();
    const day = date.toLocaleDateString("ru");
    return {
      sender:
        state?.threads_?.[activeThread]?.users.find((x: User) => x.id === parseInt(m.user_id))?.login ?? m.user_id,
      isOutgoing: m.user_id === store.get("user").id,
      text: m.content,
      attachments: false,
      time: `${time} - ${day}`,
    };
  });

  return { messages: items, hide: false, activeThread, emptyThread: false };
})(ThreadMessages);
