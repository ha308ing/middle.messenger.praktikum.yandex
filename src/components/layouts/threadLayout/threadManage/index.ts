import threadManageTemplateString from "./threadManageLayout.hbs?raw";
import "./threadManageLayout.scss";
import { Block } from "@/system/block";
import { AvatarForm, FindUserForm, ThreadMembersListConnected, ButtonLeaveThread } from "./components";
import { FoundUsersList } from "./components/foundUsersList";

export class ThreadManageLayout extends Block {
  constructor() {
    super("section", {
      class: "threadManage",
      settings: { withInternalId: true },
    });

    this.children.AvatarForm = new AvatarForm();
    this.children.FindUserForm = new FindUserForm();
    this.children.ThreadMembers = new ThreadMembersListConnected();
    this.children.FoundUsers = new FoundUsersList();
    this.children.ButtonLeaveThread = new ButtonLeaveThread();
  }

  render() {
    const template = threadManageTemplateString.trim();
    return this.compile(template, {
      AvatarForm: this.children.AvatarForm,
      FindUserForm: this.children.FindUserForm,
      ThreadMembers: this.children.ThreadMembers,
      FoundUsers: this.children.FoundUsers,
      ButtonLeaveThread: this.children.ButtonLeaveThread,
    });
  }
}
