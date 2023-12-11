import Component from "@/system/component";
import leftPanelTemplateString from "./leftPanelLayout.hbs?raw";
import Button from "@/components/elements/button";
import UserProfileTopBarLink from "./components/TopBarProfileLink";
import TopBar from "@/components/elements/topBar";
import type Input from "@/components/elements/input";

import ThreadController from "@/controllers/threadsController";
import ThreadsListConnected, { type ThreadsList_ } from "@/components/elements/threadsList";

export class LeftPanelTopBar extends TopBar {
  constructor(props?: { content: any }) {
    super({
      content: props?.content ?? new UserProfileTopBarLink({}),
    });
  }
}

type LeftPanelComponentProps = {
  TopBar?: TopBar | boolean;
  Search?: Input | boolean;
  Threads?: any[] | boolean | ThreadsList_;
  noThreadsMessage?: string;
  StartThreadButton?: Button;
};

export default class LeftPanel extends Component<LeftPanelComponentProps> {
  constructor(props?: LeftPanelComponentProps) {
    super(
      "section",
      {
        TopBar: props?.TopBar ?? new LeftPanelTopBar(),
        Search: false,
        Threads: new ThreadsListConnected({}),
        noThreadsMessage: "you have no threads",
        StartThreadButton: new Button(
          {
            buttonText: "Start a thread",
            click: (event: Event) => {
              event.preventDefault();
              ThreadController.createThread();
            },
          },
          "button button_startThread"
        ),
      },
      "leftPanel_container"
    );
  }

  protected _setTemplate(): string | null {
    return leftPanelTemplateString.trim();
  }
}
