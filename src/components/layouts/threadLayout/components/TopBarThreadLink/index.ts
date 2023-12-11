import Component from "@/system/component";
import router from "@/system/router";
import connect from "@/system/storeConnector";
import store from "@/system/store";

type TopBarThreadLinkProps = { avatar?: string; title?: string; click?: (...args: any[]) => any };

class TopBarThreadLink extends Component {
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

class TopBarMessengerLink extends TopBarThreadLink {
  constructor(props: Record<string, any>) {
    super({
      ...props,
      click: () => {
        router.go("/thread-manage");
      },
    });
  }
}

class TopBarManageLink extends TopBarThreadLink {
  constructor(props: Record<string, any>) {
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
  const threadData = store.get("threads").find((x: { id: number }) => x.id === activeThreadId);
  return { ...threadData };
});

export const TopBarManageLinkConnected = topBarMapper(TopBarManageLink);
export const TopBarMessengerLinkConnected = topBarMapper(TopBarMessengerLink);
