import Handlebars from "handlebars";
import threadsLayoutTemplateString from "/components/layouts/threadsLayout/threadsLayout.hbs?raw";
import "/components/layouts/threadsLayout/threadsLayout.scss";

Handlebars.registerPartial("threadsLayout", threadsLayoutTemplateString);
