import { BaseAPI } from "@/api/baseAPI";
import { type User } from "@/types/types.api";

class UsersAPI extends BaseAPI {
  public async getInfoById(id: number): Promise<User | null> {
    try {
      const { status, response } = await this.transporter.get(`/user/${id}`);
      if (status === 200) {
        return response;
      }
      const { reason } = response;
      const isFailed = status === 400 || status === 401 || status >= 500;
      if (isFailed) throw new Error(`${status}: ${reason}`);
    } catch (e) {
      console.error("UsersAPI: getInfoById failed");
      console.error(e);
    }
    return null;
  }

  public async findUsers(login: string) {
    try {
      const { status, response } = await this.transporter.post("/user/search", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ login }),
      });
      if (status === 200) return response;
      throw new Error(`${status}: ${response.reason}`);
    } catch (e) {
      console.error(`UsersAPI: findUsers failed`);
      console.error(e);
    }
    return false;
  }
}

export default new UsersAPI();
