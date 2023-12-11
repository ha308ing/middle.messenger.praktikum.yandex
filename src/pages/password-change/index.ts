import "./passwordChange.scss";
import TwoPanelLayout from "@/components/layouts/twoPanelsLayout";
import { PasswordLayout } from "@/components/layouts/profileLayout";
import RightPanel from "@/components/layouts/rightPanelLayout";

export default class PasswordChangePage extends TwoPanelLayout {
  constructor() {
    super({
      RightPanel: new RightPanel({
        content: new PasswordLayout(),
      }),
    });
  }
}
