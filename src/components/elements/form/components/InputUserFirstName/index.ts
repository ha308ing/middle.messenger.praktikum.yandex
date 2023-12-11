import Input, { type InputValueStringProp } from "@/components/elements/input";
import connect from "@/system/storeConnector";
import { EditModeBus } from "../FormUser";

class InputUserFirstName_ extends Input {
  constructor(props: InputValueStringProp = { value: false, disabled: false }) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "First name",
        type: "text",
        name: "first_name",
        placeholder: "First name",
        vertical: true,
        value: props.value,
        readonly: props.readonly,
        disabled: props.disabled,
      },
      "input input_firstName"
    );
  }
}

export const InputUserFirstName = connect<typeof InputUserFirstName_, InputValueStringProp>(state => {
  const value = state.user?.first_name ?? false;
  return {
    value,
    readonly: EditModeBus.enable,
  };
})(InputUserFirstName_);

export const InputProfileFirstName = connect<typeof InputUserFirstName_, InputValueStringProp>(state => {
  const value = state.target_user?.first_name ?? false;
  return {
    value,
    readonly: true,
    disabled: value === false,
  };
})(InputUserFirstName_);
