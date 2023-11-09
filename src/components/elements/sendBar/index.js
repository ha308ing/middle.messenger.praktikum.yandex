import Handlebars from "handlebars";
import sendBarTemplateString from "/components/elements/sendBar/sendBar.hbs?raw";
import "/components/elements/sendBar/sendBar.scss";
import "/components/elements/iconButton/index.js";
import "/components/elements/inputText/index.js";

Handlebars.registerPartial("sendBar", sendBarTemplateString);
