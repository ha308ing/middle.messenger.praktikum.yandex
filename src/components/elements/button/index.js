import buttonTemplateString from "./button.hbs?raw";
import Handlebars from "handlebars";
import "./button.scss";

const buttonSigninContext = Handlebars.compile(buttonTemplateString)({
  buttonClass: "button_signin",
  buttonText: "Sign In",
});

const buttonSignupContext = Handlebars.compile(buttonTemplateString)({
  buttonClass: "button_signup",
  buttonText: "Sign Up",
});

Handlebars.registerPartial("buttonSignin", buttonSigninContext);
Handlebars.registerPartial("buttonSignup", buttonSignupContext);
Handlebars.registerPartial("button", buttonTemplateString);
