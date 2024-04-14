import router from "@/system/router";
import { TopBarThreadLinkConnector } from "./topBarThreadLinkConnector";
import type { Indexed } from "@/types/types";
import { TopBarThreadLink } from "./topBarThreadLink";

class TopBarManageLink extends TopBarThreadLink {
  constructor(props: Indexed) {
    super({
      ...props,
      click: () => {
        router.go("/messenger");
      },
    });
  }
}

export const TopBarManageLinkConnected = TopBarThreadLinkConnector(TopBarManageLink);
