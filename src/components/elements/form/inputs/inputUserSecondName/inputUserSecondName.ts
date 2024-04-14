import { Input, type InputValueStringProp } from "@/components/elements/input";

export class InputUserSecondName extends Input {
  constructor(props: InputValueStringProp = { value: false, disabled: false }) {
    super({
      class: "input__vertical input input_secondName",
      label: "Second name",
      type: "text",
      name: "second_name",
      placeholder: "Second name",
      vertical: true,
      value: props.value,
      readonly: props.readonly,
      disabled: props.disabled,
    });
  }
}
