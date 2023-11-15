import Handlebars from "handlebars";
import sendBarTemplateString from "/components/elements/sendBar/sendBar.hbs?raw";
import "/components/elements/sendBar/sendBar.scss";
import "/components/elements/iconButton";
import "/components/elements/inputText";

Handlebars.registerPartial("sendBar", sendBarTemplateString);
