import { Form } from "@/components/elements/form";
import { InputThreadTitleConnected, ButtonSetThreadTitle } from "./elements";

export class ThreadTitleForm extends Form {
  constructor() {
    super({
      class: "form form_threadManage form_setThreadTitle",
      submitter: threadTitle => {
        console.log(threadTitle);
      },
    });

    this.lists.inputs = [new InputThreadTitleConnected()];
    this.lists.buttons = [new ButtonSetThreadTitle()];
  }
}
