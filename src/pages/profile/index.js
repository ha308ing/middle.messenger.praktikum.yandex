import Handlebars from "handlebars";
import profileTemplateString from "/pages/profile/profile.hbs?raw";
import "/pages/profile/profile.scss";
import "/pages/profile/profile.js";
import "/components/layouts/profileEditTemplate/index.js";
import "/components/elements/inputText/index.js";
import avatarSrc from "/assets/sweater.png";

const profileEditContext = {
  rootClass: "page profileEditPage leftPanelLayout",
  avatarSrc,
  login: "<Login>",
  topBarHeading: "My Profile",
  saveButtonClasses: "button_save button_saveProfile hidden",
};

const page = Handlebars.compile(profileTemplateString)(profileEditContext);

document.body.innerHTML = page;
