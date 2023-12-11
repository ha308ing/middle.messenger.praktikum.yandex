import Component from "@/system/component";
import topBarTemplateString from "./topBar.hbs?raw";
import "./topBar.scss";
import type IconButton from "@/components/elements/iconButton";

export type TopBarProps = {
  backButton?: false | IconButton;
  content?: any;
  contextButton?: false | IconButton;
  editButton?: false | IconButton;
  exitButton?: false | IconButton;
  passwordChangeButton?: false | IconButton;
};

export default class TopBar<K extends TopBarProps = TopBarProps> extends Component<K> {
  constructor(props: K) {
    super("nav", { ...props }, "topBar");
  }

  protected _setTemplate(): string {
    return topBarTemplateString.trim();
  }
}

type TopBarTitleLinkProps = {
  content?: any;
};

export class TopBarTitleLink extends Component<TopBarTitleLinkProps> {
  constructor(props: TopBarTitleLinkProps, persistClass = "") {
    super("div", { ...props, content: props.content ?? "no content" }, `topBar__titleLink ${persistClass}`);
  }

  protected _setTemplate() {
    return "{{{content}}}";
  }
}
