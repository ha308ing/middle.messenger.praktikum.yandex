import Handlebars from "handlebars";
import "/components/elements/threadListItem/threadListItem.scss";
import threadListItemTemplateString from "/components/elements/threadListItem/threadListItem.hbs?raw";

Handlebars.registerPartial("threadListItem", threadListItemTemplateString);
