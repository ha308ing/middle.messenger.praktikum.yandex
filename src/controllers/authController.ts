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
    console.log("authController: setUserInfo");
    const { status, response } = await this.isLogged();
    if (status !== 200 && status !== 400) throw new Error(`${status}: ${response.reason}`);
    console.log("User is logged, id:", response.id);
    const responseFixedAvatar = avatarFixObj(response);
    STORE.set("user", responseFixedAvatar);
    return true;
  }

  public async signin(loginInput = { login: "marta2", password: "Peter123" }) {
    console.log("AuthController: login", loginInput.login);
    const { status, message } = await AuthAPI.signin(loginInput);
    console.log("result of login");
    console.log(status, message);

    if (status !== 200 && status !== 400) {
      throw new Error(`Signin failed, ${status}: ${message}`);
    }
    this.setUserInfo().then(
      () => {
        threadsController.updateThreads().then(
          res => {
            console.log("signin res", res);
            router.go("/messenger");
          },
          rej => {
            console.log("signin rej", rej);
          }
        );
      },
      rej => {
        console.log("signin set user info rej");
        console.log(rej);
      }
    );

    return true;
  }

  public async logout() {
    console.log("AuthController: logout");
    const response = await AuthAPI.logout();
    console.log(`logout response: `, response);
    router.clearRedirects();
    window.localStorage.clear();
    STORE.clearState();
    router.use("/", SigninPage);
    router.use("/sign-in", SigninPage);
    router.use("/sign-up", SigninPage).go("/sign-in");
    console.log("end");
    return "logged out";
  }
}

export default new AuthController();
