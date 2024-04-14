import "./sign-in.scss";
import { Form } from "@/components/elements/form";
import { InputLogin, InputPassword } from "@/components/elements/input";
import { Button } from "@/components/elements/button";
import router from "@/system/router";
import { BigLogoLayout } from "@/components/layouts/bigLogoLayout";
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
    super({
      submitter: loginInput => {
        authController.signin(loginInput);
      },
      class: "form form_authorization",
    });

    this.lists.inputs = [new InputLogin(), new InputPassword()];
    this.lists.buttons = [new ButtonSignin(), new ButtonSignup()];
  }
}

export class SigninPage extends BigLogoLayout {
  constructor() {
    super();
    this.lists.content = [`<h1 class="heading">Sign In</h1>`, new SigninForm()];
  }
}
