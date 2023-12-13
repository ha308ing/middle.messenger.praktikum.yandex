import Input from "@/components/elements/input";
import Button from "@/components/elements/button";
import Form from "@/components/elements/form";
import ThreadController from "@/controllers/threadsController";
import threadsAPI from "@/api/threadsAPI";

class ButtonFindUser extends Button {
  constructor() {
    super({
      class: "button button_changeAvatar button_submit",
      buttonText: "Change avatar",
      type: "submit",
    });
  }
}

class InputAvatar extends Input {
  constructor(props?: Record<string, any>) {
    super(
      "div",
      {
        // class: "input__horizontal",
        // label: "Avatar",
        type: "file",
        name: "avatar",
        placeholder: "Avatar",
        vertical: false,
        ...props,
      },
      "input input_file"
    );
  }
}

export default class AvatarForm extends Form {
  constructor() {
    super(
      {
        inputs: [new InputAvatar()],
        buttons: [new ButtonFindUser()],
        submitter: formData => {
          threadsAPI.changeAvatar(formData.avatar[0]);
        },
      },
      "form form_threadManage logoContainer"
    );
  }
}
