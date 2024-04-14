import { Input, type InputProps } from "./input";

export class InputDisplayName extends Input {
  constructor(props: InputProps = {}) {
    super({
      class: "input__vertical input input_displayName",
      label: "Display name",
      type: "text",
      name: "display_name",
      placeholder: "Display name",
      vertical: true,
      ...props,
    });
  }
}
