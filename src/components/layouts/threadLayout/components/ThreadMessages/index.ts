import Component from "@/system/component";
import Message from "@/components/elements/message";
import connect from "@/system/storeConnector";
import store from "@/system/store";
import { type WSMessage, type User } from "@/types/types.api";
import { type Indexed } from "@/types/types";

export class ThreadMessages extends Component {
  constructor(props?: Indexed) {
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
  const messages = state?.messages?.[activeThread] ?? [];
  if (messages.length === 0) return { messages: [], hide: false, class: "", activeThread, emptyThread: true };
  const items = messages.map((m: WSMessage) => {
    const date = new Date(m.time);
    const time = date.toLocaleTimeString();
    const day = date.toLocaleDateString();
    return new Message({
      sender:
        state?.threads_?.[activeThread]?.users.find((x: User) => x.id === parseInt(m.user_id))?.login ?? m.user_id,
      isOutgoing: m.user_id === store.get("user").id,
      text: m.content,
      attachments: false,
      time: `${time} - ${day}`,
    });
  });

  return { messages: items, hide: false, class: "", activeThread, emptyThread: false };
})(ThreadMessages);

export default ThreadMessagesConnected;
