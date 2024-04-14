import { Input, type InputProps } from "./input";

export class InputPassword extends Input {
  constructor(props: InputProps = {}) {
    super({
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Password",
      vertical: true,
      ...props,
      class: "input__vertical input input_password input__vertical " + (props.class ?? ""),
    });
  }
}
