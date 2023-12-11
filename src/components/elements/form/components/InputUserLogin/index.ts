import Input, { type InputValueStringProp } from "@/components/elements/input";
import connect from "@/system/storeConnector";
import { EditModeBus } from "../FormUser";

export class InputUserLogin_ extends Input {
  constructor(props: InputValueStringProp = { value: false, disabled: false }) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "Login",
        type: "text",
        name: "login",
        placeholder: "Login",
        vertical: true,
        value: props.value,
        // readonly: true,
        readonly: props.readonly,
        disabled: props.disabled,
      },
      "input input_login"
    );
  }
}

export const InputUserLogin = connect<typeof InputUserLogin_, InputValueStringProp>(state => {
  const userLogin = state.user?.login ?? false;
  return {
    value: userLogin,
    readonly: EditModeBus.enable,
  };
})(InputUserLogin_);

export const InputProfileLogin = connect<typeof InputUserLogin_, InputValueStringProp>(state => {
  const value = state.target_user?.login ?? false;
  return {
    value,
    readonly: true,
    disabled: value === false,
  };
})(InputUserLogin_);
