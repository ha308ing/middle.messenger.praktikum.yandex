import { AvatarProfile } from "@/components/elements/avatar";
import type Avatar from "@/components/elements/avatar";
import Component from "@/system/component";

type MemberLogoUsernameComponentProps = {
  Avatar: Avatar;
  login: string;
  click_capture: (...arg: any[]) => any;
};

type MemberLogoUsernameProps = {
  avatar: string;
  login: string;
};
export default class MemberLogoUsername extends Component<MemberLogoUsernameComponentProps> {
  constructor(props: MemberLogoUsernameProps) {
    super(
      "div",
      {
        Avatar: new AvatarProfile({ src: props.avatar, alt: props.login }),
        login: props.login,
        click_capture: (event: Event) => {
          event.stopPropagation();
        },
      },
      "memberLogoUsername"
    );
  }

  protected _setTemplate(): string | null {
    return `
    {{{Avatar}}}{{login}}
    `.trim();
  }
}
