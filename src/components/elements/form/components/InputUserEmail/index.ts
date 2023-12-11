import Input, { type InputValueStringProp } from "@/components/elements/input";
import connect from "@/system/storeConnector";
import { EditModeBus } from "../FormUser";

class InputUserEmail_ extends Input {
  constructor(props: InputValueStringProp = { value: false, disabled: false }) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "Email",
        type: "text",
        name: "email",
        placeholder: "Email",
        vertical: true,
        value: props.value,
        // readonly: props.readonly,
        readonly: props.readonly,
        disabled: props.disabled,
      },
      "input input_email"
    );
  }
}

export const InputUserEmail = connect<typeof InputUserEmail_, InputValueStringProp>(state => {
  const value = state.user?.email ?? false;
  return {
    value,
    readonly: EditModeBus.enable,
  };
})(InputUserEmail_);

export const InputProfileEmail = connect<typeof InputUserEmail_, InputValueStringProp>(state => {
  const value = state.target_user?.email ?? false;
  return {
    value,
    readonly: true,
    disabled: value === false,
  };
})(InputUserEmail_);
