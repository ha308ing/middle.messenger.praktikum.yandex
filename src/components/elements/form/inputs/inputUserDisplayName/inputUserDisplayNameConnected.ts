import { storeConnector } from "@/system/storeConnector";
import { InputUserDisplayName } from "./inputUserDisplayName";
import type { InputValueStringProp } from "@/components/elements/input";

export const InputUserDisplayNameConnected = storeConnector<typeof InputUserDisplayName, InputValueStringProp>(
  state => {
    const value = state.user?.display_name ?? "";
    return {
      value,
      readonly: false,
    };
  }
)(InputUserDisplayName);
