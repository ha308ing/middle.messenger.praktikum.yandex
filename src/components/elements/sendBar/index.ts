import Component from "@/system/Component";
import sendBarTemplateString from "./sendBar.hbs?raw";
import "./sendBar.scss";

export default class SendBar_ extends Component {
  protected _setTemplate(): string {
    return sendBarTemplateString.trim();
  }
}
