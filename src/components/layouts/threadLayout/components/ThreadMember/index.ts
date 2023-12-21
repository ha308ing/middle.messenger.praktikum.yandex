import Component from "@/system/component";
import { IconButtonClose, IconButtonInvite } from "@/components/elements/iconButton";
import threadMemberTemplateString from "./ThreadMember.hbs?raw";
import "./ThreadMember.scss";
import MemberLogoUsername from "./components/MemberLogoUsername";
import sweater from "@/assets/sweater.png";
import Store from "@/system/store";
import ThreadController from "@/controllers/threadsController";

export type ThreadMemberProps = {
  login: string;
  avatar: string;
  id: number;
  isMember: boolean;
  isAdmin: boolean;
  isCurrentUser: boolean;
};

export default class ThreadMember extends Component {
  constructor(props: ThreadMemberProps) {
    super(
      "li",
      {
        memberLogoUsername: new MemberLogoUsername({ login: props.login, avatar: props.avatar ?? sweater }),
        "data-username": props.login,
        "data-userId": props.id,
        isCurrentUser: props.isCurrentUser,
        isAdmin: props.isAdmin,
        iconButtonClose: new IconButtonClose({
          click_capture: () => {
            const activeThread = Store.get("activeThread");
            if (activeThread == null) {
              console.error("Failed to remove user. No active thread in the store");
              return;
            }
            console.log(`remove user ${props.id} from ${activeThread}`);
            const userId = props.id;
            ThreadController.removeUsers(userId, activeThread);
          },
        }),
        iconButtonInvite: new IconButtonInvite({
          click_capture: () => {
            const { activeThread } = Store.getState();
            if (activeThread == null) {
              console.error("Failed to add user. No active thread in the store");
              return;
            }
            const userId = props.id;
            ThreadController.addUsers(userId, activeThread);
          },
        }),
        isMember: props.isMember,
      },
      "threadMember"
    );
  }

  protected _setTemplate(): string {
    return threadMemberTemplateString.trim();
  }
}
