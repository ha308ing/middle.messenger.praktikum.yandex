import { type InputValueStringProp, Input } from "@/components/elements/input";

export class InputUserDisplayName extends Input {
  constructor(props: InputValueStringProp = { value: "", disabled: false }) {
    super({
      class: "input__vertical input input_secondName",
      label: "Display name",
      type: "text",
      name: "display_name",
      placeholder: "Display name",
      vertical: true,
      value: props.value,
      readonly: props.readonly,
      disabled: props.disabled,
    });
  }
}
