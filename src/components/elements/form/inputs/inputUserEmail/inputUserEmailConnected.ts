import { type InputValueStringProp } from "@/components/elements/input";
import { storeConnector } from "@/system/storeConnector";
import { InputUserEmail } from "./inputUserEmail";

export const InputUserEmailConnected = storeConnector<typeof InputUserEmail, InputValueStringProp>(state => {
  const value = state.user?.email ?? false;
  return {
    value,
    readonly: false,
  };
})(InputUserEmail);
