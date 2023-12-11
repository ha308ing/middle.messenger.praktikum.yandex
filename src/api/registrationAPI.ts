import { BaseAPI } from "@/api/baseAPI";
import { type SignupObject } from "@/types/types.api";

class RegistrationAPI extends BaseAPI {
  public async register(user: SignupObject) {
    const { status, response } = await this.transporter.post("/auth/signup", {
      data: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    if (status === 200) return "ok";
    const { reason } = JSON.parse(response);
    throw new Error(reason);
  }
}

export default new RegistrationAPI();
