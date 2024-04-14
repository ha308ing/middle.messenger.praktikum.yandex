import router from "@/system/router";
import { Button } from "./button";

export class ButtonCancelRegistration extends Button {
  constructor() {
    super({
      class: "button",
      buttonText: "Cancel",
      type: "button",
      click: () => {
        router.go("/sign-in");
      },
    });
  }
}
