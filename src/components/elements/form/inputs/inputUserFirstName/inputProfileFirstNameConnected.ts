import { type InputValueStringProp } from "@/components/elements/input";
import { storeConnector } from "@/system/storeConnector";
import { InputUserFirstName } from "./inputUserFirstName";

export const InputProfileFirstNameConnected = storeConnector<typeof InputUserFirstName, InputValueStringProp>(state => {
  const value = state.target_user?.first_name ?? false;
  return {
    value,
    readonly: true,
    disabled: value === false,
  };
})(InputUserFirstName);
