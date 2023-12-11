import sweater from "@/assets/sweater.png";
import connector from "@/system/storeConnector";

import { AvatarProfile as Avatar, type AvatarProps } from "@/components/elements/avatar";

export const AvatarProfileConnected = connector<typeof Avatar, AvatarProps>(function (state) {
  const alt = state.target_user?.login ?? "Sweater";
  const src = state.target_user?.avatar ?? sweater;
  return {
    alt,
    src,
  };
})(Avatar);

export const AvatarUserConnected = connector<typeof Avatar, AvatarProps>(function (state) {
  const alt = state.user?.login ?? "Sweater";
  const src = state.user?.avatar ?? sweater;
  return {
    alt,
    src,
  };
})(Avatar);
