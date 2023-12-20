import { BaseAPI } from "@/api/baseAPI";
import { type SignupObject } from "@/types/types.api";

class RegistrationAPI extends BaseAPI {
  public async register(user: SignupObject) {
    const { status, response } = await this.transporter.post("/auth/signup", {
      data: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    if (status === 200) return "ok";
    throw new Error(response.reason);
  }
}

export default new RegistrationAPI();
