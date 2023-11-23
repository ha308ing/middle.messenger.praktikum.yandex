import Component from "@/system/Component";
import threadActiveTemplateString from "./threadActive.hbs?raw";
import "./threadActive.scss";
import { createThreadLayout } from "@/pages/threadList";
import {
  createIconButtonContextHorizontal,
  createIconButtonBack,
  createIconButtonAttach,
  createIconButtonSend,
} from "@/components/elements/iconButton";
import TopBar_ from "@/components/elements/topBar";
import { createAvatarThread } from "@/components/elements/avatar";
import SendBar_ from "@/components/elements/sendBar";
import { createMessageAttachment } from "@/components/elements/message/components/attachment";
import { createMessage } from "@/components/elements/message";
import Input from "@/components/elements/input";

export default class ThreadActiveLayout_ extends Component {
  protected _setTemplate(): string {
    return threadActiveTemplateString.trim();
  }
}

const ButtonContext = createIconButtonContextHorizontal();
const ButtonBack = createIconButtonBack();

const TopBar = new TopBar_(
  "nav",
  {
    threadTitle: "Thread title",
    content: [createAvatarThread(), `<h1>{{threadTitle}}</h1>`],
    backButton: ButtonBack,
    contextButton: ButtonContext,
  },
  "topBar"
);

const attachment = createMessageAttachment();
const message1 = createMessage({
  sender: "<Thread user 1>",
  text: "Lorem ipsum dolor sit amet consectetur. In massa tempus fusce nunc pellentesque vestibulum suscipit ut. Turpis eget porttitor ac aenean pellentesque tempor parturient facilisis. Sed orci gravida facilisis posuere orci lectus pellentesque ut pharetra. Turpis quis diam nisi vel arcu pretium proin. Et in viverra tincidunt faucibus viverra. Sem magna rutrum nisi id venenatis tincidunt ut nisl. Nisl.",
  time: "2 January 2005 15:06",
});
const message2 = createMessage({
  sender: "<Thread user 2>",
  text: "Lorem ipsum dolor sit amet consectetur. Mollis morbi dui feugiat sociis.",
  time: "2 January 2005 15:06",
  attachment,
});
const message3 = createMessage({
  text: "Lorem ipsum dolor sit amet consectetur. Erat vehicula aenean nam mus mi eleifend tempus odio. At erat cursus pharetra nunc. Et tortor turpis pulvinar orci ipsum dolor vel diam suscipit.",
  time: "3 January 2005 15:26",
});

const IconButtonAttach = createIconButtonAttach();
const IconButtonSend = createIconButtonSend();
const InputMessage = new Input(
  "div",
  {
    type: "text",
    name: "message",
    placeholder: "Enter message",
  },
  "input input_message"
);
export const SendBar = new SendBar_(
  "form",
  {
    items: [IconButtonAttach, InputMessage, IconButtonSend],
  },
  "sendBar"
);

export const ThreadActiveLayout = new ThreadActiveLayout_(
  "section",
  {
    topBar: TopBar,
    messages: [message1, message2, message3],
    sendBar: SendBar,
  },
  "rightPanel_content threadList__active"
);

export const ThreadActive = createThreadLayout({ content: ThreadActiveLayout, threadActive: true });
