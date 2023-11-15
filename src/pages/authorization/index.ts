import Handlebars from "handlebars";
import authorizationTemplateString from "/pages/authorization/authorization.hbs?raw";
import "/pages/authorization/authorization.scss";
import "/components/layouts/body";
import "/components/elements/logo";
import "/components/elements/inputText";
import "/components/elements/button";

const authorizationPageContext = {
  rootClass: "page authorizationPage bigLogoLayout",
};

document.body.innerHTML = Handlebars.compile(authorizationTemplateString)(authorizationPageContext);
