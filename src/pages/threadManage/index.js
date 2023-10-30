import Handlebars from "handlebars";
import "/pages/threadManage/threadManage.scss";
import threadManageTemplateString from "/pages/threadManage/threadManage.hbs?raw";
import "/components/layouts/body/index.js";
import "/components/layouts/threadsLayout/index.js";
import "/components/elements/topBar/index.js";
import "/components/elements/avatar/index.js";
import "/components/elements/button/index.js";
import "/components/elements/inputText/index.js";
import "/components/elements/threadListItem/index.js";
import "/pages/threadManage/components/threadMember/index.js";
import "/pages/threadManage/components/modal/index.js";
import "/pages/threadManage/threadManage.js";
import avatarSrc from "/assets/sweater.png";
import iconClose from "/assets/icon_close.png";
import iconInvite from "/assets/icon_invite.png";

const threadMembers = [
  {
    avatarSrc,
    login: "<User 1>",
    isMember: true,
  },
  {
    avatarSrc,
    login: "<User 2>",
    isMember: true,
  },
  {
    avatarSrc,
    login: "<User 1>",
    isMember: true,
  },
  {
    avatarSrc,
    login: "<found user not in thread>",
    isMember: false,
  },
];

document.body.innerHTML = Handlebars.compile(threadManageTemplateString)({
  rootClass: "page threadManagePage leftPanelLayout",
  avatarSrc,
  login: "<Login>",
  threadMembers,
  iconClose,
  iconInvite,
  threads: [
    {
      avatarSrc,
      threadTitle: "<Thread title>",
      threadPreview: "<Thread preview>",
    },
    {
      avatarSrc,
      threadTitle: "<Thread title>",
      threadPreview: "<Thread preview>",
      active: true,
    },
    {
      avatarSrc,
      threadTitle: "<Thread title>",
      threadPreview: "<Thread preview>",
    },
    {
      avatarSrc,
      threadTitle: "<Thread title>",
      threadPreview: "<Thread preview>",
    },
  ],
});
