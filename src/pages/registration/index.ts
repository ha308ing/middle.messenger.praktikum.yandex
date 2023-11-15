import Handlebars from "handlebars";
import registrationTemplateString from "/pages/registration/registration.hbs?raw";
import "/pages/registration/registration.scss";
import "/pages/registration/registration.ts";
import "/components/layouts/body";
import "/components/elements/logo";
import "/components/elements/inputText";
import "/components/elements/button";

document.body.innerHTML = Handlebars.compile(registrationTemplateString)({
  rootClass: "page registrationPage bigLogoLayout",
});
