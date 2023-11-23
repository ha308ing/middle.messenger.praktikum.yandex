import "./logo.scss";
import logoImage from "./logo.png";
import logoTemplateString from "./logo.hbs?raw";
import Handlebars from "handlebars";
import Component from "@/system/Component";

export default class DefaultLogo extends Component {
  constructor(tag = "div", props = {}) {
    super(tag, { src: logoImage, alt: "Sweater Messenger", logoText: "Sweater", class: "logo", ...props });
  }

  protected _setTemplate(): string {
    return logoTemplateString.trim();
  }
}

const logoContext = {
  logoImage: {
    src: logoImage,
    alt: "",
  },
  logoText: "Sweater",
};

const logoTemplateSpec = Handlebars.compile(logoTemplateString);
const logo = logoTemplateSpec(logoContext);
Handlebars.registerPartial("logo", logo);
