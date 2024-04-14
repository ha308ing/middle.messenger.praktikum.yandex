import "./profileLayout.scss";
import template from "./profileLayout.hbs?raw";
import { AvatarUserConnected, TopBarPasswordConnected } from "./components";
import type { Login, TopBarPassword } from "./components";
import type { Avatar } from "@/components/elements/avatar";
import { FormPassword } from "@/components/elements/form";

import { Block } from "@/system/block";
// import { AvatarProfile, } from "@/components/elements/avatar"
// import { InputFirstName } from "@/components/elements/input";

type PasswordLayoutProps = {
  TopBar?: TopBarPassword;
  Avatar?: Avatar;
  Login?: Login;
  Form?: FormPassword;
};

export class PasswordLayout extends Block<PasswordLayoutProps> {
  constructor() {
    super("section", {
      class: "rightPanel_content rightPanel_content_profileEdit threadList__active",
    });

    this.children.TopBar = new TopBarPasswordConnected();
    this.children.Avatar = new AvatarUserConnected();
    this.children.Form = new FormPassword();
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
