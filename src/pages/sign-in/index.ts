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
          console.log("authorize form submitter");
          console.log("submitter");
          console.log(`login input`);
          console.log(loginInput);

          authController.signin(loginInput);
          /* res => {
              console.log(res);
              authController.setUserInfo().then(
                res => {
                  console.log(res);
                  console.log("siginin form: user data set");
                  // router.go("/messenger");
                },
                rej => {
                  console.error("signin form: failed to set user info");
                  console.error(rej);
                }
              );
            },
            rej => {
              alert(rej);
            }
          ); */
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
