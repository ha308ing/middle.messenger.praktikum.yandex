import { type InputValueStringProp } from "@/components/elements/input";
import { storeConnector } from "@/system/storeConnector";
import { InputUserSecondName } from "./inputUserSecondName";

export const InputProfileSecondNameConnected = storeConnector<typeof InputUserSecondName, InputValueStringProp>(
  state => {
    const value = state.target_user?.second_name ?? false;
    return {
      value,
      readonly: true,
      disabled: value === false,
    };
  }
)(InputUserSecondName);
