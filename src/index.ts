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
import wsController from "./controllers/wsController";
import Error404 from "@/pages/404";
import Error5xx from "@/pages/5xx";
import threadsAPI from "./api/threadsAPI";

store.on(StoreEvents.gotThread, threadData => {
  const { id: threadId } = threadData;
  const userId = store.get("user.id");

  threadsAPI.getThreadToken(threadId).then(threadToken => {
    wsController.connect(userId, threadId, threadToken).then(
      socket => {
        store.set(`sockets.${threadId}`, socket);
      },
      rej => {
        console.error(rej);
      }
    );
  });
});

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

if (store.get("user")?.id == null) {
  console.log(`no user in store`);
  authController.setUserInfo().then(
    res => {
      router.go("/messenger");

      console.log(`authController 1st setUserInfo res:`, res);
      threadsController.updateThreads().then(() => {});
    },
    rej => {
      console.log(`authController 1st setUserInfo failed rej:`, rej);
    }
  );
} else {
  console.log(`yes user in store`);
  threadsController.updateThreads().then(
    () => {
      router.go("/messenger");
    },
    rej => {
      console.error("failed to get threads rej");
      console.error(rej);
      // router.go("/messenger");
    }
  );
}

router.start();
