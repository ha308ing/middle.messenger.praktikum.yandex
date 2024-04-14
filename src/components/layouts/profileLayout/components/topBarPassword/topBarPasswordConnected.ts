import { storeConnector } from "@/system/storeConnector";
import { TopBarPassword } from "./topBarPassword";
import type { TopBarPasswordProps } from "./topBarPassword";
import { defaultLogin } from "@/system/consts";

export const TopBarPasswordConnected = storeConnector<typeof TopBarPassword, TopBarPasswordProps>(function (state) {
  const login = state.user?.login ?? defaultLogin;
  return { login };
})(TopBarPassword);
