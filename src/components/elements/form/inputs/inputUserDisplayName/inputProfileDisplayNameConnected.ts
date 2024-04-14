import { storeConnector } from "@/system/storeConnector";
import { InputUserDisplayName } from "./inputUserDisplayName";
import type { InputValueStringProp } from "@/components/elements/input";

export const InputProfileDisplayNameConnected = storeConnector<typeof InputUserDisplayName, InputValueStringProp>(
  state => {
    const value = state.target_user?.display_name ?? false;
    return {
      value,
      readonly: true,
      disabled: value === false,
    };
  }
)(InputUserDisplayName);
