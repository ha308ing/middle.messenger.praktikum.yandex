import Component from "@/system/Component";
import threadsLayoutTemplateString from "./threadList.hbs?raw";
import "./threadList.scss";
import TopBar_ from "@/components/elements/topBar";
import { createIconButtonContextVertical } from "@/components/elements/iconButton";
import { createAvatarProfile } from "@/components/elements/avatar";
import Input from "@/components/elements/input";
import { createThreadListItem } from "@/components/elements/threadListItem";
import Button from "@/components/elements/button";

export default class ThreadsLayout extends Component {
  protected _setTemplate(): string {
    return threadsLayoutTemplateString.trim();
  }
}

const IconButtonContext = createIconButtonContextVertical({
  click: () => {
    console.log("context clicked");
  },
});

const TopBar = new TopBar_(
  "nav",
  {
    login: "Username",
    content: [createAvatarProfile(), `<h1>{{login}}</h1>`],
    contextButton: IconButtonContext,
  },
  "topBar"
);

const ThreadListSearchInput = new Input(
  "div",
  {
    type: "search",
    id: "search",
    name: "search",
    placeholder: "Search",
  },
  "threadList_search"
);

const thread1 = createThreadListItem({
  threadTitle: "Thread title 1",
  threadPreview: "Thread Preview 1",
  avatar: createAvatarProfile(),
});
const thread2 = createThreadListItem({
  threadTitle: "Thread title 2",
  threadPreview: "Thread Preview 2",
  avatar: createAvatarProfile(),
});
const thread3 = createThreadListItem({
  threadTitle: "Thread title 3",
  threadPreview: "Thread Preview 3",
  avatar: createAvatarProfile(),
});
const thread4 = createThreadListItem({
  threadTitle: "Thread title 4",
  threadPreview: "Thread Preview 4",
  avatar: createAvatarProfile(),
});
const thread5 = createThreadListItem({
  threadTitle: "Thread title 5",
  threadPreview: "Thread Preview 5",
  avatar: createAvatarProfile(),
});

const ButtonStartThread = new Button("button", { buttonText: "Start a thread" }, "button button_startThread");

export const ThreadList = new ThreadsLayout(
  "div",
  {
    topBar: TopBar,
    search: ThreadListSearchInput,
    threads: [thread1, thread2, thread3, thread4, thread5],
    noThreadsMessage: "<i>you have no threads</i>",
    button: ButtonStartThread,
    // content: "content",
    noContentMessage: "please select a thread",
  },
  "threadsPage_container leftPanelLayout_container"
);

export function createThreadLayout(props: Record<string, unknown>) {
  return new ThreadsLayout(
    "div",
    {
      topBar: new TopBar_(
        "nav",
        {
          login: "Username",
          content: [createAvatarProfile(), `<h1>{{login}}</h1>`],
          contextButton: IconButtonContext,
        },
        "topBar"
      ),
      search: new Input(
        "div",
        {
          type: "search",
          id: "search",
          name: "search",
          placeholder: "Search",
        },
        "threadList_search"
      ),
      threads: [
        createThreadListItem({
          threadTitle: "Thread title 1",
          threadPreview: "Thread Preview 1",
          avatar: createAvatarProfile(),
        }),
        createThreadListItem({
          threadTitle: "Thread title 2",
          threadPreview: "Thread Preview 2",
          avatar: createAvatarProfile(),
          class: props?.threadActive === true ? "threadListItem_active" : "",
        }),
        createThreadListItem({
          threadTitle: "Thread title 3",
          threadPreview: "Thread Preview 3",
          avatar: createAvatarProfile(),
        }),
        createThreadListItem({
          threadTitle: "Thread title 4",
          threadPreview: "Thread Preview 4",
          avatar: createAvatarProfile(),
        }),
        createThreadListItem({
          threadTitle: "Thread title 5",
          threadPreview: "Thread Preview 5",
          avatar: createAvatarProfile(),
        }),
      ],
      noThreadsMessage: "<i>you have no threads</i>",
      button: new Button("button", { buttonText: "Start a thread" }, "button button_startThread"),
      // content: "content",
      noContentMessage: "please select a thread",
      ...props,
    },
    "threadsPage_container leftPanelLayout_container"
  );
}
