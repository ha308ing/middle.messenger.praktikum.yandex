import { Input, type InputValueStringProp } from "@/components/elements/input";

export class InputUserPhone extends Input {
  constructor(props: InputValueStringProp = { value: false, disabled: false }) {
    super({
      class: "input__vertical input input_phone",
      label: "Phone",
      type: "text",
      name: "phone",
      placeholder: "Phone",
      vertical: true,
      value: props.value,
      readonly: props.readonly,
      disabled: props.disabled,
    });
  }
}
