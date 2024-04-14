import { Input, type InputProps } from "./input";

export class InputSecondName extends Input {
  constructor(props: InputProps = {}) {
    super({
      class: "input__vertical input input_secondName",
      label: "Second name",
      type: "text",
      name: "second_name",
      placeholder: "Second name",
      vertical: true,
      ...props,
    });
  }
}
