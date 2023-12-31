import type IconButton from "@/components/elements/iconButton";
import { IconButtonBack } from "@/components/elements/iconButton";
import { IconButtonPassword, IconButtonExit } from "../IconButtons";
import Component from "@/system/component";
import connector from "@/system/storeConnector";

type TopBarUserConstructorProps = {
  backButton: IconButton;
  login?: string;
  passwordChangeButton: IconButton | false;
  exitButton: IconButton | false;
};

type TopBarUserProps = {
  login?: string;
};

export class TopBarUser_ extends Component<TopBarUserConstructorProps> {
  constructor(props?: TopBarUserProps) {
    super(
      "nav",
      {
        backButton: new IconButtonBack(),
        login: props?.login ?? "Sweater",
        passwordChangeButton: new IconButtonPassword(),
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

    {{{passwordChangeButton}}}

    {{{exitButton}}}
    `;
  }
}

const TopBarUserConnected = connector<typeof TopBarUser_, TopBarUserProps>(function (state) {
  const login = state.user?.login ?? "Sweater";
  return { login };
})(TopBarUser_);

export default TopBarUserConnected;
