import { Form } from "@/components/elements/form";
import threadsAPI from "@/api/threadsAPI";
import { ButtonSaveAvatar, InputAvatar } from "./elements";

export class AvatarForm extends Form {
  constructor() {
    super({
      submitter: formData => {
        threadsAPI.changeAvatar(formData.avatar[0]);
      },
      class: "form form_threadManage logoContainer",
    });

    this.lists.inputs = [new InputAvatar()];
    this.lists.buttons = [new ButtonSaveAvatar()];
  }
}
