import Component from "@/system/Component";
import topBarTemplateString from "./topBar.hbs?raw";
import "./topBar.scss";

export default class TopBar_ extends Component {
  protected _setTemplate(): string {
    return topBarTemplateString.trim();
  }
}
