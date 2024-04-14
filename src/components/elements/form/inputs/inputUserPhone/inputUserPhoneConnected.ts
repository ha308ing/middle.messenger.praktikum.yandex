import { type InputValueStringProp } from "@/components/elements/input";
import { storeConnector } from "@/system/storeConnector";
import { InputUserPhone } from "./inputUserPhone";

export const InputUserPhoneConnected = storeConnector<typeof InputUserPhone, InputValueStringProp>(state => {
  const userPhone = state.user?.phone ?? false;
  return {
    value: userPhone,
    readonly: false,
  };
})(InputUserPhone);
