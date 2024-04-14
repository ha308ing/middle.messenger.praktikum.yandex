import { storeConnector } from "@/system/storeConnector";
import { Login } from "./login";
import type { LoginProps } from "./login";
import { defaultLogin } from "@/system/consts";

export const LoginProfileConnected = storeConnector<typeof Login, LoginProps>(state => {
  const value = state.target_user?.login ?? defaultLogin;
  return {
    login: value,
  };
})(Login);
