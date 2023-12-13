import { IconButtonBack } from "@/components/elements/iconButton";
import Component from "@/system/component";
import connect from "@/system/storeConnector";
import "./TopBarThread.scss";
import { TopBarManageLinkConnected, TopBarMessengerLinkConnected } from "../TopBarThreadLink";

class TopBarThread extends Component {
  constructor(props?: any) {
    super(
      "nav",
      {
        backButton: new IconButtonBack(),
        TopBarLink: props.TopBarLink,
        hidden: false,
        ...props,
      },
      "topBar"
    );
  }

  protected _setTemplate(): string | null {
    return `
    {{#unless hidden}}
      {{{backButton}}}
      {{{TopBarLink}}}
    {{/unless}}
  `;
  }
}

class TopBarMessenger extends TopBarThread {
  constructor() {
    super({
      TopBarLink: new TopBarMessengerLinkConnected(),
    });
  }
}

class TopBarManage extends TopBarThread {
  constructor() {
    super({
      TopBarLink: new TopBarManageLinkConnected(),
    });
  }
}

const TopBarMapper = connect<typeof TopBarThread, { TopBarLink: any }>(state => {
  const { activeThread } = state;
  if (activeThread == null) {
    return { hidden: true, class: "hidden" };
  } else {
    const thread = state.threads[activeThread];
    if (thread == null) {
      return { hidden: true, class: "hidden" };
    } else {
      return { hidden: false, class: "", ...thread };
    }
  }
});

export const TopBarMessengerConnected = TopBarMapper(TopBarMessenger);
export const TopBarManageConnected = TopBarMapper(TopBarManage);
