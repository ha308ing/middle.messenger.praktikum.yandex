import { Input, type InputProps } from "./input";

export class InputFirstName extends Input {
  constructor(props: InputProps = {}) {
    super({
      class: "input__vertical input input_firstName",
      label: "First name",
      type: "text",
      name: "first_name",
      placeholder: "First name",
      vertical: true,
      ...props,
    });
  }
}
