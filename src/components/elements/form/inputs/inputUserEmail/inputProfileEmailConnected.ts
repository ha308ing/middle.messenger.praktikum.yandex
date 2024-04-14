import { type InputValueStringProp } from "@/components/elements/input";
import { storeConnector } from "@/system/storeConnector";
import { InputUserEmail } from "./inputUserEmail";

export const InputProfileEmailConnected = storeConnector<typeof InputUserEmail, InputValueStringProp>(state => {
  const value = state.target_user?.email ?? false;
  return {
    value,
    readonly: true,
    disabled: value === false,
  };
})(InputUserEmail);
