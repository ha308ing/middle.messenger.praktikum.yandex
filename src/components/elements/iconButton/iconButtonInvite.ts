import { IconButton } from "./iconButton";
import type { IconButtonProps } from "./iconButton";

const icon_invite = "/icon_invite.png";

export class IconButtonInvite extends IconButton {
  constructor(props: IconButtonProps = {}) {
    super(props, icon_invite, "iconButtonInvite");
  }
}
