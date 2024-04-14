import router from "@/system/router";
import type { Indexed } from "@/types/types";
import { TopBarThreadLink } from "./topBarThreadLink";
import { TopBarThreadLinkConnector } from "./topBarThreadLinkConnector";

class TopBarMessengerLink extends TopBarThreadLink {
  constructor(props: Indexed) {
    super({
      ...props,
      click: () => {
        router.go("/thread-manage");
      },
    });
  }
}

export const TopBarMessengerLinkConnected = TopBarThreadLinkConnector(TopBarMessengerLink);
