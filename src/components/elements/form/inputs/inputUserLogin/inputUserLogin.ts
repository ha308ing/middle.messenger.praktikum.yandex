import { Input, type InputValueStringProp } from "@/components/elements/input";

export class InputUserLogin extends Input {
  constructor(props: InputValueStringProp = { value: false, disabled: false }) {
    super({
      class: "input__vertical input input_login",
      label: "Login",
      type: "text",
      name: "login",
      placeholder: "Login",
      vertical: true,
      value: props.value,
      // readonly: true,
      readonly: props.readonly,
      disabled: props.disabled,
    });
  }
}
