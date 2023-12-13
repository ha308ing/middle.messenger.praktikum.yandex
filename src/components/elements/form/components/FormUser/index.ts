import Form from "@/components/elements/form";
import { InputUserLogin } from "../InputUserLogin";
import Button from "@/components/elements/button";
import ProfileEditController from "@/controllers/profileEditController";
import { InputUserPhone } from "../InputUserPhone";
import { InputUserEmail } from "../InputUserEmail";
import { InputUserFirstName } from "../InputUserFirstName";
import InputUserAvatar from "../InputUserAvatar";
import { InputUserDisplayName } from "../InputUserDisplayName";
import { InputUserSecondName } from "../InputUserSecondName";
import EventBus from "@/system/eventBus";
import "./FormUser.scss";
import type Input from "@/components/elements/input";

class ButtonSave extends Button {
  constructor(props?: Record<string, any>) {
    super({ buttonText: "Save", type: "submit", ...props }, "button button_save button_saveProfile button_submit");
  }
}

type FormUserProps = {
  inputs: Input[];
  buttons: Button[];
};

export default class FormUser extends Form {
  constructor(props?: FormUserProps) {
    super(
      {
        inputs: props?.inputs ?? [
          new InputUserLogin({ readonly: false }),
          new InputUserEmail({ readonly: false }),
          new InputUserPhone({ readonly: false }),
          new InputUserFirstName({ readonly: false }),
          new InputUserSecondName({ readonly: false }),
          new InputUserDisplayName({ readonly: false }),
          new InputUserAvatar(),
        ],
        buttons: [new ButtonSave()],
        submitter: profileEditInput => {
          ProfileEditController.sendForm(profileEditInput);
        },
      },
      "form_profileEdit"
    );
  }
}
