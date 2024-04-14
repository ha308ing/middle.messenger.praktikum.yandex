import { Block } from "@/system/block";
import type { Message as MessageType } from "@/types/types.api";
import { Message } from "@/components/elements/message";

type ThreadMessagesProps = {
  messages: MessageType[];
  hide: boolean;
  emptyThread: boolean;
};

export class ThreadMessages extends Block {
  constructor(props?: ThreadMessagesProps) {
    super("section", {
      ...props,
      class: "messages_container",
    });

    this.lists.Messages =
      props?.messages != null
        ? props?.messages.map(m => {
            return new Message(m);
          })
        : [];
  }

  componentDidUpdate() {
    if (this.props?.messages == null) return true;
    this.lists.Messages = this.props.messages.map((m: MessageType) => {
      return new Message(m);
    });
    return true;
  }

  render() {
    const template = `
    {{#if hide}}

      <div class="messages">
        <h2 class="emptyThreadMessage">please select a thread</h2>
      </div>

    {{else}}

      <div class="messages">
        {{#if emptyThread}}
          <h2 class="emptyThreadMessage">no messages</h2>
        {{else}}
          {{{Messages}}}
        {{/if}}
      </div>

    {{/if}}
    `;
    return this.compile(template, {
      ...this.props,
      Messages: this.lists.Messages,
    });
  }
}
