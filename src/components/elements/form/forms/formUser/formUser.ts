import { Form } from "@/components/elements/form";
import ProfileEditController from "@/controllers/profileEditController";
import "./formUser.scss";
import {
  InputUserLoginConnected,
  InputUserEmailConnected,
  InputUserPhoneConnected,
  InputUserFirstNameConnected,
  InputUserSecondNameConnected,
  InputUserDisplayNameConnected,
  InputAvatar,
} from "../../inputs";
import { ButtonSave } from "./elements/buttonSave";

export class FormUser extends Form {
  constructor() {
    super({
      class: "form form_profileEdit",
      submitter: profileEditInput => {
        ProfileEditController.sendForm(profileEditInput);
      },
    });

    this.lists.inputs = [
      new InputUserLoginConnected({ readonly: false }),
      new InputUserEmailConnected({ readonly: false }),
      new InputUserPhoneConnected({ readonly: false }),
      new InputUserFirstNameConnected({ readonly: false }),
      new InputUserSecondNameConnected({ readonly: false }),
      new InputUserDisplayNameConnected({ readonly: false }),
      new InputAvatar(),
    ];

    this.lists.buttons = [new ButtonSave()];
  }
}
