import template from "./iconButton.hbs?raw";
import "./iconButton.scss";
import { Block } from "@/system/block";

const iconButtonClassName = "iconButton";

export type IconButtonProps = {
  type?: string;
  click?: ((...args: any[]) => any) | false;
  click_capture?: ((...args: any[]) => any) | false;
  style?: string;
  title?: string;
};

export class IconButton extends Block<IconButtonProps> {
  constructor(props: IconButtonProps, iconUrl: string, className: string) {
    super("button", {
      type: props?.type ?? "button",
      click: props?.click ?? false,
      click_capture: props?.click_capture ?? false,
      class: iconButtonClassName + " " + className,
      settings: {
        withInternalId: true,
      },
      iconUrl,
      style: props?.style ?? "",
      title: props?.title ?? "",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
