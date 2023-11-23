import Component, { type Props } from "@/system/Component";
import threadListItemTemplateString from "./threadListItem.hbs?raw";
import "./threadListItem.scss";

export default class ThreadListItem_ extends Component {
  protected _setTemplate(): string {
    return threadListItemTemplateString.trim();
  }
}

export function createThreadListItem(props: Props = {}) {
  return new ThreadListItem_("li", { ...props }, "threadListItem");
}
