import {
  IconButtonPassword_,
  IconButtonEdit_,
  IconButtonExit_,
  type IconButtonProps,
} from "@/components/elements/iconButton";
import AuthController from "@/controllers/authController";
import ProfileEditController from "@/controllers/profileEditController";
import Router from "@/system/router";

export class IconButtonPassword extends IconButtonPassword_ {
  constructor(props?: IconButtonProps) {
    super({
      ...props,
      click: (event: Event) => {
        event.preventDefault();
        Router.go("/password-change");
      },
    });
  }
}

export class IconButtonEdit extends IconButtonEdit_ {
  constructor(props?: IconButtonProps) {
    super({
      click: () => {
        ProfileEditController.toggleEditMode();
      },
      ...props,
    });
  }
}
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
