import STORE from "@/system/store";
import AuthAPI from "@/api/authAPI";
import { avatarFixObj } from "@/utils/avatarFix";
import threadsController from "@/controllers/threadsController";
import router from "@/system/router";
import SigninPage from "@/pages/sign-in";

export class AuthController {
  public async isLogged() {
    const response = await AuthAPI.isLogged();
    return response;
  }

  public async setUserInfo() {
    const { status, response } = await this.isLogged();
    if (status !== 200 && status !== 400) throw new Error(`${status}: ${response.reason}`);
    const responseFixedAvatar = avatarFixObj(response);
    STORE.set("user", responseFixedAvatar);
    return true;
  }

  public async signin(loginInput = { login: "marta2", password: "Peter123" }) {
    const response = await AuthAPI.signin(loginInput);
    if (response.status !== 200 && response.status !== 400) {
      const errorMessage = `Signin failed: ${response.reason}`;
      alert(errorMessage);
      throw new Error(errorMessage);
    }
    this.setUserInfo().then(() => {
      threadsController.updateThreads().then(
        () => {
          router.go("/messenger", true);
        },
        rej => {
          console.log("signin rejected", rej);
        }
      );
    });

    return true;
  }

  public async logout() {
    const response = await AuthAPI.logout();
    console.log(`logout response: `, response);
    router.clearRedirects();
    window.localStorage.clear();
    STORE.clearState();
    router.use("/", SigninPage);
    router.use("/sign-in", SigninPage);
    router.use("/sign-up", SigninPage).go("/sign-in");
    return "logged out";
  }
}

export default new AuthController();
