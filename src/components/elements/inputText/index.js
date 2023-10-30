import inputTextTemplateString from "./inputText.hbs?raw";
import Handlebars from "handlebars";
import "./inputText.scss";

const inputs = {
  login: {
    class: "inputText_login",
    label: "Login",
    type: "text",
    name: "login",
    placeholder: "Login",
  },
  password: {
    class: "inputText_password",
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Password",
  },
  email: {
    class: "inputText_email",
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Email",
  },
  phone: {
    class: "inputText_phone",
    label: "Phone",
    type: "phone",
    name: "phone",
    placeholder: "Phone",
  },
  firstName: {
    class: "inputText_firstName",
    label: "First name",
    type: "text",
    name: "first_name",
    placeholder: "First name",
  },
  secondName: {
    class: "inputText_secondName",
    label: "Second name",
    type: "text",
    name: "second_name",
    placeholder: "Second name",
  },
  displayName: {
    class: "inputText_displayName",
    label: "Display name",
    type: "text",
    name: "display_name",
    placeholder: "Display name",
  },
  message: {
    class: "inputText_message",
    type: "text",
    name: "message",
    placeholder: "Enter message",
  },
  currentPassword: {
    class: "inputText_currentPassword",
    label: "Current password",
    type: "text",
    name: "oldPassword",
    placeholder: "Current password",
  },
  newPassword: {
    class: "inputText_newPassword",
    label: "New password",
    type: "text",
    name: "newPassword",
    placeholder: "New password",
  },
  repeatNewPassword: {
    class: "inputText_repeatNewPassword",
    label: "Repeat new password",
    type: "text",
    name: "repeatNewPassword",
    placeholder: "Repeat new password",
  },
  avatar: {
    class: "inputImage_avatar",
    label: "Avatar",
    type: "file",
    name: "avatar",
    placeholder: "Change avatar",
  },
};

Object.entries(inputs).forEach(([key, values]) => {
  Handlebars.registerPartial(
    `inputText_${key}`,
    Handlebars.compile(inputTextTemplateString)(values)
  );
  Handlebars.registerPartial(
    `inputText_${key}__vertical`,
    Handlebars.compile(inputTextTemplateString)({ ...values, vertical: true })
  );
  Handlebars.registerPartial(
    `inputText_${key}__readonly`,
    Handlebars.compile(inputTextTemplateString)({ ...values, readonly: true })
  );
  Handlebars.registerPartial(
    `inputText_${key}__vertical__readonly`,
    Handlebars.compile(inputTextTemplateString)({
      ...values,
      vertical: true,
      readonly: true,
    })
  );
  Handlebars.registerPartial(
    `inputText__${key}__invalid`,
    Handlebars.compile(inputTextTemplateString)({ ...values, invalid: true })
  );
  Handlebars.registerPartial(
    `inputText__${key}__vertical__invalid`,
    Handlebars.compile(inputTextTemplateString)({
      ...values,
      vertical: true,
      invalid: true,
    })
  );
});
Handlebars.registerPartial("inputText", inputTextTemplateString);
