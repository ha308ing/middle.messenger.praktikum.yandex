import Component from "@/system/component";
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
import Router from "@/system/router";

export type IconButtonProps = {
  type?: string;
  iconButtonIcon: string;
  click?: ((...args: any[]) => any) | false;
  click_capture?: ((...args: any[]) => any) | false;
};

export default class IconButton extends Component<IconButtonProps> {
  constructor(props: IconButtonProps, persistClass: string) {
    super(
      "button",
      {
        iconButtonIcon: props.iconButtonIcon,
        type: props?.type ?? "button",
        click: props?.click ?? false,
        click_capture: props?.click_capture ?? false,
      },
      `iconButton ${persistClass}`
    );
  }

  protected _setTemplate(): string {
    return iconButtonTemplateString.trim();
  }
}

function setIcon(icon: string, defaultClass: string) {
  return class extends IconButton {
    constructor(props?: Omit<IconButtonProps, "iconButtonIcon">, persistClass: string = "") {
      super({ iconButtonIcon: icon, ...props }, `${defaultClass} ${persistClass}`);
    }
  };
}

export const IconButtonContextVertical = setIcon(icon_context_vertical, "iconButtonContext");
export const IconButtonContextHorizontal = setIcon(icon_context_horizontal, "iconButtonContext");
export const IconButtonBack_ = setIcon(icon_back, "iconButtonBack");
export const IconButtonAttach = setIcon(icon_attach, "iconButtonAttach");
export const IconButtonSend = setIcon(icon_send, "iconButtonSend");
export const IconButtonInvite = setIcon(icon_invite, "iconButtonInvite");
export const IconButtonExit_ = setIcon(icon_exit, "iconButtonExit");
export const IconButtonPassword_ = setIcon(icon_password, "iconButtonPassword");
export const IconButtonEdit_ = setIcon(icon_edit, "iconButtonEdit");
export const IconButtonClose = setIcon(icon_close, "iconButtonClose");

export class IconButtonBack extends IconButtonBack_ {
  constructor(props?: IconButtonProps) {
    super({
      click: () => {
        Router.back();
      },
      ...props,
    });
  }
}
