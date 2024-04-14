import { Block } from "@/system/block";
import { ThreadMember } from "../../../threadMember";
import type { ThreadMemberProps } from "../../../threadMember";
import store, { StoreEvents } from "@/system/store";
import template from "./foundUsersList.hbs?raw";

const foundUserDefaultProps = {
  isMember: false,
};

export class FoundUsersList extends Block {
  constructor() {
    super("div", { class: "foundUsersList", settings: { withInternalId: true } });

    store.on(StoreEvents.findUsers, foundUsers => {
      this.setProps({ foundUsers });
    });
  }

  componentDidUpdate() {
    if (this.props?.foundUsers == null) return true;
    this.lists.FoundUsers = this.props.foundUsers.map(
      (u: ThreadMemberProps) => new ThreadMember({ ...u, ...foundUserDefaultProps })
    );
    this.lists.FoundUsers.forEach(m => {
      m.dispatchComponentDidMount();
    });
    return true;
  }

  render() {
    return this.compile(template, { foundUsers: this.props.foundUsers, FoundUsers: this.lists.FoundUsers });
  }
}
