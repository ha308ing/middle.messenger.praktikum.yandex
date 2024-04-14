import rightPanelLayoutTemplateString from "./rightPanelLayout.hbs?raw";
import { Block } from "@/system/block";

export type RightPanelProps = {
  content?: unknown;
  noContentMessage?: string;
};

export class RightPanel<K extends RightPanelProps = RightPanelProps> extends Block<RightPanelProps> {
  constructor(props?: K, persistClass = "") {
    super("section", {
      class: `rightPanel_container ${persistClass}`,
      ...props,
    });
  }

  render() {
    return this.compile(rightPanelLayoutTemplateString.trim(), {
      ...this.props,
      content: this.lists.content,
      noContentMessage: this.children?.noContentMessage ?? "please select a thread",
    });
  }
}
