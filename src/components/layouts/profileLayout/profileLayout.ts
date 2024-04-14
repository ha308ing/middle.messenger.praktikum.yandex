import "./profileLayout.scss";
import template from "./profileLayout.hbs?raw";
import { AvatarProfileConnected, TopBarProfileConnected, LoginProfileConnected } from "./components";
import type { TopBarProfile, Login } from "./components";
import type { Avatar } from "@/components/elements/avatar";
import { FormProfile } from "@/components/elements/form";

import { Block } from "@/system/block";
// import { AvatarProfile, } from "@/components/elements/avatar"
// import { InputFirstName } from "@/components/elements/input";

type ProfileLayoutProps = {
  TopBar: TopBarProfile;
  Avatar: Avatar;
  Login: Login;
  Form: FormProfile;
};

export class ProfileLayout extends Block<ProfileLayoutProps> {
  constructor() {
    super("section", {
      class: "rightPanel_content rightPanel_content_profileEdit threadList__active",
    });

    this.children.TopBar = new TopBarProfileConnected();
    this.children.Avatar = new AvatarProfileConnected();
    this.children.Login = new LoginProfileConnected();
    this.children.Form = new FormProfile();
  }

  render() {
    return this.compile(template.trim(), {
      ...this.props,
      TopBar: this.children.TopBar,
      Avatar: this.children.Avatar,
      Login: this.children.Login,
      Form: this.children.Form,
    });
  }
}
