import { Input, type InputProps } from "./input";

export class InputLogin extends Input {
  constructor(props: InputProps = {}) {
    super({
      class: "input__vertical input input_login",
      label: "Login",
      type: "text",
      name: "login",
      placeholder: "Login",
      vertical: true,
      ...props,
    });
  }
}
