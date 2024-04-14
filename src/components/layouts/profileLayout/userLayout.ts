import "./profileLayout.scss";
import template from "./profileLayout.hbs?raw";
import { AvatarUserConnected, TopBarUserConnected } from "./components";
import type { TopBarUser, Login } from "./components";
import type { Avatar } from "@/components/elements/avatar";
import { FormUser } from "@/components/elements/form";

import { Block } from "@/system/block";
// import { AvatarProfile, } from "@/components/elements/avatar"
// import { InputFirstName } from "@/components/elements/input";

type UserLayoutComponentProps = {
  TopBar?: TopBarUser;
  Avatar?: Avatar;
  Login?: Login;
  Form?: FormUser;
};

type UserLayoutProps = {
  login: string;
  avatar: string;
};

export class UserLayout extends Block<UserLayoutComponentProps> {
  constructor(props?: UserLayoutProps) {
    super("section", {
      ...props,
      class: "rightPanel_content rightPanel_content_profileEdit threadList__active",
    });

    this.children.TopBar = new TopBarUserConnected();
    this.children.Avatar = new AvatarUserConnected();
    this.children.Form = new FormUser();
  }

  render() {
    return this.compile(template.trim(), {
      ...this.props,
      TopBar: this.children.TopBar,
      Avatar: this.children.Avatar,
      Form: this.children.Form,
    });
  }
}
