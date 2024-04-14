import { IconButtonEdit as IconButtonEdit_, type IconButtonProps } from "@/components/elements/iconButton";

export class IconButtonEdit extends IconButtonEdit_ {
  constructor(props?: IconButtonProps) {
    super({
      click: () => {},
      ...props,
    });
  }
}
