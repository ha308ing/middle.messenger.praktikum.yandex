import { type InputValueStringProp } from "@/components/elements/input";
import { storeConnector } from "@/system/storeConnector";
import { InputUserLogin } from "./inputUserLogin";

export const InputUserLoginConnected = storeConnector<typeof InputUserLogin, InputValueStringProp>(state => {
  const userLogin = state.user?.login ?? false;
  return {
    value: userLogin,
    readonly: false,
  };
})(InputUserLogin);
