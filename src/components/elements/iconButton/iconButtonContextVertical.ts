import { IconButton } from "./iconButton";
import type { IconButtonProps } from "./iconButton";

const icon_context_vertical = "/icon_context_vertical.png";

export class IconButtonContextVertical extends IconButton {
  constructor(props: IconButtonProps = {}) {
    super(props, icon_context_vertical, "iconButtonContext");
  }
}
