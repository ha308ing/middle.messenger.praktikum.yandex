import { Input, type InputValueStringProp } from "@/components/elements/input";

export class InputUserEmail extends Input {
  constructor(props: InputValueStringProp = { value: false, disabled: false }) {
    super({
      class: "input__vertical input input_email",
      label: "Email",
      type: "text",
      name: "email",
      placeholder: "Email",
      vertical: true,
      value: props.value,
      // readonly: props.readonly,
      readonly: props.readonly,
      disabled: props.disabled,
    });
  }
}
