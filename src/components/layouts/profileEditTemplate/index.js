import Handlebars from "handlebars";
import profileEditTemplateString from "/components/layouts/profileEditTemplate/profileEditTemplate.hbs?raw";
import "/components/layouts/profileEditTemplate/profileEditTemplate.scss";
import "/components/layouts/body/index.js";
import "/components/layouts/threadsLayout/index.js";
import "/components/elements/topBar/index.js";
import "/components/elements/avatar/index.js";
import "/components/elements/inputText/index.js";
import "/components/elements/button/index.js";

Handlebars.registerPartial("profileEdit", profileEditTemplateString);
