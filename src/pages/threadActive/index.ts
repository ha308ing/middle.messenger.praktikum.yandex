import Handlebars from "handlebars";
import threadActiveTemplateString from "/pages/threadActive/threadActive.hbs?raw";
import "/components/layouts/body";
import "/components/layouts/threadsLayout";
import "/components/elements/topBar";
import "/components/elements/message";
import "/components/elements/avatar";
import "/components/elements/threadListItem";
import "/components/elements/button";
import "/components/elements/sendBar";
import "/pages/threadActive/threadActive.scss";
import avatarSrc from "/assets/sweater.png";
import mediaUrl from "/assets/media.png";

const messages = [
  {
    sender: "<Thread user 1>",
    text: "Lorem ipsum dolor sit amet consectetur. In massa tempus fusce nunc pellentesque vestibulum suscipit ut. Turpis eget porttitor ac aenean pellentesque tempor parturient facilisis. Sed orci gravida facilisis posuere orci lectus pellentesque ut pharetra. Turpis quis diam nisi vel arcu pretium proin. Et in viverra tincidunt faucibus viverra. Sem magna rutrum nisi id venenatis tincidunt ut nisl. Nisl.",
    time: "2 January 2005 15:06",
  },
  {
    sender: "<Thread user 2>",
    text: "Lorem ipsum dolor sit amet consectetur. Mollis morbi dui feugiat sociis.",
    time: "2 January 2005 15:06",
    attachments: {
      images: [mediaUrl],
    },
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Erat vehicula aenean nam mus mi eleifend tempus odio. At erat cursus pharetra nunc. Et tortor turpis pulvinar orci ipsum dolor vel diam suscipit.",
    time: "3 January 2005 15:26",
  },
];

const threadContext = {
  avatarSrc,
  threadTitle: "<Thread title>",
  threadPreview: "<Thread preview>",
};

const threadActiveContext = {
  rootClass: "page threadActivePage leftPanelLayout",
  messages,
  avatarSrc,
  login: "<Login>",
  threads: [
    ...new Array(3).fill(threadContext),
    { ...threadContext, active: true },
    ...new Array(4).fill(threadContext),
  ],
};

document.body.innerHTML = Handlebars.compile(threadActiveTemplateString)(threadActiveContext);
