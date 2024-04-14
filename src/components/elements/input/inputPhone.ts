import { Input, type InputProps } from "./input";

export class InputPhone extends Input {
  constructor(props: InputProps = {}) {
    super({
      class: "input__vertical input input_phone",
      label: "Phone",
      type: "text",
      name: "phone",
      placeholder: "Phone",
      vertical: true,
      ...props,
    });
  }
}
