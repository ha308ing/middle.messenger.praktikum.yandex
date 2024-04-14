import "./passwordChange.scss";
import { TwoPanelLayout } from "@/components/layouts/twoPanelsLayout";
import { PasswordLayout } from "@/components/layouts/profileLayout";
import { RightPanel } from "@/components/layouts/rightPanelLayout";

class PasswordChangeRightPanel extends RightPanel {
  constructor() {
    super();

    this.lists.content = [new PasswordLayout()];
  }
}

export class PasswordChangePage extends TwoPanelLayout {
  constructor() {
    super();

    this.children.RightPanel = new PasswordChangeRightPanel();
  }
}
