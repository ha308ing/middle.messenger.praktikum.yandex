import Component from "@/system/component";
import attachmentImage from "@/assets/media.png";
import "./attachment.scss";

type MessageAttachmentProps = {
  src: string;
  alt: string;
};

export default class MessageAttachment extends Component<MessageAttachmentProps> {
  constructor(props = {}) {
    super("img", { src: attachmentImage, alt: "Message attachment", ...props }, "attachment attachment__image");
  }

  protected _setTemplate(): string {
    return " ";
  }
}
