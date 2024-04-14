import { IconButton } from "./iconButton";
import type { IconButtonProps } from "./iconButton";

const icon_edit = "/icon_edit.png";

export class IconButtonEdit extends IconButton {
  constructor(props: IconButtonProps = {}) {
    super(props, icon_edit, "iconButtonEdit");
  }
}
