import Component, { type Props } from "@/system/Component";
import attachmentImage from "@/assets/media.png";
import "./attachment.scss";

export default class MessageAttachment extends Component {
  protected _setTemplate(): string {
    return " ";
  }
}

export function createMessageAttachment(props: Props = {}) {
  return new MessageAttachment("img", { src: attachmentImage, ...props }, "attachment attachment__image");
}
