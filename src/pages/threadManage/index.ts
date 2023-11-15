import Handlebars from "handlebars";
import "/pages/threadManage/threadManage.scss";
import threadManageTemplateString from "/pages/threadManage/threadManage.hbs?raw";
import "/components/layouts/body";
import "/components/layouts/threadsLayout";
import "/components/elements/topBar";
import "/components/elements/avatar";
import "/components/elements/button";
import "/components/elements/inputText";
import "/components/elements/threadListItem";
import "/pages/threadManage/components/threadMember";
import "/pages/threadManage/components/modal";
import "/pages/threadManage/threadManage.ts";
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
