import "./sendBar.scss";
import { Input } from "@/components/elements/input";
import { IconButtonSend } from "@/components/elements/iconButton";
import wsController from "@/controllers/wsController";
import store from "@/system/store";
import { type Indexed } from "@/types/types";
import { Block } from "@/system/block";
import { AttachButton } from "./elements/attachButton";

export class SendBar extends Block {
  constructor(props?: Indexed) {
    super("form", {
      threadId: props?.threadId,
      submit: (event: SubmitEvent) => {
        event.preventDefault();
        const form = event.target;
        const input = (form as HTMLElement).querySelector("input#message") as HTMLInputElement;
        const message = input.value;
        const threadId = store.getState().activeThread;

        const view = document.querySelector(".messages_container");
        if (view != null) view.scrollTo(0, view.scrollHeight);
        wsController.sockets[threadId].send(message);

        input.value = "";
      },
      ...props,
      class: "sendBar",
    });

    this.children.buttonAttach = new AttachButton();
    this.children.inputMessage = new Input({
      type: "text",
      name: "message",
      placeholder: "Enter the message",
      class: "input input_message",
    });
    this.children.buttonSend = new IconButtonSend({ type: "submit" });
  }

  render() {
    const template = `
    {{#unless hidden}}
      {{{buttonAttach}}}{{{inputMessage}}}{{{buttonSend}}}
    {{/unless}}
    `;
    return this.compile(template, {
      ...this.props,
      buttonAttach: this.children.buttonAttach,
      inputMessage: this.children.inputMessage,
      buttonSend: this.children.buttonSend,
    });
  }
}
