import { IconButton } from "./iconButton";
import type { IconButtonProps } from "./iconButton";

const icon_send = "/icon_send.png";

export class IconButtonSend extends IconButton {
  constructor(props: IconButtonProps = {}) {
    super(props, icon_send, "iconButtonSend");
  }
}
