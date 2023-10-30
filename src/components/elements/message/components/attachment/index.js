import Handlebars from "handlebars";
import "/components/elements/message/components/attachment/attachment.scss";
import attachmentTemplateString from "/components/elements/message/components/attachment/attachment.hbs?raw";

Handlebars.registerPartial("attachment", attachmentTemplateString);
