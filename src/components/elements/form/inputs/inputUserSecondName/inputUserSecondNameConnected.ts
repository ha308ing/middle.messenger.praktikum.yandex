import { type InputValueStringProp } from "@/components/elements/input";
import { storeConnector } from "@/system/storeConnector";
import { InputUserSecondName } from "./inputUserSecondName";

export const InputUserSecondNameConnected = storeConnector<typeof InputUserSecondName, InputValueStringProp>(state => {
  const value = state.user?.second_name ?? false;
  return {
    value,
    readonly: false,
  };
})(InputUserSecondName);
