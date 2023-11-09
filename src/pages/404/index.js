import "/components/layouts/errorPage/index.js";
import Handlebars from "handlebars";
import erroPageTemplateString from "/components/layouts/errorPage/errorPage.hbs?raw";

const pageContext = {
  rootClass: "page errorPage errorPage_404 bigLogoLayout",
  errorCode: "404",
  errorMessage: "it is somewhere else",
  buttonText: "Go home",
  onclick: "console.log('errorPage button clicked')",
};

const page = Handlebars.compile(erroPageTemplateString);

document.body.innerHTML = page(pageContext);
