import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/form";
import ProfileEditController from "@/controllers/profileEditController";
import { InputPassword } from "@/components/elements/input";

export class FormPassword extends Form {
  constructor() {
    super({
      submitter: passwordChangeInput => {
        const sendPassword = {
          oldPassword: passwordChangeInput.old_password,
          newPassword: passwordChangeInput.new_password,
          repeatPassword: passwordChangeInput.repeat_password,
        };
        ProfileEditController.passwordChange(sendPassword);
      },
      class: "form form_profileEdit",
    });

    this.lists.inputs = [
      new InputPassword({
        label: "Current password",
        placeholder: "Current password",
        name: "old_password",
        class: "input_oldPassword",
      }),
      new InputPassword({
        label: "New password",
        placeholder: "New password",
        name: "new_password",
        class: "input_newPassword",
      }),
      new InputPassword({
        label: "Repeat password",
        placeholder: "Repeat password",
        name: "repeat_password",
        class: "input_repeatPassword",
      }),
    ];

    this.lists.buttons = [
      new Button({
        buttonText: "Change password",
        class: "button button_changePassword button_submit",
      }),
    ];
  }
}
