import { AvatarProfile as Avatar, type AvatarProps, avatarAlt, avatarUrl } from "@/components/elements/avatar";
import { storeConnector } from "@/system/storeConnector";

export const AvatarUserConnected = storeConnector<typeof Avatar, AvatarProps>(function (state) {
  const alt = state.user?.login ?? avatarAlt;
  const src = state.user?.avatar ?? avatarUrl;
  return {
    alt,
    src,
  };
})(Avatar);
