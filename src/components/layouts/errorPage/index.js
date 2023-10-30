import Handlebars from "handlebars";
import errorPageTemplateString from "./errorPage.hbs?raw";
import "./errorPage.scss";
import "/components/layouts/body/index.js";
import "/components/elements/logo/index.js";
import "/components/elements/button/index.js";

Handlebars.registerPartial("errorPage", errorPageTemplateString);
