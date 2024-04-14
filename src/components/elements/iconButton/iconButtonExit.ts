import { IconButton } from "./iconButton";
import type { IconButtonProps } from "./iconButton";

const icon_exit = "/icon_exit.png";

export class IconButtonExit extends IconButton {
  constructor(props: IconButtonProps = {}) {
    super(props, icon_exit, "iconButtonExit");
  }
}
