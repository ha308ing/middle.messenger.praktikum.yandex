import { type InputValueStringProp } from "@/components/elements/input";
import { storeConnector } from "@/system/storeConnector";
import { InputUserFirstName } from "./inputUserFirstName";

export const InputUserFirstNameConnected = storeConnector<typeof InputUserFirstName, InputValueStringProp>(state => {
  const value = state.user?.first_name ?? false;
  return {
    value,
    readonly: false,
  };
})(InputUserFirstName);
