import Component, { type Props } from "@/system/Component";
import { createIconButtonClose, createIconButtonInvite } from "@/components/elements/iconButton";
import { createAvatarProfile } from "@/components/elements/avatar";
import threadMemberTemplateString from "./threadMember.hbs?raw";
import "./threadMember.scss";

export default class ThreadMember_ extends Component {
  protected _setTemplate(): string {
    return threadMemberTemplateString.trim();
  }
}

export function createThreadMember(props: Props = { login: "User1" }) {
  return new ThreadMember_(
    "li",
    {
      login: props.login,
      "data-login": props.login,
      avatar: createAvatarProfile(),
      iconButtonClose: createIconButtonClose(),
      iconButtonInvite: createIconButtonInvite(),
      isMember: true,
      ...props,
    },
    "threadMember"
  );
}
