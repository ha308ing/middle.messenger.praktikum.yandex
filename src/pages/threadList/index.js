import Handlebars from "handlebars";
import "/components/layouts/body/index.js";
import "/components/elements/avatar/index.js";
import "/components/elements/inputText/index.js";
import "/components/elements/button/index.js";
import "/components/elements/threadListItem/index.js";
import "/components/elements/iconButton/index.js";
import "/components/elements/topBar/index.js";
import "/pages/threadList/threadList.scss";
import threadListTemplateString from "/pages/threadList/threadList.hbs?raw";
import avatarSrc from "/assets/sweater.png";
import iconAttach from "/assets/icon_attach.png";
import "/components/layouts/threadsLayout/index.js";

const threadContext = {
  avatarSrc,
  threadTitle: "<Thread title>",
  threadPreview: "<Thread preview>",
};

const threadListContext = {
  rootClass: "page threadListPage leftPanelLayout",
  avatarSrc,
  login: "<Login>",
  threads: new Array(4).fill(threadContext),
};

document.body.innerHTML = Handlebars.compile(threadListTemplateString)(
  threadListContext
);
