import twoPanelLayoutTemplateString from "./twoPanelsLayout.hbs?raw";
import "./twoPanelsLayout.scss";
import { LeftPanel } from "@/components/layouts/leftPanelLayout";
import type { RightPanel } from "@/components/layouts/rightPanelLayout";
import { Block } from "@/system/block";

type TwoPanelLayoutComponentProps = {
  LeftPanel?: LeftPanel;
  RightPanel?: RightPanel;
};

export class TwoPanelLayout extends Block<TwoPanelLayoutComponentProps> {
  constructor() {
    super("div", {
      class: `threadsPage_container leftPanelLayout_container`,
    });

    this.children.LeftPanel = new LeftPanel();
  }

  render() {
    const template = twoPanelLayoutTemplateString.trim();
    return this.compile(template, {
      LeftPanel: this.children?.LeftPanel,
      RightPanel: this.children?.RightPanel,
    });
  }
}
