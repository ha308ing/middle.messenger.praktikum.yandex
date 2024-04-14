import { storeConnector } from "@/system/storeConnector";
import "./topBarProfileLink.scss";
import { UserProfileTopBarLink } from "./userProfileTopBarLink";
import type { LeftPanelTopBarProps } from "./userProfileTopBarLink";
import { brandImage as defaultAvatar, defaultLogin } from "@/system/consts";

export const UserProfileTopBarLinkConnected = storeConnector<typeof UserProfileTopBarLink, LeftPanelTopBarProps>(
  function (state) {
    const login = state.user?.login ?? defaultLogin;
    const src = state.user?.avatar ?? defaultAvatar;
    return {
      login,
      src,
    };
  }
)(UserProfileTopBarLink);
