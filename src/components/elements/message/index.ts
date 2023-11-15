import messageTemplateString from "/components/elements/message/message.hbs?raw";
import "/components/elements/message/message.scss";
import Handlebars from "handlebars";
import "/components/elements/message/components/attachment";

Handlebars.registerPartial("message", messageTemplateString);
