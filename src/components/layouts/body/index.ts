import "./body.scss";
import bodyTemplateString from "./body.hbs?raw";
import Handlebars from "handlebars";

Handlebars.registerPartial("body", bodyTemplateString);
