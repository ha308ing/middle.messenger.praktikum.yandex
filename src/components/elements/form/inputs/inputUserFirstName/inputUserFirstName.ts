import { Input, type InputValueStringProp } from "@/components/elements/input";

export class InputUserFirstName extends Input {
  constructor(props: InputValueStringProp = { value: false, disabled: false }) {
    super({
      class: "input__vertical input input_firstName",
      label: "First name",
      type: "text",
      name: "first_name",
      placeholder: "First name",
      vertical: true,
      value: props.value,
      readonly: props.readonly,
      disabled: props.disabled,
    });
  }
}
