import type { IconButton } from "@/components/elements/iconButton";
import { IconButtonBack } from "@/components/elements/iconButton";
import { IconButtonPassword, IconButtonExit } from "../iconButtons";
import { Block } from "@/system/block";
import { defaultLogin } from "@/system/consts";

type TopBarUserConstructorProps = {
  backButton: IconButton;
  login?: string;
  passwordChangeButton: IconButton | false;
  exitButton: IconButton | false;
};

export type TopBarUserProps = {
  login?: string;
};

const topBarClass = "topBar";

export class TopBarUser extends Block<TopBarUserConstructorProps> {
  constructor(props?: TopBarUserProps) {
    super("nav", {
      backButton: new IconButtonBack(),
      login: props?.login ?? defaultLogin,
      exitButton: new IconButtonExit(),
      class: topBarClass,
    });

    this.children.passwordChangeButton = new IconButtonPassword();
  }

  render() {
    const template = `
    {{{backButton}}}

    <div class="topBar__titleLink">
      <h2 class="topBar_heading">{{login}}</h2>
    </div>

    {{{passwordChangeButton}}}

    {{{exitButton}}}
    `;
    return this.compile(template, { ...this.props, passwordChangeButton: this.children.passwordChangeButton });
  }
}
