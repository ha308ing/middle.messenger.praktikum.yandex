import "./threadManage.scss";
import { TwoPanelLayout } from "@/components/layouts/twoPanelsLayout";
import { RightPanel } from "@/components/layouts/rightPanelLayout";
import { TopBarManageConnected, ThreadManageLayout } from "@/components/layouts/threadLayout";

class ThreadManageRightPanel extends RightPanel {
  constructor() {
    super();

    this.lists.content = [new TopBarManageConnected(), new ThreadManageLayout()];
  }
}

export class ThreadManagePage extends TwoPanelLayout {
  constructor() {
    super();

    this.lists.RightPanel = [new ThreadManageRightPanel()];
  }
}
