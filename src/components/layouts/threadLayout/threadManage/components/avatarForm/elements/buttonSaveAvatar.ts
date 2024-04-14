import { Button } from "@/components/elements/button";

export class ButtonSaveAvatar extends Button {
  constructor() {
    super({
      class: "button button_changeAvatar button_submit",
      buttonText: "Change avatar",
      type: "submit",
    });
  }
}
