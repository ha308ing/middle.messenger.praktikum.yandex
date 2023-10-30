import Handlebars from "handlebars";
import registrationTemplateString from "/pages/registration/registration.hbs?raw";
import "/pages/registration/registration.scss";
import "/pages/registration/registration.js";
import "/components/layouts/body/index.js";
import "/components/elements/logo/index.js";
import "/components/elements/inputText/index.js";
import "/components/elements/button/index.js";

document.body.innerHTML = Handlebars.compile(registrationTemplateString)({
  rootClass: "page registrationPage bigLogoLayout",
});
