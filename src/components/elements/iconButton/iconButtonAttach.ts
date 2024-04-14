import { IconButton } from "./iconButton";
import type { IconButtonProps } from "./iconButton";

const icon_attach = "/icon_attach.png";

export class IconButtonAttach extends IconButton {
  constructor(props: IconButtonProps = {}) {
    super(props, icon_attach, "iconButtonAttach");
  }
}
