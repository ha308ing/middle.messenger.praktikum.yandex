import Component, { type Props } from "@/system/Component";
import inputTemplateString from "./input.hbs?raw";
import "./input.scss";

export default class Input extends Component {
  protected _setTemplate(): string {
    return inputTemplateString.trim();
  }
}

export function createInputLogin(props: Props = {}) {
  return new Input(
    "div",
    {
      class: "input__vertical",
      label: "Login",
      type: "text",
      name: "login",
      placeholder: "Login",
      vertical: true,
      ...props,
    },
    "input input_login"
  );
}

export function createInputPassword(props?: Props) {
  return new Input(
    "div",
    {
      class: "input__vertical",
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Password",
      vertical: true,
      ...props,
    },
    "input input_password input__vertical"
  );
}

export function createInputEmail(props: Props = {}) {
  return new Input(
    "div",
    {
      class: "input__vertical",
      label: "Email",
      type: "text",
      name: "email",
      placeholder: "Email",
      vertical: true,
      ...props,
    },
    "input input_email"
  );
}

export function createInputPhone(props: Props = {}) {
  return new Input(
    "div",
    {
      class: "input__vertical",
      label: "Phone",
      type: "text",
      name: "phone",
      placeholder: "Phone",
      vertical: true,
      ...props,
    },
    "input input_phone"
  );
}

export function createInputFirstName(props: Props = {}) {
  return new Input(
    "div",
    {
      class: "input__vertical",
      label: "First name",
      type: "text",
      name: "first_name",
      placeholder: "First name",
      vertical: true,
      ...props,
    },
    "input input_firstName"
  );
}

export function createInputSecondName(props: Props = {}) {
  return new Input(
    "div",
    {
      class: "input__vertical",
      label: "Second name",
      type: "text",
      name: "second_name",
      placeholder: "Second name",
      vertical: true,
      ...props,
    },
    "input input_secondName"
  );
}

export function createInputDisplayName(props: Props = {}) {
  return new Input(
    "div",
    {
      class: "input__vertical",
      label: "Display name",
      type: "text",
      name: "display_name",
      placeholder: "Display name",
      vertical: true,
      ...props,
    },
    "input input_displayName"
  );
}

export function createInputAvatar(props: Props = {}) {
  return new Input(
    "div",
    {
      class: "input__vertical",
      label: "Avatar",
      type: "file",
      name: "avatar",
      placeholder: "Avatar",
      vertical: true,
      ...props,
    },
    "input input_avatar input_file"
  );
}
