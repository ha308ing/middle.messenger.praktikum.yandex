import Component from "@/system/Component";
import registrationPageTemplateString from "./registration.hbs?raw";
import "./registration.scss";
import DefaultLogo from "@/components/elements/logo";
import { createForm } from "@/components/elements/form";
import {
  createInputLogin,
  createInputEmail,
  createInputPhone,
  createInputFirstName,
  createInputSecondName,
  createInputPassword,
} from "@/components/elements/input";
import { ButtonSubmitRegistration, ButtonCancelRegistration } from "@/components/elements/button";

export default class RegistrationPage_ extends Component {
  protected _setTemplate(): string {
    return registrationPageTemplateString.trim();
  }
}

export const LogoRegistation = new DefaultLogo();

const InputLogin = createInputLogin();
const InputEmail = createInputEmail();
const InputPhone = createInputPhone();
const InputFirstName = createInputFirstName();
const InputSecondName = createInputSecondName();
const InputPassword = createInputPassword();

const FormRegistration = createForm(
  {
    inputs: [InputLogin, InputEmail, InputPhone, InputFirstName, InputSecondName, InputPassword],
    buttons: [ButtonSubmitRegistration, ButtonCancelRegistration],
  },
  "form form_registration registration_inputs"
);

export const RegistrationPage = new RegistrationPage_(
  "main",
  {
    logo: LogoRegistation,
    form: FormRegistration,
  },
  "page registrationPage bigLogoLayout"
);

export const RegistrationPageContent = RegistrationPage.content;
