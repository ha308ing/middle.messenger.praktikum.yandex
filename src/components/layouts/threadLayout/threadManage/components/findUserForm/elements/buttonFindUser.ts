import { Button } from "@/components/elements/button";

export class ButtonFindUser extends Button {
  constructor() {
    super({
      class: "button button_findUser button_submit",
      buttonText: "Find user",
      type: "submit",
    });
  }
}
