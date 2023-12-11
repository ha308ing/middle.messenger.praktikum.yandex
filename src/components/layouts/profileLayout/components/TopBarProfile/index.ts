import type IconButton from "@/components/elements/iconButton";
import { IconButtonBack } from "@/components/elements/iconButton";
import Component from "@/system/component";
import connector from "@/system/storeConnector";

type TopBarProfileConstructorProps = {
  backButton: IconButton;
  login?: string;
};

type TopBarProfileProps = {
  login?: string;
};

export class TopBarProfile_ extends Component<TopBarProfileConstructorProps> {
  constructor(props: TopBarProfileProps = { login: "Sweater" }) {
    super(
      "nav",
      {
        backButton: new IconButtonBack(),
        login: props.login,
      },
      "topBar"
    );
  }

  protected _setTemplate(): string | null {
    return `
      {{{backButton}}}

    <div class="topBar__titleLink">
      <h2 class="topBar_heading">{{login}}</h2>
    </div>`;
  }
}

const TopBarProfile = connector<typeof TopBarProfile_, TopBarProfileProps>(function (state) {
  const login = state.target_user?.login ?? "Sweater";
  return { login };
})(TopBarProfile_);

export default TopBarProfile;
