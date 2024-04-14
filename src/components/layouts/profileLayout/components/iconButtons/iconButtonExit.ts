import { IconButtonExit as IconButtonExit_, type IconButtonProps } from "@/components/elements/iconButton";
import AuthController from "@/controllers/authController";

export class IconButtonExit extends IconButtonExit_ {
  constructor(props?: IconButtonProps) {
    super({
      click: () => {
        AuthController.logout();
      },
      ...props,
    });
  }
}
