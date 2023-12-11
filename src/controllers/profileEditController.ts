// import LoginAPI from "@/api/loginAPI";
import STORE from "@/system/store";
// import AuthAPI from "@/api/authAPI";
import ProfileEditAPI from "@/api/profileEditAPI";
import UserInfoController from "@/controllers/userInfoController";
import { EditModeBus, EditModeBusEvents } from "@/components/elements/form/components/FormUser";
import { type UserInfo } from "@/types/types.api";

export class ProfileEditController {
  public async sendForm(profileEditInput: UserInfo) {
    if (profileEditInput == null) {
      return;
    }
    const { avatar, ...details } = profileEditInput;

    const sendDetails = await ProfileEditAPI.sendDetails(details);

    if (avatar[0] != null) {
      const avatarFormData = new FormData();
      avatarFormData.set("avatar", avatar[0]);

      const sendAvatar = await ProfileEditAPI.sendAvatar(avatarFormData);

      console.log(sendAvatar);
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

  public toggleEditMode() {
    EditModeBus.emit(EditModeBusEvents.toggleEditMode);
  }
}

export default new ProfileEditController();