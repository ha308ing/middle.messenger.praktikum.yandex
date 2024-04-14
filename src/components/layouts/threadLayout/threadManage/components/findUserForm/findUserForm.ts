import { Form } from "@/components/elements/form";
import ThreadController from "@/controllers/threadsController";
import { ButtonFindUser, InputFindUser } from "./elements";

export class FindUserForm extends Form {
  constructor() {
    super({
      submitter: findUser => {
        ThreadController.findUser(findUser.findUser);
      },
      class: "form form_threadManage form_findUser",
    });

    this.lists.inputs = [new InputFindUser()];
    this.lists.buttons = [new ButtonFindUser()];
  }
}
