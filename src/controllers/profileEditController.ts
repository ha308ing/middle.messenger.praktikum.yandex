import STORE from "@/system/store";
import ProfileEditAPI from "@/api/profileEditAPI";
import UserInfoController from "@/controllers/userInfoController";
import { type User } from "@/types/types.api";

export class ProfileEditController {
  public async sendForm(profileEditInput: User) {
    if (profileEditInput == null) {
      return;
    }
    const { avatar, ...details } = profileEditInput;

    const sendDetails = await ProfileEditAPI.sendDetails(details);
    if (sendDetails == null) alert("Details edit failed");

    if (avatar[0] != null) {
      const avatarFormData = new FormData();
      avatarFormData.set("avatar", avatar[0]);

      const sendAvatar = await ProfileEditAPI.sendAvatar(avatarFormData);
      if (sendAvatar == null) alert("Avatar upload failed");
    }

    if (sendDetails != null) {
      UserInfoController.isLogged();
    }
  }

  public isCurrentUser(): boolean {
    const path = window.location.pathname;

    if (STORE.getState().target_user?.id == null) return true;
    if (STORE.getState().target_user?.id === STORE.getState().user?.id) return true;

    const settingsRegexp = /^\/settings$/;
    if (settingsRegexp.test(path)) return true;
    const currentId = STORE.getState().user.id;
    if (currentId == null) return false;
    const userRegexp = /\/profile\/(\d+)\/?.*$/;
    const targetId = path.match(userRegexp);
    if (targetId == null) return false;
    return currentId === targetId[1];
  }

  public async passwordChange(passwordChangeInput: {
    oldPassword: string;
    newPassword: string;
    repeatPassword: string;
  }) {
    const { oldPassword, newPassword, repeatPassword } = passwordChangeInput;

    if (repeatPassword !== newPassword) {
      alert("Repeat is wrong");
      return;
    }

    const response = await ProfileEditAPI.changePassword({ oldPassword, newPassword });

    if (response) {
      alert("Password has been changed");
    } else {
      alert("Failed to change password");
    }
  }
}

export default new ProfileEditController();
