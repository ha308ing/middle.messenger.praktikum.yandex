import "./messenger.scss";
import { TwoPanelLayout } from "@/components/layouts/twoPanelsLayout";
import { RightPanel } from "@/components/layouts/rightPanelLayout";
import { TopBarMessengerConnected, SendBarConnected, ThreadMessagesConnected } from "@/components/layouts/threadLayout";

class MessengerRightPanel extends RightPanel {
  constructor() {
    super();

    this.lists.content = [new TopBarMessengerConnected(), new ThreadMessagesConnected(), new SendBarConnected()];
  }
}

export class MessengerPage extends TwoPanelLayout {
  constructor() {
    super();

    this.children.RightPanel = new MessengerRightPanel();
  }
}
