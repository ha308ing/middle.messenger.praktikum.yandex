import "./threadManage.scss";
import TwoPanelLayout from "@/components/layouts/twoPanelsLayout";
// import { ThreadManage } from "@/components/layouts/threadLayout";
import RightPanel from "@/components/layouts/rightPanelLayout";
import ThreadManageLayout from "@/components/layouts/threadLayout/components/ThreadManage";
// import TopBarThreadConnected from "@/components/layouts/threadLayout/components/TopBarThread";
// import Component from "@/system/component";
import { TopBarManageConnected } from "@/components/layouts/threadLayout/components/TopBarThread";

export default class ThreadManagePage extends TwoPanelLayout {
  constructor() {
    super({
      RightPanel: new RightPanel({
        content: [new TopBarManageConnected(), new ThreadManageLayout({})],
      }),
    });
  }
}

// export default class ThreadActivePage extends TwoPanelLayout {
//   constructor() {
//     super({
//       RightPanel: new RightPanel({
//         content: [new TopBarThread(), new ThreadMessagesConnected(), new SendMessageFormConnected()],
//       }),
//     });
//   }
// }
