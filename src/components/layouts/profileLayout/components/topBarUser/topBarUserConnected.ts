import { storeConnector } from "@/system/storeConnector";
import { TopBarUser } from "./topBarUser";
import type { TopBarUserProps } from "./topBarUser";
import { defaultLogin } from "@/system/consts";

export const TopBarUserConnected = storeConnector<typeof TopBarUser, TopBarUserProps>(function (state) {
  const login = state.user?.login ?? defaultLogin;
  return { login };
})(TopBarUser);
