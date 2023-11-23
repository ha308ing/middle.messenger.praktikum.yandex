import Component from "@/system/Component";
import profileTemplateString from "./profile.hbs?raw";
import "./profile.scss";
import { createThreadLayout } from "@/pages/threadList";
import {
  createIconButtonBack,
  createIconButtonExit,
  iconButtonEdit,
  createIconButtonPassword,
} from "@/components/elements/iconButton";
import TopBar_ from "@/components/elements/topBar";
import { createAvatarProfile } from "@/components/elements/avatar";

import Button from "@/components/elements/button";
import { createForm } from "@/components/elements/form";
import {
  createInputLogin,
  createInputEmail,
  createInputPhone,
  createInputFirstName,
  createInputSecondName,
  createInputDisplayName,
  createInputAvatar,
} from "@/components/elements/input";

export default class ProfileLayout_ extends Component {
  protected _setTemplate(): string {
    return profileTemplateString.trim();
  }
}

const inputsProfileEdit = [
  createInputLogin({ "data-readonly": false }),
  createInputEmail({ "data-readonly": false }),
  createInputPhone({ "data-readonly": false }),
  createInputDisplayName({ "data-readonly": false }),
  createInputFirstName({ "data-readonly": false }),
  createInputSecondName({ "data-readonly": false }),
  createInputAvatar({ "data-readonly": false }),
];

let inputsReadOnly = false;

const ButtonSaveProfile = new Button(
  "button",
  { buttonText: "Save" },
  "button button_save button_saveProfile button_submit"
);

const ButtonBack = createIconButtonBack();
const ButtonExit = createIconButtonExit();
const ButtonEdit = iconButtonEdit({
  click: () => {
    inputsReadOnly = !inputsReadOnly;
    ButtonSaveProfile.content.classList.toggle("hidden", inputsReadOnly);
    inputsProfileEdit.forEach(input => {
      input.setProps({ "data-readonly": inputsReadOnly });
    });
  },
});
const ButtonPassword = createIconButtonPassword();

const TopBar = new TopBar_(
  "nav",
  {
    backButton: ButtonBack,
    content: `<h2 class="topBar_heading">My Profile</h2>`,
    threadTitle: "Thread title",
    passwordChangeButton: ButtonPassword,
    editButton: ButtonEdit,
    exitButton: ButtonExit,
  },
  "topBar"
);

const Avatar = createAvatarProfile();

const FormProfile = createForm(
  {
    inputs: inputsProfileEdit,
    buttons: ButtonSaveProfile,
  },
  "form_profileEdit"
);

export const ProfileLayout = new ProfileLayout_(
  "section",
  {
    TopBar,
    Avatar,
    login: "User",
    FormProfile,
  },
  "rightPanel_content rightPanel_content_profileEdit threadList__active"
);

export const ProfileEdit = createThreadLayout({ content: ProfileLayout });
