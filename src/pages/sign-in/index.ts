import "./sign-in.scss";
import Form from "@/components/elements/form";
import { InputLogin, InputPassword } from "@/components/elements/input";
import Button from "@/components/elements/button";
import router from "@/system/router";
import BigLogoLayout from "@/components/layouts/bigLogoLayout";
import authController from "@/controllers/authController";

class ButtonSignin extends Button {
  constructor() {
    super({
      class: "button button_signin button_submit",
      buttonText: "Sign In",
      type: "submit",
      disabled: true,
    });
  }
}

class ButtonSignup extends Button {
  constructor() {
    super({
      class: "button button_signup",
      buttonText: "Sign Up",
      click: () => {
        router.go("/sign-up");
      },
    });
  }
}

class SigninForm extends Form {
  constructor() {
    super(
      {
        inputs: [new InputLogin(), new InputPassword()],
        buttons: [new ButtonSignin(), new ButtonSignup()],
        submitter: loginInput => {
          authController.signin(loginInput);
        },
      },
      "form form_authorization"
    );
  }
}

export default class SigninPage extends BigLogoLayout {
  constructor() {
    super({
      content: [`<h1 class="heading">Sign In</h1>`, new SigninForm()],
    });
  }
}
