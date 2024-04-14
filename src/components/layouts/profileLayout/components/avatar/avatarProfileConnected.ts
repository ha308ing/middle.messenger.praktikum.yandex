import { AvatarProfile as Avatar, type AvatarProps, avatarAlt, avatarUrl } from "@/components/elements/avatar";
import { storeConnector } from "@/system/storeConnector";

export const AvatarProfileConnected = storeConnector<typeof Avatar, AvatarProps>(function (state) {
  const alt = state.target_user?.login ?? avatarAlt;
  const src = state.target_user?.avatar ?? avatarUrl;
  return {
    alt,
    src,
  };
})(Avatar);
