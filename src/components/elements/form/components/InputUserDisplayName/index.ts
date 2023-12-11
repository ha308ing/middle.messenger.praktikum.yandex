import Input, { type InputValueStringProp } from "@/components/elements/input";
import connect from "@/system/storeConnector";
import { EditModeBus } from "../FormUser";

class InputUserDisplayName_ extends Input {
  constructor(props: InputValueStringProp = { value: "", disabled: false }) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "Display name",
        type: "text",
        name: "display_name",
        placeholder: "Display name",
        vertical: true,
        value: props.value,
        readonly: props.readonly,
        disabled: props.disabled,
      },
      "input input_secondName"
    );
  }
}

export const InputUserDisplayName = connect<typeof InputUserDisplayName_, InputValueStringProp>(state => {
  const value = state.user?.display_name ?? false;
  return {
    value,
    readonly: EditModeBus.enable,
  };
})(InputUserDisplayName_);

export const InputProfileDisplayName = connect<typeof InputUserDisplayName_, InputValueStringProp>(state => {
  const value = state.target_user?.display_name ?? false;
  return {
    value,
    readonly: true,
    disabled: value === false,
  };
})(InputUserDisplayName_);
