import { TopBarManageLinkConnected } from "../topBarThreadLink";
import { TopBarConnector } from "./topBarConnector";
import { TopBarThread } from "./topBarThread";

class TopBarManage extends TopBarThread {
  constructor() {
    super();
    this.children.TopBarLink = new TopBarManageLinkConnected();
  }

  componentDidUpdate() {
    this.children.TopBarLink = new TopBarManageLinkConnected();
    return true;
  }
}

export const TopBarManageConnected = TopBarConnector(TopBarManage);
