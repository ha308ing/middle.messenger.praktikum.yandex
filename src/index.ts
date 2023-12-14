import "@/components/styles/root.scss";
import store, { StoreEvents } from "@/system/store";
import threadsController from "@/controllers/threadsController";
import authController from "@/controllers/authController";
import SigninPage from "@/pages/sign-in";
import SignupPage from "@/pages/sign-up";
import SettingsPage from "@/pages/settings";
import router from "@/system/router";
import PasswordChangePage from "@/pages/password-change";
import MessengerPage from "@/pages/messenger";
import ThreadManagePage from "@/pages/thread-manage";
import Error404 from "@/pages/404";
import Error5xx from "@/pages/5xx";
import wsController from "./controllers/wsController";
import { type Thread } from "./types/types.api";

router
  .use("/", SigninPage)
  .use("/sign-in", SigninPage)
  .use("/sign-up", SignupPage)
  .use("/messenger", MessengerPage)
  .use("/settings", SettingsPage)
  .use("/thread-manage", ThreadManagePage)
  .use("/password-change", PasswordChangePage)
  .use("/404", Error404)
  .use("/5xx", Error5xx);

store.on(StoreEvents.activateThread, threadId => {
  store.set("activeThread", threadId);
});

if (store.get("user")?.id == null) {
  console.log(`no user in store`);
  authController.setUserInfo().then(
    res => {
      console.log(`authController 1st setUserInfo res:`, res);
      threadsController.updateThreads().then(() => {
        router.go("/messenger", true);
      });
    },
    rej => {
      // router.go("/messenger");
      console.log(`authController 1st setUserInfo failed rej:`, rej);
    }
  );
} else {
  console.log(`yes user in store`);
  const savedTheads = store.get("threads_");
  Object.values(savedTheads as Record<string, Thread>).forEach(t => {
    if (t?.id != null) wsController.connect(t.id);
  });
  const targatpathname = window.location.pathname;
  if (!router.restricted.includes(targatpathname)) router.go("/messenger");
}

router.start();
