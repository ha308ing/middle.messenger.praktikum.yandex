import Component from "@/system/Component";
import passwordChangeTemplateString from "./passwordChange.hbs?raw";
import "./passwordChange.scss";
import { createThreadLayout } from "@/pages/threadList";
import { createIconButtonBack, createIconButtonExit } from "@/components/elements/iconButton";
import TopBar_ from "@/components/elements/topBar";
import { createAvatarProfile } from "@/components/elements/avatar";
import Button from "@/components/elements/button";
import { createForm } from "@/components/elements/form";
import { createInputPassword } from "@/components/elements/input";

export default class PasswordChangeLayout_ extends Component {
  protected _setTemplate(): string {
    return passwordChangeTemplateString.trim();
  }
}

const inputsPasswordChange = [
  createInputPassword({
    label: "Current password",
    placeholder: "Current password",
    name: "old_password",
    class: "input_oldPassword",
  }),
  createInputPassword({
    label: "New password",
    placeholder: "New password",
    name: "new_password",
    class: "input_newPassword",
  }),
  createInputPassword({
    label: "Repeat password",
    placeholder: "Repeat password",
    name: "repeat_password",
    class: "input_repeatPassword",
  }),
];

const ButtonBack = createIconButtonBack();
const ButtonExit = createIconButtonExit();

const TopBar = new TopBar_(
  "nav",
  {
    backButton: ButtonBack,
    content: `<h2 class="topBar_heading">Change password</h2>`,
    exitButton: ButtonExit,
  },
  "topBar"
);

const Avatar = createAvatarProfile();

const ButtonSavePassword = new Button(
  "button",
  { buttonText: "Change password" },
  "button button_changePassword button_submit"
);

const FormPassword = createForm(
  {
    inputs: inputsPasswordChange,
    buttons: ButtonSavePassword,
  },
  "form_profileEdit"
);

export const PasswordChangeLayout = new PasswordChangeLayout_(
  "section",
  {
    TopBar,
    Avatar,
    login: "User",
    FormPassword,
  },
  "rightPanel_content profile rightPanel_content_profileEdit threadList__active"
);

export const PasswordChange = createThreadLayout({ content: PasswordChangeLayout });
