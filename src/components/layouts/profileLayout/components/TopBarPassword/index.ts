import type IconButton from "@/components/elements/iconButton";
import { IconButtonBack } from "@/components/elements/iconButton";
import { IconButtonExit } from "../IconButtons";
import Component from "@/system/component";
import connector from "@/system/storeConnector";

type TopBarPasswordConstructorProps = {
  backButton: IconButton;
  login?: string;
  exitButton: IconButton;
};

type TopBarPasswordProps = {
  login?: string;
};

export class TopBarPassword_ extends Component<TopBarPasswordConstructorProps> {
  constructor(props: TopBarPasswordProps = { login: "Sweater" }) {
    super(
      "nav",
      {
        backButton: new IconButtonBack(),
        login: props.login,
        exitButton: new IconButtonExit(),
      },
      "topBar"
    );
  }

  protected _setTemplate(): string | null {
    return `
    {{{backButton}}}

    <div class="topBar__titleLink">
      <h2 class="topBar_heading">{{login}}</h2>
    </div>

    {{{exitButton}}}
    `;
  }
}

const TopBarPasswordConnected = connector<typeof TopBarPassword_, TopBarPasswordProps>(function (state) {
  const login = state.user?.login ?? "Sweater";
  return { login };
})(TopBarPassword_);

export default TopBarPasswordConnected;
