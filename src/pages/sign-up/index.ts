import "./sign-up.scss";
import Form from "@/components/elements/form";
import {
  InputLogin,
  InputEmail,
  InputFirstName,
  InputPassword,
  InputPhone,
  InputSecondName,
} from "@/components/elements/input";
import { ButtonSubmitRegistration, ButtonCancelRegistration } from "@/components/elements/button";
import BigLogoLayout from "@/components/layouts/bigLogoLayout";
import RegistrationController from "@/controllers/registrationController";
import authController from "@/controllers/authController";
import router from "@/system/router";

export class FormRegistration extends Form {
  constructor() {
    super(
      {
        inputs: [
          new InputLogin(),
          new InputEmail(),
          new InputPhone(),
          new InputFirstName(),
          new InputSecondName(),
          new InputPassword(),
        ],
        buttons: [new ButtonSubmitRegistration(), new ButtonCancelRegistration()],
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
      },
      "form form_registration registration_inputs"
    );
  }
}

export default class RegistrationPage extends BigLogoLayout {
  constructor() {
    super({
      content: [`<h1 class="heading">Sign Up</h1>`, new FormRegistration()],
    });
  }
}
