import { BaseAPI } from "@/api/baseAPI";
import { type SigninObject } from "@/types/types.api";

class AuthAPI extends BaseAPI {
  public async isLogged() {
    console.log("LoginAPI: isLogged");
    try {
      const request = await this.transporter.get("/auth/user");
      const { status, response } = request;
      const responseJSON = JSON.parse(response);
      if (status === 200) {
        return { status, response: responseJSON };
      }
      const { reason } = responseJSON;

      const isFailed = status === 400 || status === 401 || status >= 500;
      if (isFailed) throw new Error(`${status}: ${reason}`);
    } catch (e) {
      console.error("AuthAPI isLogged failed");
      console.error(e);
    }
    return { status: null, response: null };
  }

  public async signin(user: SigninObject) {
    console.log("LoginAPI: signin", ...Object.values(user));
    try {
      const request = await this.transporter.post("/auth/signin", {
        data: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      const { status, response } = request;
      if (status === 200) {
        return { status, response };
      }

      const { reason: message } = JSON.parse(response);

      if (status === 400 || status === 401) return { status, message };
      return { status: 0 };
    } catch (e) {
      console.error(e);
    }
    return { status: 0 };
  }

  public async logout() {
    console.log("authAPI: logout");
    try {
      const request = await this.transporter.post("/auth/logout", {
        withCredentials: true,
      });
      const { status } = request;

      if (status === 200) return true;
      return false;
    } catch (e) {
      console.error("AuthAPI logout");
      console.error(e);
    }
    return false;
  }
}

export default new AuthAPI();
