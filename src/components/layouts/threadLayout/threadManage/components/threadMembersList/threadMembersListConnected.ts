import { storeConnector } from "@/system/storeConnector";
import store from "@/system/store";
import { ThreadMembersList } from "./threadMembersList";

export const ThreadMembersListConnected = storeConnector<typeof ThreadMembersList>(state => {
  const activeThreadId = state.activeThread;
  if (activeThreadId == null) return { members: [] };

  const members = store.get(`threads_.${activeThreadId}.users`);
  return { members };
})(ThreadMembersList);
