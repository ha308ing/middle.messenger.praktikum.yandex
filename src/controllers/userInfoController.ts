import STORE from "@/system/store";
import AuthAPI from "@/api/authAPI";
import avatarFix from "@/utils/avatarFix";

export class UserInfoController {
  public async isLogged() {
    const { status, response } = await AuthAPI.isLogged();
    if (status !== 200) return false;

    const avatar = response.avatar;
    response.avatar = avatarFix(avatar);
    STORE.set("user", response);

    return true;
  }

  public isCurrent() {
    const { user, target_user } = STORE.getState();
    return user.id === target_user.id;
  }
}

export default new UserInfoController();
