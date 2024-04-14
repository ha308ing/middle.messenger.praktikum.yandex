import { IconButton } from "./iconButton";
import type { IconButtonProps } from "./iconButton";

const icon_password = "/icon_password.png";

export class IconButtonPassword extends IconButton {
  constructor(props: IconButtonProps = {}) {
    super(props, icon_password, "iconButtonPassword");
  }
}
