import "./messenger.scss";
import TwoPanelLayout from "@/components/layouts/twoPanelsLayout";
import RightPanel from "@/components/layouts/rightPanelLayout";
import ThreadMessagesConnected from "@/components/layouts/threadLayout/components/ThreadMessages";
import SendMessageFormConnected from "@/components/layouts/threadLayout/components/SendBar";
import { TopBarMessengerConnected } from "@/components/layouts/threadLayout/components/TopBarThread";

export default class MessengerPage extends TwoPanelLayout {
  constructor() {
    super({
      RightPanel: new RightPanel({
        content: [new TopBarMessengerConnected(), new ThreadMessagesConnected(), new SendMessageFormConnected()],
      }),
    });
  }
}
