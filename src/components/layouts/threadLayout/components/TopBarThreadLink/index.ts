import Component from "@/system/component";
import router from "@/system/router";
import connect from "@/system/storeConnector";
import store from "@/system/store";
import { type Indexed } from "@/types/types";
import { type Thread } from "@/types/types.api";

type TopBarThreadLinkProps = { avatar?: string; title?: string; click?: (...args: any[]) => any };

export class TopBarThreadLink extends Component {
  constructor(props?: TopBarThreadLinkProps) {
    super(
      "div",
      {
        ...props,
      },
      "topBar__titleLink"
    );
  }

  protected _setTemplate(): string | null {
    return `

    <img src="{{avatar}}" alt="{{title}}" class="avatar avatar_thread">
    <h1>{{title}}</h1>
    `;
  }
}

export class TopBarMessengerLink extends TopBarThreadLink {
  constructor(props: Indexed) {
    super({
      ...props,
      click: () => {
        router.go("/thread-manage");
      },
    });
  }
}

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

const topBarMapper = connect<typeof TopBarThreadLink, TopBarThreadLinkProps>(state => {
  const activeThreadId = state.activeThread;
  if (activeThreadId == null) return {};
  if (store?.get("threads") == null) return {};
  const threadData = state.threads.find((x: Thread) => x.id === activeThreadId);
  const avatar = state.threads_[activeThreadId].avatar;
  return { ...threadData, avatar };
});

export const TopBarManageLinkConnected = topBarMapper(TopBarManageLink);
export const TopBarMessengerLinkConnected = topBarMapper(TopBarMessengerLink);
