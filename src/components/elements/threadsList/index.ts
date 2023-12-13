import Component from "@/system/component";
import store, { StoreEvents } from "@/system/store";
import connect from "@/system/storeConnector";
import "./threadsList.scss";
import { type Thread } from "@/types/types.api";
import router from "@/system/router";
import { type Indexed } from "@/types/types";

store.on(StoreEvents.clickThread, id => {
  store.set("activeThread", id);
  router.go("/messenger");

  const view = document.querySelector(".messages_container");
  if (view != null) view.scrollTo(0, view.scrollHeight);
});

export class ThreadsList_ extends Component {
  constructor(props?: Indexed) {
    super(
      "div",
      {
        ...props,
      },
      "threadsListContainer"
    );
  }

  protected _setTemplate() {
    return `
    {{#if threads}}
    <ul class="threadList">
      {{{threads}}}
    </ul>
    {{else}}
      <pre>no threads</pre>
    {{/if}}

`;
  }
}

export class ThreadListItem extends Component {
  constructor(props?: Indexed) {
    super(
      "li",
      {
        ...props,
        "data-threadId": props?.id,
        click: () => {
          store.emit(store.events.clickThread, props?.id);
          // router.go("/messenger");
        },
      },
      "threadListItem"
    );
  }

  protected _setTemplate(): string | null {
    return `
    <img class="avatar avatar_thread" src="{{avatar}}" alt={{title}}>

  <div class="threadListItem_preview">
    <div class="threadListItem_preview_title">{{title}}</div>
  </div>
  `;
  }
}

export const ThreadsListConnected = connect<typeof ThreadsList_>(state => {
  const { activeThread, threads } = state;

  const threadItems =
    threads == null
      ? false
      : threads.map((t: Thread) => {
          const { last_message } = t;
          let lastMessage = {};
          if (last_message != null) {
            const { user: last_messageUser, time: last_messageTime, content: last_messageContent } = last_message;
            const { login: last_messageUserLogin } = last_messageUser;
            lastMessage = { last_messageUser, last_messageUserLogin, last_messageTime, last_messageContent };
          }

          const active = t.id === activeThread ? { "data-threadActive": true } : {};
          return new ThreadListItem({
            ...t,
            avatar: state?.threads_?.[t.id]?.avatar ?? t.avatar,
            "data-threadId": t.id,
            ...active,
            ...lastMessage,
          });
        });

  return { threads: threadItems };
})(ThreadsList_);

export default ThreadsListConnected;
