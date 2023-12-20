import type IconButton from "@/components/elements/iconButton";
import { IconButtonBack } from "@/components/elements/iconButton";
import Component from "@/system/component";
import connect from "@/system/storeConnector";
import "./TopBarThread.scss";
import { TopBarManageLinkConnected, TopBarMessengerLinkConnected, type TopBarThreadLink } from "../TopBarThreadLink";
import { type TopBarTitleLink } from "@/components/elements/topBar";

type TopBarThreadProps = {
  backButton?: IconButton;
  TopBarLink?: TopBarThreadLink | TopBarTitleLink;
  hidden?: boolean;
  [key: string]: unknown;
};

class TopBarThread extends Component {
  constructor(props?: TopBarThreadProps) {
    super(
      "nav",
      {
        backButton: new IconButtonBack(),
        TopBarLink: props?.TopBarLink,
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

const TopBarMapper = connect<typeof TopBarThread, { TopBarLink: TopBarTitleLink }>(state => {
  const { activeThread } = state;
  if (activeThread == null) {
    return { hidden: true, class: "hidden" };
  } else {
    const thread = state?.threads_?.[activeThread];
    if (thread == null) {
      return { hidden: true, class: "hidden" };
    } else {
      return { hidden: false, class: "", ...thread };
    }
  }
});

export const TopBarMessengerConnected = TopBarMapper(TopBarMessenger);
export const TopBarManageConnected = TopBarMapper(TopBarManage);
