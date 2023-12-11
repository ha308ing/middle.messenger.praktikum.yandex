import Input, { type InputValueStringProp } from "@/components/elements/input";
import connect from "@/system/storeConnector";
import { EditModeBus } from "../FormUser";

export class InputUserPhone_ extends Input {
  constructor(props: InputValueStringProp = { value: false, disabled: false }) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "Phone",
        type: "text",
        name: "phone",
        placeholder: "Phone",
        vertical: true,
        value: props.value,
        readonly: props.readonly,
        disabled: props.disabled,
      },
      "input input_phone"
    );
  }
}

export const InputUserPhone = connect<typeof InputUserPhone_, InputValueStringProp>(state => {
  const userPhone = state.user?.phone ?? false;
  return {
    value: userPhone,
    readonly: EditModeBus.enable,
  };
})(InputUserPhone_);

export const InputProfilePhone = connect<typeof InputUserPhone_, InputValueStringProp>(state => {
  const value = state.target_user?.phone ?? false;
  return {
    value,
    readonly: true,
    disabled: value === false,
  };
})(InputUserPhone_);
