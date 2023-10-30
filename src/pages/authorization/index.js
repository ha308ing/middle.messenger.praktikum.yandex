import Handlebars from "handlebars";
import authorizationTemplateString from "/pages/authorization/authorization.hbs?raw";
import "/pages/authorization/authorization.scss";
import "/components/layouts/body/index.js";
import "/components/elements/logo/index.js";
import "/components/elements/inputText/index.js";
import "/components/elements/button/index.js";

const authorizationPageContext = {
  rootClass: "page authorizationPage bigLogoLayout",
};

document.body.innerHTML = Handlebars.compile(authorizationTemplateString)(
  authorizationPageContext
);
