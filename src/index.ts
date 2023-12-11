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
import threadsAPI from "./api/threadsAPI";
import wsController from "./controllers/wsController";
import Error404 from "@/pages/404";
import Error5xx from "@/pages/5xx";

store.on(StoreEvents.gotThread, threadData => {
  const { id: threadId } = threadData;
  threadsAPI.getThreadToken(threadId).then(threadTokenObj => {
    const { token: threadToken } = threadTokenObj;

    const userId = store.get("user.id");

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
  router.go("/messenger");
  threadsController.updateThreads().then(
    () => {},
    rej => {
      console.error("failed to get threads rej");
      console.error(rej);
      // router.go("/messenger");
    }
  );
}

router.start();
