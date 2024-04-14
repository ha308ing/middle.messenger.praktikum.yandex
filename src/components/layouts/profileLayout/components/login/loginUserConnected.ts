import { storeConnector } from "@/system/storeConnector";
import { Login } from "./login";
import type { LoginProps } from "./login";
import { defaultLogin } from "@/system/consts";

export const LoginUserConnected = storeConnector<typeof Login, LoginProps>(state => {
  const value = state.user?.login ?? defaultLogin;
  return {
    login: value,
  };
})(Login);
