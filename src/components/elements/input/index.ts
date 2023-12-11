import Component from "@/system/component";
import inputTemplateString from "./input.hbs?raw";
import "./input.scss";

export type InputValueStringProp = {
  value?: string | number | false;
  readonly?: boolean;
  disabled?: boolean;
};

export type InputProps = {
  id?: string;
  class?: string;
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  vertical?: boolean;
  readonly?: boolean;
  value?: string | number | false;
  style?: string;
  disabled?: boolean;
};

export default class Input extends Component<InputProps> {
  protected _setTemplate(): string {
    return inputTemplateString.trim();
  }
}

export class InputLogin extends Input {
  constructor(props?: InputProps) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "Login",
        type: "text",
        name: "login",
        placeholder: "Login",
        vertical: true,
        ...props,
      },
      "input input_login"
    );
  }
}

export class InputPassword<T extends InputProps = InputProps> extends Input {
  constructor(props?: T) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "Password",
        type: "password",
        name: "password",
        placeholder: "Password",
        vertical: true,
        ...props,
      },
      "input input_password input__vertical"
    );
  }
}

export class InputEmail<T extends InputProps = InputProps> extends Input {
  constructor(props?: T) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "Email",
        type: "text",
        name: "email",
        placeholder: "Email",
        vertical: true,
        ...props,
      },
      "input input_email"
    );
  }
}

export class InputPhone<T extends InputProps = InputProps> extends Input {
  constructor(props?: T) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "Phone",
        type: "text",
        name: "phone",
        placeholder: "Phone",
        vertical: true,
        ...props,
      },
      "input input_phone"
    );
  }
}

export class InputFirstName<T extends InputProps = InputProps> extends Input {
  constructor(props?: T) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "First name",
        type: "text",
        name: "first_name",
        placeholder: "First name",
        vertical: true,
        ...props,
      },
      "input input_firstName"
    );
  }
}

export class InputSecondName<T extends InputProps = InputProps> extends Input {
  constructor(props?: T) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "Second name",
        type: "text",
        name: "second_name",
        placeholder: "Second name",
        vertical: true,
        ...props,
      },
      "input input_secondName"
    );
  }
}

export class InputDisplayName<T extends InputProps = InputProps> extends Input {
  constructor(props?: T) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "Display name",
        type: "text",
        name: "display_name",
        placeholder: "Display name",
        vertical: true,
        ...props,
      },
      "input input_displayName"
    );
  }
}

export class InputMessage extends Input {
  constructor() {
    super(
      "div",
      {
        type: "text",
        name: "message",
        placeholder: "Enter the message",
      },
      "input input_message"
    );
  }
}
