import { BaseAPI } from "@/api/baseAPI";
import { type User } from "@/types/types.api";

class UsersAPI extends BaseAPI {
  public async getInfoById(id: number): Promise<User | null> {
    try {
      const request = await this.transporter.get(`/user/${id}`);
      const { status, response } = request;
      const responseJson = JSON.parse(response);
      if (status === 200) {
        return responseJson;
      }
      const { reason } = responseJson;
      const isFailed = status === 400 || status === 401 || status >= 500;
      if (isFailed) throw new Error(`${status}: ${reason}`);
    } catch (e) {
      console.error("UsersAPI: getInfoById failed");
      console.error(e);
    }
    console.log("end");
    return null;
  }

  public async findUsers(login: string) {
    console.log("UsersAPI: findUsers", login);
    try {
      const request = await this.transporter.post("/user/search", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ login }),
      });
      const { status, response } = request;
      if (status === 200) return JSON.parse(response);
      throw new Error(`${status}: ${response.reason}`);
    } catch (e) {
      console.error(`UsersAPI: findUsers failed`);
      console.error(e);
    }
    console.log("end");
    return false;
  }
}

export default new UsersAPI();
