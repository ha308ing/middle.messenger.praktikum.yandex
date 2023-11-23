import Component from "@/system/Component";
import "./button.scss";

export default class Button extends Component {
  protected _setTemplate(): string {
    return `{{buttonText}}`;
  }
}

export const ButtonSubmitRegistration = new Button("button", {
  class: "button button_signup button_submit",
  buttonText: "Sign Up",
});

export const ButtonCancelRegistration = new Button("button", {
  class: "button",
  buttonText: "Cancel",
});
