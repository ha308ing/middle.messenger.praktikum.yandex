import template from "./message.hbs?raw";
import "./message.scss";
import { Block } from "@/system/block";
import { MessageAttachment } from "./elements/messageAttachment";

type MessageProps = {
  sender?: string;
  isOutgoing?: boolean;
  attachmentUrls?: string[];
  text?: string | false;
  attachments?: string | false;
  time?: string | false;
};

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps = {}) {
    super("div", {
      class: "message",
      settings: { withInternalId: true },
      ...props,
    });

    if (props.attachmentUrls != null)
      this.lists.attachments = props.attachmentUrls.map(attachmentSrc => new MessageAttachment({ src: attachmentSrc }));
  }

  render() {
    return this.compile(template, { ...this.props, attachments: this.lists.attachments });
  }
}
