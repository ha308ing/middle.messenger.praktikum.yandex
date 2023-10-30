import modalTemplateString from "/pages/threadManage/components/modal/modal.hbs?raw";
import Handlebars from "handlebars";
import "/components/elements/iconButton/index.js";
import "/components/elements/button/index.js";
import "/pages/threadManage/components/modal/modal.scss";

const contextConfirm = {
  class: "modal_confirmLeaveThread",
  message: "Do you really want to leave <Thread title> thread?",
  buttons: [
    {
      buttonText: "Yes",
      handler: 'console.log("modal yes handler")',
    },
    {
      buttonText: "No",
      handler: 'console.log("modal no handler")',
    },
  ],
};

Handlebars.registerPartial("modal", modalTemplateString);
Handlebars.registerPartial(
  "modalConfirm",
  Handlebars.compile(modalTemplateString)(contextConfirm)
);
