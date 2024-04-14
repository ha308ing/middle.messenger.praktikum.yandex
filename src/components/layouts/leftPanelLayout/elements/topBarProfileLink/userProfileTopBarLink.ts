import { Block } from "@/system/block";
import router from "@/system/router";

export type LeftPanelTopBarProps = {
  src?: string;
  login?: string;
  click?: (args: any[]) => any;
};

export class UserProfileTopBarLink extends Block<LeftPanelTopBarProps> {
  constructor(props: LeftPanelTopBarProps) {
    super("div", {
      src: props.src,
      login: props.login,
      click: () => {
        router.go("/settings");
      },
    });
  }

  render() {
    const template = `
      <div class="topBar__titleLink">
        <img class="avatar avatar_profile" src="{{src}}" alt={{login}}>
        <h1>{{login}}</h1>
      </div>
    `;
    return this.compile(template, this.props);
  }
}
