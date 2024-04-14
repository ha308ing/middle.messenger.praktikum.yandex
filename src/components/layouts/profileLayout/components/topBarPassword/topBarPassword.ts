import type { IconButton } from "@/components/elements/iconButton";
import { IconButtonBack } from "@/components/elements/iconButton";
import { IconButtonExit } from "../iconButtons";
import { Block } from "@/system/block";
import { defaultLogin } from "@/system/consts";

type TopBarPasswordConstructorProps = {
  backButton: IconButton;
  login?: string;
  exitButton: IconButton;
};

export type TopBarPasswordProps = {
  login?: string;
};

const topBarClass = "topBar";

export class TopBarPassword extends Block<TopBarPasswordConstructorProps> {
  constructor(props: TopBarPasswordProps = { login: defaultLogin }) {
    super("nav", {
      backButton: new IconButtonBack(),
      login: props.login,
      exitButton: new IconButtonExit(),
      class: topBarClass,
    });
  }

  render() {
    const template = `
    {{{backButton}}}

    <div class="topBar__titleLink">
      <h2 class="topBar_heading">{{login}}</h2>
    </div>

    {{{exitButton}}}
    `;

    return this.compile(template, this.props);
  }
}
