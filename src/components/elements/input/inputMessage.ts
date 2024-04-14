import { Input, type InputProps } from "./input";

export class InputMessage extends Input {
  constructor(props: InputProps = {}) {
    super({
      type: "text",
      name: "message",
      placeholder: "Enter the message",
      class: "input input_message",
      ...props,
    });
  }
}
