import Button from "@/components/elements/button";
import Form from "@/components/elements/form";
import { InputPassword } from "@/components/elements/input";
import ProfileEditController from "@/controllers/profileEditController";

export default class FormPasswordChange extends Form {
  constructor() {
    super(
      {
        inputs: [
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
        ],
        buttons: [
          new Button(
            {
              buttonText: "Change password",
            },
            "button button_changePassword button_submit"
          ),
        ],
        submitter: passwordChangeInput => {
          const sendPassword = {
            oldPassword: passwordChangeInput.old_password,
            newPassword: passwordChangeInput.new_password,
            repeatPassword: passwordChangeInput.repeat_password,
          };
          ProfileEditController.passwordChange(sendPassword);
        },
      },
      "form_profileEdit"
    );
  }
}
