import { IconButton } from "./iconButton";
import type { IconButtonProps } from "./iconButton";

const icon_close = "/icon_close.png";

export class IconButtonClose extends IconButton {
  constructor(props: IconButtonProps = {}) {
    super(props, icon_close, "iconButtonClose");
  }
}
