import Component from "@/system/component";
import storeConnector from "@/system/storeConnector";
import ThreadMember from "../../../ThreadMember";
import store from "@/system/store";

class ThreadMembersList extends Component {
  constructor(props?: any) {
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
