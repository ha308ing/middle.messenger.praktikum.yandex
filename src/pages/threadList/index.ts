import Handlebars from "handlebars";
import "/components/layouts/body";
import "/components/elements/avatar";
import "/components/elements/inputText";
import "/components/elements/button";
import "/components/elements/threadListItem";
import "/components/elements/iconButton";
import "/components/elements/topBar";
import "/pages/threadList/threadList.scss";
import threadListTemplateString from "/pages/threadList/threadList.hbs?raw";
import avatarSrc from "/assets/sweater.png";
import "/components/layouts/threadsLayout";

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

document.body.innerHTML = Handlebars.compile(threadListTemplateString)(threadListContext);
