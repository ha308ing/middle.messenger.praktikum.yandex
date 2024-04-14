import { Button } from "./button";

export class ButtonSubmitRegistration extends Button {
  constructor() {
    super({
      class: "button button_signup button_submit",
      buttonText: "Sign Up",
      type: "submit",
      disabled: true,
    });
  }
}
