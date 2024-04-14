import template from "./leftPanelLayout.hbs?raw";
import { Button } from "@/components/elements/button";
import { UserProfileTopBarLinkConnected } from "./elements/topBarProfileLink";
import { TopBar } from "@/components/elements/topBar";
import type { Input } from "@/components/elements/input";
import ThreadController from "@/controllers/threadsController";
import { ThreadsListConnected } from "@/components/elements/threadsList";
import type { ThreadsList, ThreadListItem } from "@/components/elements/threadsList";
import { Block } from "@/system/block";

export class LeftPanelTopBar extends TopBar {
  constructor(props?: { content: unknown }) {
    super({
      content: props?.content ?? new UserProfileTopBarLinkConnected({}),
    });
  }
}

type LeftPanelComponentProps = {
  TopBar?: TopBar | boolean;
  Search?: Input | boolean;
  Threads?: ThreadListItem[] | boolean | ThreadsList;
  noThreadsMessage?: string;
  StartThreadButton?: Button;
};

export class LeftPanel extends Block<LeftPanelComponentProps> {
  constructor() {
    super("section", {
      Search: false,
      noThreadsMessage: "you have no threads",
      class: "leftPanel_container",
    });

    this.children.TopBar = new LeftPanelTopBar();
    this.children.Threads = new ThreadsListConnected();
    this.children.StartThreadButton = new Button({
      buttonText: "Start a thread",
      class: "button button_startThread",
      click: (event: Event) => {
        event.preventDefault();
        ThreadController.createThread();
      },
    });
  }

  render() {
    return this.compile(template.trim(), {
      TopBar: this.children.TopBar,
      Threads: this.children.Threads,
      StartThreadButton: this.children.StartThreadButton,
    });
  }
}
