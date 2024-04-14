import "./messageattachment.scss";
import { Block } from "@/system/block";

const attachmentUrl = "/media.png";
const attachmentAlt = "Message attachment";
const attachmentClassName = "attachment attachment__image";

type MessageAttachmentProps = {
  src?: string;
  alt?: string;
  class?: string;
};

const defaultProps = {
  src: attachmentUrl,
  alt: attachmentAlt,
};

export class MessageAttachment extends Block<MessageAttachmentProps> {
  constructor(props: MessageAttachmentProps = defaultProps) {
    super("img", {
      ...props,
      class: attachmentClassName + " " + (props?.class ?? ""),
    });
  }

  render() {
    return this.compile(" ", this.props);
  }
}
