import Handlebars from "handlebars";
import "@/components/layouts/errorPage";
import errorPageTemplateString from "@/components/layouts/errorPage/errorPage.hbs?raw";

const pageContext = {
  rootClass: "page errorPage errorPage_5xx bigLogoLayout",
  errorCode: "5xx",
  errorMessage: "something went wrong",
  buttonText: "Go home",
  onclick: "console.log('errorPage button clicked')",
};

const page = Handlebars.compile(errorPageTemplateString);

document.body.innerHTML = page(pageContext);
