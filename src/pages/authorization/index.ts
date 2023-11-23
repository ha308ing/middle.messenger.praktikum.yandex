import Component from "@/system/Component";
import authorizationPageTemplateString from "./authorization.hbs?raw";
import "./authorization.scss";
import DefaultLogo from "@/components/elements/logo";
import { createForm } from "@/components/elements/form";
import { createInputLogin, createInputPassword } from "@/components/elements/input";
import Button from "@/components/elements/button";

export default class AuthorizationPage_ extends Component {
  protected _setTemplate(): string {
    return authorizationPageTemplateString.trim();
  }
}

export const LogoAuthorization = new DefaultLogo();
export const InputLogin = createInputLogin();
export const InputPassword = createInputPassword();

const ButtonSignin = new Button("button", {
  class: "button button_signin button_submit",
  buttonText: "Sign In",
  type: "submit",
  disabled: true,
});

const ButtonSignup = new Button("button", {
  class: "button button_signup",
  buttonText: "Sign Up",
});

const AuthorizationForm = createForm(
  {
    inputs: [InputLogin, InputPassword],
    buttons: [ButtonSignin, ButtonSignup],
  },
  "form form_authorization"
);

export const AuthorizationPage = new AuthorizationPage_(
  "main",
  {
    logo: LogoAuthorization,
    form: AuthorizationForm,
  },
  "page authorizationPage bigLogoLayout"
);

export const AuthorizationPageContent = AuthorizationPage.content;
