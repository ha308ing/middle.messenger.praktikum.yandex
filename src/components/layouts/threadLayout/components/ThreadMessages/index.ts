import Component from "@/system/component";
import Message from "@/components/elements/message";
import connect from "@/system/storeConnector";
import store from "@/system/store";

export class ThreadMessages extends Component {
  constructor(props?: Record<string, any>) {
    super(
      "section",
      {
        ...props,
      },
      "messages_container"
    );
  }

  protected _setTemplate(): string | null {
    return `
    {{#if hide}}

      <div class="messages">
        <h2 class="emptyThreadMessage">please select a thread</h2>
      </div>

    {{else}}

      <div class="messages">
        {{#if emptyThread}}
          <h2 class="emptyThreadMessage">no messages</h2>
        {{else}}
          {{{messages}}}
        {{/if}}
      </div>

    {{/if}}
    `;
  }
}

const ThreadMessagesConnected = connect<typeof ThreadMessages>(state => {
  const { activeThread } = state;
  if (activeThread == null) return { hide: true };
  const messages = state?.messages[activeThread];
  if (messages == null) return { messages: [], hide: false, class: "", activeThread, emptyThread: true };
  if (!Array.isArray(messages)) return { messages: [], hide: false, class: "", activeThread, emptyThread: true };
  if (messages.length === 0) return { messages: [], hide: false, class: "", activeThread, emptyThread: true };
  const items = messages
    .reduce((acc: Array<Record<string, any>>, m: Record<string, any>) => {
      if (m.type === "message") {
        const date = new Date(m.time);
        const time = date.toLocaleTimeString();
        const day = date.toLocaleDateString();
        const m_ = new Message({
          sender: m.user_id,
          isOutgoing: m.user_id === store.get("user").id,
          text: m.content,
          attachments: false,
          time: `${time} - ${day}`,
        });
        acc = [...acc, m_];
      }
      return acc;
    }, [])
    .filter((x: string | boolean) => x !== false);

  return { messages: items, hide: false, class: "", activeThread, emptyThread: false };
})(ThreadMessages);

export default ThreadMessagesConnected;
