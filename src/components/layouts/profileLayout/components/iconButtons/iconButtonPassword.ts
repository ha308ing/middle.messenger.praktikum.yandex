import { IconButtonPassword as IconButtonPassword_, type IconButtonProps } from "@/components/elements/iconButton";
import router from "@/system/router";

export class IconButtonPassword extends IconButtonPassword_ {
  constructor(props?: IconButtonProps) {
    super({
      ...props,
      click: (event: Event) => {
        event.preventDefault();
        router.go("/password-change");
      },
    });
  }
}
