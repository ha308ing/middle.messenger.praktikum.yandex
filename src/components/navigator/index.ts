import Component from "@/system/Component";
import navigatorTemplateString from "./navigator.hbs?raw";
import "./navigator.scss";

export default class Navigator_ extends Component {
  protected _setTemplate(): string {
    return navigatorTemplateString.trim();
  }
}
