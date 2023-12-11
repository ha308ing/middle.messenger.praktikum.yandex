import "./logo.scss";
import logoImage from "./logo.png";
import logoTemplateString from "./logo.hbs?raw";
import Component from "@/system/component";

type LogoProps = {
  src: string;
  alt: string;
  logoText: string;
  class: string;
};

export default class Logo extends Component<LogoProps> {
  constructor(props = {}) {
    super("div", { src: logoImage, alt: "Sweater Messenger", logoText: "Sweater", class: "logo", ...props });
  }

  protected _setTemplate(): string {
    return logoTemplateString.trim();
  }
}
