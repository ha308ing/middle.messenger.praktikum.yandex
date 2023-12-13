import Component from "@/system/component";
import storeConnector from "@/system/storeConnector";
import ThreadMember from "../../../ThreadMember";
import store from "@/system/store";
import { type User } from "@/types/types.api";
import { type Indexed } from "@/types/types";

export class ThreadMembersList extends Component {
  constructor(props?: Indexed) {
    super("ul", { ...props }, "threadMembersList");
  }

  protected _setTemplate(): string | null {
    return `{{{Members}}}`;
  }
}

const ThreadMembersListConnected = storeConnector<typeof ThreadMembersList>(state => {
  const activeThreadId = state.activeThread;
  const users = store.get(`threads.${activeThreadId}.users`);
  const Members = users.map(u => new ThreadMember({ ...u, isMember: true }));
  return { Members };
})(ThreadMembersList);

export default ThreadMembersListConnected;
