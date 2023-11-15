import Handlebars from "handlebars";
import errorPageTemplateString from "./errorPage.hbs?raw";
import "./errorPage.scss";
import "/components/layouts/body";
import "/components/elements/logo";
import "/components/elements/button";

Handlebars.registerPartial("errorPage", errorPageTemplateString);
