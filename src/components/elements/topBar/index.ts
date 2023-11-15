import Handlebars from "handlebars";
import "/components/elements/topBar/topBar.scss";
import topBarTemplateString from "/components/elements/topBar/topBar.hbs?raw";
import "/components/elements/iconButton";

Handlebars.registerPartial("topBar", topBarTemplateString);
