import Component from "@/system/component";
import messageTemplateString from "./message.hbs?raw";
import "./message.scss";
import type MessageAttachment from "./components/attachment";
import { type Indexed } from "@/types/types";

type MessageProps = {
  sender?: string;
  isOutgoing?: boolean;
  attachments?: MessageAttachment[];
};

export default class Message extends Component<MessageProps> {
  constructor(props?: Indexed) {
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
