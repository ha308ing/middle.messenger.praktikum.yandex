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
import type Input from "@/components/elements/input";

class EditModeBus_ extends EventBus {
  static _instance: EditModeBus_;
  public enable = true;

  constructor() {
    super();
    if (EditModeBus_._instance != null) {
      return EditModeBus_._instance;
    }

    EditModeBus_._instance = this;
  }
}
export const EditModeBus = new EditModeBus_();

export enum EditModeBusEvents {
  toggleEditMode = "toggleEditMode",
}

EditModeBus.on(EditModeBusEvents.toggleEditMode, () => {
  EditModeBus.enable = !EditModeBus.enable;
});

class ButtonSave extends Button {
  constructor(props?: Record<string, any>) {
    super({ buttonText: "Save", type: "submit", ...props }, "button button_save button_saveProfile button_submit");

    EditModeBus.on(EditModeBusEvents.toggleEditMode, () => {
      const style = EditModeBus.enable ? "display:none" : "";
      this.setProps({ style });
    });
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
          new InputUserLogin({ readonly: true }),
          new InputUserEmail({ readonly: true }),
          new InputUserPhone({ readonly: true }),
          new InputUserFirstName({ readonly: true }),
          new InputUserSecondName({ readonly: true }),
          new InputUserDisplayName({ readonly: true }),
          new InputUserAvatar({ style: "display:none" }),
        ],
        buttons: [new ButtonSave({ style: "display:none" })],
        submitter: profileEditInput => {
          ProfileEditController.sendForm(profileEditInput);
          EditModeBus.emit(EditModeBusEvents.toggleEditMode);
        },
      },
      "form_profileEdit"
    );

    EditModeBus.on(EditModeBusEvents.toggleEditMode, () => {
      // const style = EditModeBus.enable ? "display:none": ""
      if (EditModeBus.enable) {
        this.setProps({
          buttons: [new ButtonSave({ style: "display:none" })],
          inputs: [
            new InputUserLogin({ readonly: true }),
            new InputUserEmail({ readonly: true }),
            new InputUserPhone({ readonly: true }),
            new InputUserFirstName({ readonly: true }),
            new InputUserSecondName({ readonly: true }),
            new InputUserDisplayName({ readonly: true }),
            new InputUserAvatar({ style: "display:none" }),
          ],
        });
      } else {
        this.setProps({
          buttons: [new ButtonSave({ style: "" })],
          inputs: [
            new InputUserLogin({ readonly: false }),
            new InputUserEmail({ readonly: false }),
            new InputUserPhone({ readonly: false }),
            new InputUserFirstName({ readonly: false }),
            new InputUserSecondName({ readonly: false }),
            new InputUserDisplayName({ readonly: false }),
            new InputUserAvatar({ style: "" }),
          ],
        });
      }
      // EditModeBus.enable = !EditModeBus.enable
    });
  }
}
