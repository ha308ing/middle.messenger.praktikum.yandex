import { IconButtonClose, IconButtonInvite } from "@/components/elements/iconButton";
import threadMemberTemplateString from "./threadMember.hbs?raw";
import "./threadMember.scss";
import { MemberLogoUsername } from "./elements";
import Store from "@/system/store";
import ThreadController from "@/controllers/threadsController";
import { Block } from "@/system/block";

export type ThreadMemberProps = {
  login: string;
  avatar: string;
  id: number;
  isMember: boolean;
  isAdmin: boolean;
  isCurrentUser: boolean;
  class: string;
};

export class ThreadMember extends Block {
  constructor(props: ThreadMemberProps) {
    super("li", {
      ...props,
      "data-username": props.login,
      "data-userId": props.id,
      isCurrentUser: props.isCurrentUser,
      isAdmin: props.isAdmin,
      isMember: props.isMember,
      class: "threadMember" + " " + (props?.class ?? ""),
      settings: {
        withInternalId: true,
      },
    });

    this.children.memberLogoUsername = new MemberLogoUsername(props);

    this.children.iconButtonClose = new IconButtonClose({
      click_capture: () => {
        const activeThread = Store.get("activeThread");
        if (activeThread == null) {
          console.error("Failed to remove user. No active thread in the store");
          return;
        }
        const userId = props.id;
        ThreadController.removeUsers(userId, activeThread);
      },
      title: `remove user ${props.login}`,
    });
    this.children.iconButtonInvite = new IconButtonInvite({
      click_capture: () => {
        const { activeThread } = Store.getState();
        if (activeThread == null) {
          console.error("Failed to add user. No active thread in the store");
          return;
        }
        const userId = props.id;
        ThreadController.addUsers(userId, activeThread);
      },
    });
  }

  render() {
    return this.compile(threadMemberTemplateString.trim(), {
      memberLogoUsername: this.children.memberLogoUsername,
      iconButtonClose: this.children.iconButtonClose,
      iconButtonInvite: this.children.iconButtonInvite,
      ...this.props,
    });
  }
}
