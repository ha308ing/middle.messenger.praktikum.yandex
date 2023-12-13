import Component from "@/system/component";
import rightPanelLayoutTemplateString from "./rightPanelLayout.hbs?raw";

export type RightPanelProps = {
  content?: unknown;
  noContentMessage?: string;
};

export default class RightPanel<K extends RightPanelProps = RightPanelProps> extends Component<RightPanelProps> {
  constructor(props?: K, persistClass = "") {
    super(
      "section",
      {
        content: props?.content ?? false,
        noContentMessage: props?.noContentMessage == null ? "please select a thread" : props.noContentMessage,
        ...props,
      },
      `rightPanel_container ${persistClass}`
    );

    /*     Store.on(StoreEvents.ActivateThread, (arg) => {
      this.setProps({
        content: new ThreadLayout({
          TopBar: new TopBarThread(),
          content: new ThreadMessages({messages:[]})
        })
      })
    }) */
  }

  protected _setTemplate(): string | null {
    return rightPanelLayoutTemplateString.trim();
  }
}
