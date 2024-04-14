import { type InputValueStringProp } from "@/components/elements/input";
import { storeConnector } from "@/system/storeConnector";
import { InputUserLogin } from "./inputUserLogin";

export const InputProfileLoginConnected = storeConnector<typeof InputUserLogin, InputValueStringProp>(state => {
  const value = state.target_user?.login ?? false;
  return {
    value,
    readonly: true,
    disabled: value === false,
  };
})(InputUserLogin);
