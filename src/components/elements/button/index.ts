import Component from "@/system/component";
import "./button.scss";
import Router from "@/system/router";

type ButtonProps = {
  class?: string;
  buttonText?: string;
  type?: string;
  disabled?: boolean;
  click?: (event: Event) => any;
  style?: string;
};

export default class Button extends Component<ButtonProps> {
  constructor(props?: ButtonProps, persistClass?: string) {
    super(
      "button",
      {
        ...props,
      },
      persistClass ?? ""
    );
  }

  protected _setTemplate(): string {
    return `{{buttonText}}`;
  }
}

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

export class ButtonCancelRegistration extends Button {
  constructor() {
    super({
      class: "button",
      buttonText: "Cancel",
      type: "button",
      click: () => {
        Router.go("/sign-in");
      },
    });
  }
}
