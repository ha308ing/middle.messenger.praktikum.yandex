import Component from "@/system/component";
import "./ProfileLayout.scss";
import ProfileLayoutTemplate from "./ProfileLayout.hbs?raw";

import { AvatarProfileConnected, AvatarUserConnected } from "./components/Avatar";
// import { AvatarProfile, } from "@/components/elements/avatar"
import type Avatar from "@/components/elements/avatar";

import { type Login, LoginProfileConnected } from "./components/Login";

import TopBarProfile from "./components/TopBarProfile";
import { type TopBarProfile_ } from "./components/TopBarProfile";
import FormProfile from "@/components/elements/form/components/FormProfile";

import TopBarUserConnected from "./components/TopBarUser";
import { type TopBarUser_ } from "./components/TopBarUser";
import FormUser from "@/components/elements/form/components/FormUser";

import TopBarPasswordConnected from "./components/TopBarPassword";
import { type TopBarPassword_ } from "./components/TopBarPassword";
import FormPassword from "@/components/elements/form/components/FormPassword";
// import { InputFirstName } from "@/components/elements/input";

type ProfileLayoutProps = {
  TopBar: TopBarProfile_;
  Avatar: Avatar;
  Login: Login;
  Form: FormProfile;
};

export class ProfileLayout extends Component<ProfileLayoutProps> {
  constructor() {
    super(
      "section",
      {
        TopBar: new TopBarProfile(),
        Avatar: new AvatarProfileConnected(),
        Login: new LoginProfileConnected(),
        Form: new FormProfile(),
      },
      "rightPanel_content rightPanel_content_profileEdit threadList__active"
    );
  }

  protected _setTemplate(): string | null {
    return ProfileLayoutTemplate.trim();
  }
}

type UserLayoutComponentProps = {
  TopBar?: TopBarUser_;
  Avatar?: Avatar;
  Login?: Login;
  Form?: FormUser;
};

type UserLayoutProps = {
  login: string;
  avatar: string;
};

export class UserLayout extends Component<UserLayoutComponentProps> {
  constructor(props?: UserLayoutProps) {
    super(
      "section",
      {
        ...props,
        TopBar: new TopBarUserConnected(),
        Avatar: new AvatarUserConnected(),
        // Avatar: new AvatarUser({ alt: props?.login, src: props?.avatar }),
        // Avatar: new AvatarProfile({ alt: props?.login, src: props?.avatar }),
        // Login: new LoginUserConnected(),
        // Login: new LoginUserConnected(),
        Form: new FormUser(),
      },
      "rightPanel_content rightPanel_content_profileEdit threadList__active"
    );
  }

  protected _setTemplate(): string | null {
    return ProfileLayoutTemplate.trim();
  }
}

type PasswordLayoutProps = {
  TopBar?: TopBarPassword_;
  Avatar?: Avatar;
  Login?: Login;
  Form?: FormPassword;
};

export class PasswordLayout extends Component<PasswordLayoutProps> {
  constructor() {
    super(
      "section",
      {
        TopBar: new TopBarPasswordConnected(),
        Avatar: new AvatarUserConnected(),
        // Login: new LoginUserConnected(),
        Form: new FormPassword(),
      },
      "rightPanel_content rightPanel_content_profileEdit threadList__active"
    );
  }

  protected _setTemplate(): string | null {
    return ProfileLayoutTemplate.trim();
  }
}
