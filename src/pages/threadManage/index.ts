import Component from "@/system/Component";
import threadManageTemplateString from "./threadManage.hbs?raw";
import "./threadManage.scss";
import { createThreadLayout } from "@/pages/threadList";
import { createIconButtonBack } from "@/components/elements/iconButton";
import TopBar_ from "@/components/elements/topBar";
import { createAvatarThread } from "@/components/elements/avatar";
import Input from "@/components/elements/input";
import { createThreadMember } from "./components/threadMember";
import Button from "@/components/elements/button";

export default class ThreadManageLayout_ extends Component {
  protected _setTemplate(): string {
    return threadManageTemplateString.trim();
  }
}

const ButtonBack = createIconButtonBack();

const TopBar = new TopBar_(
  "nav",
  {
    threadTitle: "Thread title",
    content: [createAvatarThread(), `<h1>{{threadTitle}}</h1>`],
    backButton: ButtonBack,
  },
  "topBar"
);

const InputFindUser = new Input(
  "div",
  {
    class: "findUser",
    type: "text",
    placeholder: "Find user",
  },
  "searchContainer"
);

const member1 = createThreadMember();
const member2 = createThreadMember({ login: "User2" });
const member3 = createThreadMember({ login: "User3" });
const member4 = createThreadMember({ login: "User4", isMember: false });
const threadMembers = [member1, member2, member3, member4];

const ButtonLeaveThread = new Button("button", { buttonText: "Leave thread" }, "button button__leaveThread");

export const ThreadManageLayout = new ThreadManageLayout_(
  "section",
  {
    TopBar,
    InputFindUser,
    threadMembers,
    ButtonLeaveThread,
  },
  "rightPanel_content rightPanel_content_manageThread threadList__active"
);

export const ThreadManage = createThreadLayout({ content: ThreadManageLayout, threadActive: true });
