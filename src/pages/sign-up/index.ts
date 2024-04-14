import "./sign-up.scss";
import { Form } from "@/components/elements/form";
import {
  InputLogin,
  InputEmail,
  InputFirstName,
  InputPassword,
  InputPhone,
  InputSecondName,
} from "@/components/elements/input";
import { ButtonSubmitRegistration, ButtonCancelRegistration } from "@/components/elements/button";
import { BigLogoLayout } from "@/components/layouts/bigLogoLayout";
import RegistrationController from "@/controllers/registrationController";
import authController from "@/controllers/authController";
import router from "@/system/router";

class FormSignup extends Form {
  constructor() {
    super({
      class: "form form_registration registration_inputs",
      submitter: registrationInput => {
        RegistrationController.register(registrationInput).then(
          () => {
            authController.setUserInfo().then(
              res => {
                console.log(res);
                console.log("signup form: user data set");
                router.go("/messenger");
              },
              rej => {
                console.error("signup form: failed to set user info");
                console.error(rej);
              }
            );
          },
          rej => {
            console.log(rej.message);
            alert(`Registration Failed: ${rej.message}`);
          }
        );
      },
    });

    this.lists.inputs = [
      new InputLogin(),
      new InputEmail(),
      new InputPhone(),
      new InputFirstName(),
      new InputSecondName(),
      new InputPassword(),
    ];
    this.lists.buttons = [new ButtonSubmitRegistration(), new ButtonCancelRegistration()];
  }
}

export class SignupPage extends BigLogoLayout {
  constructor() {
    super();

    this.lists.content = [`<h1 class="heading">Sign Up</h1>`, new FormSignup()];
  }
}
