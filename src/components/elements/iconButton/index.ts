import Handlebars from "handlebars";
import iconButtonTemplateString from "/components/elements/iconButton/iconButton.hbs?raw";
import "/components/elements/iconButton/iconButton.scss";
import icon_attach from "/assets/icon_attach.png";
import icon_back from "/assets/icon_back.png";
import icon_close from "/assets/icon_close.png";
import icon_context_horizontal from "/assets/icon_context_horizontal.png";
import icon_context_vertical from "/assets/icon_context_vertical.png";
import icon_edit from "/assets/icon_edit.png";
import icon_exit from "/assets/icon_exit.png";
import icon_invite from "/assets/icon_invite.png";
import icon_menu from "/assets/icon_menu.png";
import icon_password from "/assets/icon_password.png";
import icon_reply from "/assets/icon_reply.png";
import icon_send from "/assets/icon_send.png";

const icons = {
  attach: icon_attach,
  back: icon_back,
  close: icon_close,
  context_horizontal: icon_context_horizontal,
  context_vertical: icon_context_vertical,
  edit: icon_edit,
  exit: icon_exit,
  invite: icon_invite,
  menu: icon_menu,
  password: icon_password,
  reply: icon_reply,
  send: icon_send,
};

Object.entries(icons).forEach(([iconName, iconButtonIcon]) => {
  const iconButtonName = `iconButton_${iconName}`;
  const handler = `console.log("${iconName} button handler")`;
  const context = {
    iconButtonIcon,
    iconButtonClick: handler,
    iconButtonClass: iconButtonName,
  };
  const iconButton = Handlebars.compile(iconButtonTemplateString)(context);
  Handlebars.registerPartial(iconButtonName, iconButton);
});

Handlebars.registerPartial("iconButton", iconButtonTemplateString);
