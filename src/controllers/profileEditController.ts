import ProfileEditAPI from "@/api/profileEditAPI";
import UserInfoController from "@/controllers/userInfoController";
import { type User } from "@/types/types.api";

export class ProfileEditController {
  public async sendForm(profileEditInput: User) {
    if (profileEditInput == null) {
      return;
    }
    const { avatar, ...details } = profileEditInput;

    const responseDetails = await ProfileEditAPI.sendDetails(details);
    let responseAvatar = true;
    if (avatar[0] != null) {
      const avatarFormData = new FormData();
      avatarFormData.set("avatar", avatar[0]);

      responseAvatar = await ProfileEditAPI.sendAvatar(avatarFormData);
    }

    if (responseDetails != null && responseAvatar != null) {
      alert("Ok");
      UserInfoController.isLogged();
    } else if (responseAvatar == null) {
      alert("Avatar upload failed");
    } else {
      alert("Info edit failed");
    }
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
