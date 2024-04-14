import "./settings.scss";
import { TwoPanelLayout } from "@/components/layouts/twoPanelsLayout";
import { RightPanel } from "@/components/layouts/rightPanelLayout";
import { UserLayout } from "@/components/layouts/profileLayout";

class SettingsRightPanel extends RightPanel {
  constructor() {
    super();

    this.lists.content = [new UserLayout()];
  }
}

export class SettingsPage extends TwoPanelLayout {
  constructor() {
    super();

    this.children.RightPanel = new SettingsRightPanel();

    // UserInfoController.isLogged();
  }
}
