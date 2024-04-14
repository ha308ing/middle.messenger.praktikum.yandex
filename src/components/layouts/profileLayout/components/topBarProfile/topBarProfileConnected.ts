import { storeConnector } from "@/system/storeConnector";
import { TopBarProfile } from "./topBarProfile";
import type { TopBarProfileProps } from "./topBarProfile";
import { defaultLogin } from "@/system/consts";

export const TopBarProfileConnected = storeConnector<typeof TopBarProfile, TopBarProfileProps>(function (state) {
  const login = state.target_user?.login ?? defaultLogin;
  return { login };
})(TopBarProfile);
