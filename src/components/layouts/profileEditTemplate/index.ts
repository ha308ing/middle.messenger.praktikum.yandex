import Handlebars from "handlebars";
import profileEditTemplateString from "/components/layouts/profileEditTemplate/profileEditTemplate.hbs?raw";
import "/components/layouts/profileEditTemplate/profileEditTemplate.scss";
import "/components/layouts/body";
import "/components/layouts/threadsLayout";
import "/components/elements/topBar";
import "/components/elements/avatar";
import "/components/elements/inputText";
import "/components/elements/button";

Handlebars.registerPartial("profileEdit", profileEditTemplateString);
