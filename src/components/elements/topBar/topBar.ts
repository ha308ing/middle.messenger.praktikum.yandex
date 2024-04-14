import template from "./topBar.hbs?raw";
import "./topBar.scss";
import type { IconButton } from "@/components/elements/iconButton";
import { Block } from "@/system/block";

export type TopBarProps = {
  backButton?: false | IconButton;
  content?: unknown;
  contextButton?: false | IconButton;
  editButton?: false | IconButton;
  exitButton?: false | IconButton;
  passwordChangeButton?: false | IconButton;
  class?: string;
};

export class TopBar extends Block<TopBarProps> {
  constructor(props: TopBarProps) {
    super("nav", { ...props, class: "topBar " + (props.class ?? "") });
  }

  render() {
    return this.compile(template, this.props);
  }
}
