import { BaseAPI } from "@/api/baseAPI";
import { type SigninObject } from "@/types/types.api";

class AuthAPI extends BaseAPI {
  public async isLogged() {
    console.log("LoginAPI: isLogged");
    try {
      const { status, response } = await this.transporter.get("/auth/user");
      console.log("isLogged")
      console.log(response)
      if (status === 200) {
        return { status, response };
      }
      const isFailed = status === 400 || status === 401 || status >= 500;
      if (isFailed) throw new Error(`${status}: ${response.reason}`);
    } catch (e) {
      console.error("AuthAPI isLogged failed");
      console.error(e);
    }
    return { status: null, response: null };
  }

  public async signin(user: SigninObject) {
    console.log("LoginAPI: signin", ...Object.values(user));
    try {
      const { status, response } = await this.transporter.post("/auth/signin", {
        data: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      if (status === 200) {
        return { status, response };
      }

      if (status === 400 || status === 401) return { status, reason: response.reason };
      return { status: 0 };
    } catch (e) {
      console.error(e);
    }
    return { status: 0 };
  }

  public async logout() {
    console.log("authAPI: logout");
    try {
      const { status } = await this.transporter.post("/auth/logout", {
        withCredentials: true,
      });

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
