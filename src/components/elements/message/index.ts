import Component from "@/system/component";
import messageTemplateString from "./message.hbs?raw";
import "./message.scss";
import type MessageAttachment from "./components/attachment";

type MessageProps = {
  sender?: string;
  isOutgoing?: boolean;
  attachments?: MessageAttachment[];
};

export default class Message extends Component<MessageProps> {
  constructor(props?: Record<string, any>) {
    super(
      "div",
      {
        ...props,
      },
      "message"
    );
  }

  protected _setTemplate(): string {
    return messageTemplateString.trim();
  }
}
