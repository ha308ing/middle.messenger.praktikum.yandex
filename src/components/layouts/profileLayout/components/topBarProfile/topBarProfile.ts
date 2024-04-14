import type { IconButton } from "@/components/elements/iconButton";
import { IconButtonBack } from "@/components/elements/iconButton";
import { Block } from "@/system/block";
import { defaultLogin } from "@/system/consts";

type TopBarProfileConstructorProps = {
  backButton: IconButton;
  login?: string;
};

export type TopBarProfileProps = {
  login?: string;
};

const topBarClass = "topBar";

export class TopBarProfile extends Block<TopBarProfileConstructorProps> {
  constructor(props: TopBarProfileProps = { login: defaultLogin }) {
    super("nav", {
      login: props.login,
      class: topBarClass,
      settings: { withInternalId: true },
    });
    this.children.backButton = new IconButtonBack();
  }

  render() {
    const template = `
      {{{backButton}}}

    <div class="topBar__titleLink">
      <h2 class="topBar_heading">{{login}}</h2>
    </div>`;
    return this.compile(template, { ...this.props, backButton: this.children.backButton });
  }
}
