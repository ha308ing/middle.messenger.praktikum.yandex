import Component from "@/system/component";
import "./SendBar.scss";
import Input from "@/components/elements/input";
import { IconButtonAttach, IconButtonSend } from "@/components/elements/iconButton";
import icon_attach from "@/assets/icon_attach.png";
import ThreadAPI from "@/api/threadsAPI";
import wsController from "@/controllers/wsController";
import store from "@/system/store";
import connect from "@/system/storeConnector";
import { type Indexed } from "@/types/types";

class AttachButton extends Component {
  constructor() {
    super("label", {
      content: new IconButtonAttach(),
      for: "attach",
      img: icon_attach,
      change: (e: FormDataEvent) => {
        const activeThreadId = store.get("activeThread");
        const files = (e.target as HTMLFormElement).files;
        ThreadAPI.sendFile(files).then(contentId => {
          wsController.sendFile(activeThreadId, contentId);
        });
      },
    });
  }

  protected _setTemplate(): string | null {
    return `<img style="cursor:pointer; width:2rem" src={{{img}}} /><input type="file" accept="image/*"  id="attach" style="display:none"/>`;
  }
}

export class SendBar extends Component {
  constructor(props?: Indexed) {
    super(
      "form",
      {
        buttonAttach: new AttachButton(),
        inputMessage: new Input(
          "div",
          {
            type: "text",
            name: "message",
            placeholder: "Enter the message",
          },
          "input input_message"
        ),
        threadId: props?.threadId,
        buttonSend: new IconButtonSend({ type: "submit" }),
        submit: (event: SubmitEvent) => {
          event.preventDefault();
          const form = event.target;
          const input = (form as HTMLElement).querySelector("input#message") as HTMLInputElement;
          const message = input.value;
          const threadId = store.getState().activeThread;

          const view = document.querySelector(".messages_container");
          if (view != null) view.scrollTo(0, view.scrollHeight);
          wsController.sendMessage(threadId, message).then(
            () => {},
            rej => {
              console.error(rej);
            }
          );
          input.value = "";
        },
        ...props,
      },
      "sendBar"
    );
  }

  protected _setTemplate(): string {
    return `
    {{#unless hidden}}
      {{{buttonAttach}}}{{{inputMessage}}}{{{buttonSend}}}
    {{/unless}}
    `;
  }
}
const SendMessageFormConnected = connect<typeof SendBar>(state => {
  const { activeThread } = state;
  if (activeThread == null) {
    return { hidden: true, class: "hidden" };
  } else {
    return { hidden: false, class: "", activeThread };
  }
})(SendBar);

export default SendMessageFormConnected;
