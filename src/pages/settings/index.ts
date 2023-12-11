import "./settings.scss";
import TwoPanelLayout from "@/components/layouts/twoPanelsLayout";
import RightPanel from "@/components/layouts/rightPanelLayout";
import { UserLayout } from "@/components/layouts/profileLayout";

export default class ProfilePage extends TwoPanelLayout {
  constructor() {
    super({
      RightPanel: new RightPanel({ content: new UserLayout() }),
    });

    // UserInfoController.isLogged();
  }
}
