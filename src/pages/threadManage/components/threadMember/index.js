import Handlebars from "handlebars";
import threadMemberTemplateString from "/pages/threadManage/components/threadMember/threadMember.hbs?raw";
import "/pages/threadManage/components/threadMember/threadMember.scss";
import "/components/elements/avatar/index.js";
import "/components/elements/iconButton/index.js";

Handlebars.registerPartial("threadMember", threadMemberTemplateString);
