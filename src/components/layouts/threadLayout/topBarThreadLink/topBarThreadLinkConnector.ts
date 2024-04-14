import { storeConnector } from "@/system/storeConnector";
import type { TopBarThreadLink, TopBarThreadLinkProps } from "./topBarThreadLink";

export const TopBarThreadLinkConnector = storeConnector<typeof TopBarThreadLink, TopBarThreadLinkProps>(state => {
  const activeThreadId = state.activeThread;
  const isNullThread = activeThreadId == null || state?.threads_?.[activeThreadId] == null;
  if (isNullThread) return {};
  const threadData = state.threads_[activeThreadId];
  return { ...threadData };
});
