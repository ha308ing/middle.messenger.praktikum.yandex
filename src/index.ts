import "@/components/styles/root.scss";
import store, { StoreEvents } from "@/system/store";
import threadsController from "@/controllers/threadsController";
import authController from "@/controllers/authController";
import router from "@/system/router";
import wsController from "./controllers/wsController";
import { type Thread } from "./types/types.api";
import {
  SigninPage,
  SignupPage,
  MessengerPage,
  SettingsPage,
  ThreadManagePage,
  PasswordChangePage,
  Page404,
  Page5xx,
} from "@/pages";

router
  .use("/", SigninPage)
  .use("/sign-in", SigninPage)
  .use("/sign-up", SignupPage)
  .use("/messenger", MessengerPage)
  .use("/settings", SettingsPage)
  .use("/thread-manage", ThreadManagePage)
  .use("/password-change", PasswordChangePage)
  .use("/404", Page404)
  .use("/5xx", Page5xx);

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
  if (savedTheads != null)
    Object.values(savedTheads as Record<string, Thread>).forEach(t => {
      if (t?.id != null) wsController.connect(t.id);
    });
  const targatpathname = window.location.pathname;
  if (!router.restricted.includes(targatpathname)) router.go("/messenger");
}

router.start();
