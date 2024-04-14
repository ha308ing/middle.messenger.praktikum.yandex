import { type InputValueStringProp } from "@/components/elements/input";
import { storeConnector } from "@/system/storeConnector";
import { InputUserPhone } from "./inputUserPhone";

export const InputProfilePhoneConnected = storeConnector<typeof InputUserPhone, InputValueStringProp>(state => {
  const value = state.target_user?.phone ?? false;
  return {
    value,
    readonly: true,
    disabled: value === false,
  };
})(InputUserPhone);
