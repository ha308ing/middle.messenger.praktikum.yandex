import { TopBarMessengerLinkConnected } from "../topBarThreadLink";
import { TopBarConnector } from "./topBarConnector";
import { TopBarThread } from "./topBarThread";

class TopBarMessenger extends TopBarThread {
  constructor() {
    super({ noBackButton: true });

    this.children.TopBarLink = new TopBarMessengerLinkConnected();
  }

  componentDidUpdate() {
    this.children.TopBarLink = new TopBarMessengerLinkConnected();
    return true;
  }
}

export const TopBarMessengerConnected = TopBarConnector(TopBarMessenger);
