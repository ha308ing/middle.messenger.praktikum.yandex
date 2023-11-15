import "./logo.scss";
import logoImage from "./logo.png";
import logoTemplateString from "./logo.hbs?raw";
import Handlebars from "handlebars";

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
