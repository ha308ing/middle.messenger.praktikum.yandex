import Component from "@/system/component";
import connect from "@/system/storeConnector";
import Router from "@/system/router";
import sweater from "@/assets/sweater.png";

type LeftPanelTopBarProps = {
  src?: string;
  login?: string;
  click?: (args: any[]) => any;
};

export class UserProfileTopBarLink_ extends Component<LeftPanelTopBarProps> {
  constructor(props: LeftPanelTopBarProps) {
    super("div", {
      src: props.src,
      login: props.login,
      click: () => {
        Router.go("/settings");
      },
    });
  }

  protected _setTemplate(): string | null {
    return `
      <div class="topBar__titleLink">
        <img class="avatar avatar_profile" src="{{src}}" alt={{login}}>
        <h1>{{login}}</h1>
      </div>
    `;
  }
}

const UserProfileTopBarLinkConnected = connect<typeof UserProfileTopBarLink_, LeftPanelTopBarProps>(function (state) {
  const login = state.user?.login ?? "Sweater";
  const src = state.user?.avatar ?? sweater;
  return {
    login,
    src,
  };
})(UserProfileTopBarLink_);

// const  =  connectUserTopBar(UserProfileTopBarLink_);
export default UserProfileTopBarLinkConnected;
