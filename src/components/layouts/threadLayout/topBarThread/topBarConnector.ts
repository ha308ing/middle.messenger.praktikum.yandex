import { storeConnector } from "@/system/storeConnector";
import type { TopBarTitleLink } from "@/components/elements/topBar";
import type { TopBarThread } from "./topBarThread";

export const TopBarConnector = storeConnector<typeof TopBarThread, { TopBarLink: TopBarTitleLink }>(state => {
  const { activeThread } = state;
  if (activeThread == null) {
    return { hidden: true, class: "hidden" };
  } else {
    const thread = state?.threads_?.[activeThread];
    if (thread == null) {
      return { hidden: true, class: "hidden" };
    } else {
      return { hidden: false, class: "", ...thread };
    }
  }
});
