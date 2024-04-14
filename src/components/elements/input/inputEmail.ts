import { Input, type InputProps } from "./input";

export class InputEmail extends Input {
  constructor(props: InputProps = {}) {
    super({
      class: "input__vertical input input_email",
      label: "Email",
      type: "text",
      name: "email",
      placeholder: "Email",
      vertical: true,
      ...props,
    });
  }
}
