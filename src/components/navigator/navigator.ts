import renderDOM from "@/utils/renderDOM";
import Component from "@/system/Component";
import Li_ from "@/components/elements/li";
import Navigator_ from "@/components/navigator";
import { AuthorizationPage } from "@/pages/authorization";
import { RegistrationPage } from "@/pages/registration";
import { ThreadList } from "@/pages/threadList";
import { ThreadActive } from "@/pages/threadActive";
import { ThreadManage } from "@/pages/threadManage";
import { ProfileEdit } from "@/pages/profile";
import { PasswordChange } from "@/pages/passwordChange";
import { createErrorPage } from "../layouts/errorPage";

const LiAuthorization = new Li_("li", {
  item: "Authorization",
  "data-target": "authorization",
  title: "Authorization",
  click: (event: Event) => {
    navigatorHandler(event, loadContent);
  },
});

const LiRegistration = new Li_("li", {
  item: "Registration",
  "data-target": "registration",
  title: "Registration",
  click: (event: Event) => {
    navigatorHandler(event, loadContent);
  },
});

const LiThreadList = new Li_("li", {
  item: "Thread list",
  "data-target": "thread-list",
  title: "Thread list",
  click: (event: Event) => {
    navigatorHandler(event, loadContent);
  },
});

const LiThreadActive = new Li_("li", {
  item: "Active thread",
  "data-target": "thread-active",
  title: "Active thread",
  click: (event: Event) => {
    navigatorHandler(event, loadContent);
  },
});

const LiThreadManage = new Li_("li", {
  item: "Manage thread",
  "data-target": "thread-manage",
  title: "Manage thread",
  click: (event: Event) => {
    navigatorHandler(event, loadContent);
  },
});

const LiProfile = new Li_("li", {
  item: "Profile",
  "data-target": "profile",
  title: "Profile",
  click: (event: Event) => {
    navigatorHandler(event, loadContent);
  },
});

const LiPassword = new Li_("li", {
  item: "Password change",
  "data-target": "password-change",
  title: "Password change",
  click: (event: Event) => {
    navigatorHandler(event, loadContent);
  },
});

const Li404 = new Li_("li", {
  item: "404",
  "data-target": "404",
  title: "404",
  click: (event: Event) => {
    navigatorHandler(event, loadContent);
  },
});

const Li5xx = new Li_("li", {
  item: "5xx",
  "data-target": "5xx",
  title: "5xx",
  click: (event: Event) => {
    navigatorHandler(event, loadContent);
  },
});

class LabelledInput extends Component {
  protected _setTemplate(): string {
    return `{{labelText}}<input type="{{type}}" id="{{for}}" style="display:none"/>`;
  }
}

const NavigatorToggler = new LabelledInput(
  "label",
  {
    type: "checkbox",
    labelText: "TOGGLE",
    for: "navigatorToggler",
    click: (event: Event) => {
      event.preventDefault();
      if (event.target == null) return;
      const input = (event.target as HTMLInputElement).childNodes[1] as HTMLInputElement;
      const parent = (event.target as HTMLElement).parentElement;
      if (input == null || parent == null) {
        throw new Error("hello");
      }
      input.toggleAttribute("checked");
      parent.classList.toggle("navigatorMinimize", input.checked);
    },
  },
  "navigatorToggler"
);

const Navigator = new Navigator_(
  "div",
  {
    class: "navigator",
    links: [
      LiAuthorization,
      LiRegistration,
      LiThreadList,
      LiThreadActive,
      LiThreadManage,
      LiProfile,
      LiPassword,
      Li404,
      Li5xx,
    ],
    button: NavigatorToggler,
  },
  "navigator"
);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM("#app", AuthorizationPage.content);
  renderDOM("#navigator", Navigator.content);
});

function navigatorHandler(event: Event, cb: (arg: string) => void) {
  event.preventDefault();
  const target = (event.target as HTMLElement).dataset.target;
  if (target == null) throw new Error("navigator: no target on link");
  window.history.replaceState(target, target, `/${target}`);
  cb(target);
}

function loadContent(name: string): void {
  switch (name) {
    case "authorization": {
      renderDOM("#app", AuthorizationPage.content);
      break;
    }
    case "registration": {
      renderDOM("#app", RegistrationPage.content);
      break;
    }
    case "thread-list": {
      renderDOM("#app", ThreadList.content);
      break;
    }
    case "thread-active": {
      renderDOM("#app", ThreadActive.content);
      break;
    }
    case "thread-manage": {
      renderDOM("#app", ThreadManage.content);
      break;
    }
    case "profile": {
      renderDOM("#app", ProfileEdit.content);
      break;
    }
    case "password-change": {
      renderDOM("#app", PasswordChange.content);
      break;
    }
    case "404": {
      const Page404 = createErrorPage("404", "we've lost");
      renderDOM("#app", Page404.content);
      break;
    }
    case "5xx": {
      const Page5xx = createErrorPage("5xx", "something went wrong");
      renderDOM("#app", Page5xx.content);
      break;
    }
    default:
      break;
  }
}
