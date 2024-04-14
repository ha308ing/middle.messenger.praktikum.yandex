import router from "@/system/router";
import { IconButton } from "./iconButton";
import type { IconButtonProps } from "./iconButton";

const icon_back = "/icon_back.png";

export class IconButtonBack extends IconButton {
  constructor(props: IconButtonProps) {
    super(
      {
        click: () => {
          router.back();
        },
        ...props,
      },
      icon_back,
      "iconButtonBack"
    );
  }
}
