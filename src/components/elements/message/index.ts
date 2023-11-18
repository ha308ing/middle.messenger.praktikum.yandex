import Component from "@/system/Component";
import messageTemplateString from "./message.hbs?raw";
import "./message.scss";
import "./components/attachment";

export default class Message_ extends Component {
  protected _setTemplate(): string {
    return messageTemplateString.trim();
  }
}

export function createMessage(props: Record<string, unknown> = {}) {
  return new Message_(
    "div",
    {
      text: "Hello",
      time: "17:16",
      ...props,
    },
    "message"
  );
}
