import Handlebars from "handlebars";
import passwordChangeTemplateString from "/pages/passwordChange/passwordChange.hbs?raw";
import "/components/layouts/profileEditTemplate/index.js";
import "/components/elements/inputText/index.js";
import avatarSrc from "/assets/sweater.png";

const passwordChangeContext = {
  rootClass: "page passwordChangePage leftPanelLayout",
  avatarSrc,
  login: "<Login>",
  topBarHeading: "Password change",
  saveButtonClasses: "button_save button_savePassword",
};

const page = Handlebars.compile(passwordChangeTemplateString)(
  passwordChangeContext
);
document.body.innerHTML = page;
