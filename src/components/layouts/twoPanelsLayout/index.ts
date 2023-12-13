import Component from "@/system/component";
import twoPanelLayoutTemplateString from "./twoPanelsLayout.hbs?raw";
import "./twoPanelsLayout.scss";
import LeftPanel from "@/components/layouts/leftPanelLayout";
import RightPanel from "@/components/layouts/rightPanelLayout";

type TwoPanelLayoutComponentProps = {
  LeftPanel?: LeftPanel;
  RightPanel?: RightPanel;
};

export default class TwoPanelLayout extends Component<TwoPanelLayoutComponentProps> {
  constructor(props?: TwoPanelLayoutComponentProps, persistClass = "") {
    // constructor(props) {
    super(
      "div",
      {
        LeftPanel: props?.LeftPanel ?? new LeftPanel({}),
        RightPanel: props?.RightPanel ?? new RightPanel({}),

        ...props,
      },
      `threadsPage_container leftPanelLayout_container ${persistClass}`
    );
  }

  protected _setTemplate(): string | null {
    return twoPanelLayoutTemplateString.trim();
  }
}
