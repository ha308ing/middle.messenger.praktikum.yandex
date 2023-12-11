import Input from "@/components/elements/input";
import Button from "@/components/elements/button";
import Form from "@/components/elements/form";
import ThreadController from "@/controllers/threadsController";

class InputFindUser extends Input {
  constructor() {
    super(
      "div",
      {
        class: "findUser",
        type: "text",
        name: "findUser",
        placeholder: "Find user (enter login)",
      },
      "searchContainer"
    );
  }
}

class ButtonFindUser extends Button {
  constructor() {
    super({
      class: "button button_findUser button_submit",
      buttonText: "Find user",
      type: "submit",
    });
  }
}

export default class FindUserForm extends Form {
  constructor() {
    super(
      {
        inputs: [new InputFindUser()],
        buttons: [new ButtonFindUser()],
        submitter: findUser => {
          ThreadController.findUser(findUser.findUser);
        },
      },
      "form form_threadManage form_findUser"
    );
  }
}
