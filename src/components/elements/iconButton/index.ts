import Component, { type Props } from "@/system/Component";
import iconButtonTemplateString from "./iconButton.hbs?raw";
import "./iconButton.scss";
import icon_context_horizontal from "@/assets/icon_context_horizontal.png";
import icon_context_vertical from "@/assets/icon_context_vertical.png";
import icon_password from "@/assets/icon_password.png";
import icon_attach from "@/assets/icon_attach.png";
import icon_invite from "@/assets/icon_invite.png";
import icon_close from "@/assets/icon_close.png";
import icon_back from "@/assets/icon_back.png";
import icon_exit from "@/assets/icon_exit.png";
import icon_edit from "@/assets/icon_edit.png";
import icon_send from "@/assets/icon_send.png";

export default class IconButton extends Component {
  protected _setTemplate(): string {
    return iconButtonTemplateString.trim();
  }
}

export function createIconButtonContextVertical(props: Props = {}) {
  return new IconButton(
    "button",
    { type: "button", iconButtonIcon: icon_context_vertical, ...props },
    "iconButton iconButtonContext"
  );
}

export function createIconButtonContextHorizontal(props: Props = {}) {
  return new IconButton(
    "button",
    { type: "button", iconButtonIcon: icon_context_horizontal, ...props },
    "iconButton iconButtonContext"
  );
}

export function createIconButtonBack(props: Props = {}) {
  return new IconButton("button", { type: "button", iconButtonIcon: icon_back, ...props }, "iconButton iconButtonBack");
}

export function createIconButtonAttach(props: Props = {}) {
  return new IconButton(
    "button",
    { type: "button", iconButtonIcon: icon_attach, ...props },
    "iconButton iconButtonAttach"
  );
}

export function createIconButtonSend(props: Props = {}) {
  return new IconButton("button", { type: "button", iconButtonIcon: icon_send, ...props }, "iconButton iconButtonSend");
}

export function createIconButtonClose(props: Props = {}) {
  return new IconButton(
    "button",
    { type: "button", iconButtonIcon: icon_close, ...props },
    "iconButton iconButtonClose"
  );
}

export function createIconButtonInvite(props: Props = {}) {
  return new IconButton(
    "button",
    { type: "button", iconButtonIcon: icon_invite, ...props },
    "iconButton iconButtonInvite"
  );
}

export function createIconButtonExit(props: Props = {}) {
  return new IconButton("button", { type: "button", iconButtonIcon: icon_exit, ...props }, "iconButton iconButtonExit");
}

export function createIconButtonPassword(props: Props = {}) {
  return new IconButton(
    "button",
    { type: "button", iconButtonIcon: icon_password, ...props },
    "iconButton iconButtonPassword"
  );
}

export function iconButtonEdit(props: Props = {}) {
  return new IconButton("button", { type: "button", iconButtonIcon: icon_edit, ...props }, "iconButton iconButtonEdit");
}
