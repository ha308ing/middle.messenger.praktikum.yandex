import { AvatarProfile } from "@/components/elements/avatar";
import type { Avatar } from "@/components/elements/avatar";
import { Block } from "@/system/block";

type MemberLogoUsernameComponentProps = {
  Avatar: Avatar;
  login: string;
  click_capture: (...arg: any[]) => any;
};

type MemberLogoUsernameProps = {
  avatar: string;
  login: string;
};
export class MemberLogoUsername extends Block<MemberLogoUsernameComponentProps> {
  constructor(props: MemberLogoUsernameProps) {
    super("div", {
      ...props,
      click_capture: (event: Event) => {
        event.stopPropagation();
      },
      class: "memberLogoUsername",
      settings: {
        withInternalId: true,
      },
    });

    this.children.Avatar = new AvatarProfile({ src: props.avatar, alt: props.login });
  }

  componentDidUpdate() {
    this.children.Avatar = new AvatarProfile({ src: this.props.avatar, alt: this.props.login });
    return true;
  }

  render() {
    const template = `{{{Avatar}}}{{login}}`;
    return this.compile(template, { ...this.props, Avatar: this.children.Avatar });
  }
}
