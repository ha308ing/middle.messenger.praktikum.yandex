import Handlebars from "handlebars";
import threadMemberTemplateString from "/pages/threadManage/components/threadMember/threadMember.hbs?raw";
import "/pages/threadManage/components/threadMember/threadMember.scss";
import "/components/elements/avatar";
import "/components/elements/iconButton";

Handlebars.registerPartial("threadMember", threadMemberTemplateString);
