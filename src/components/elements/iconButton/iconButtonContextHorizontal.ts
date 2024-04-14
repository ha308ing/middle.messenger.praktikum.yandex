import { IconButton } from "./iconButton";
import type { IconButtonProps } from "./iconButton";

const icon_context_horizontal = "/icon_context_horizontal.png";

export class IconButtonContextHorizontal extends IconButton {
  constructor(props: IconButtonProps = {}) {
    super(props, icon_context_horizontal, "iconButtonContext");
  }
}
