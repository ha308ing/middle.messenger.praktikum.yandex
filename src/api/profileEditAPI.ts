import { BaseAPI } from "@/api/baseAPI";
import { type UserDetails } from "@/types/types.api";

class ProfileEditAPI extends BaseAPI {
  public async sendDetails(detailsInput: UserDetails) {
    try {
      const { status, response } = await this.transporter.put("/user/profile", {
        data: JSON.stringify(detailsInput),
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (status === 200) {
        return response;
      }
      throw new Error(`Send user detailes failed ${response.reason}`);
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  public async sendAvatar(avatarFormData: FormData) {
    try {
      const { status, response } = await this.transporter.put("/user/profile/avatar", {
        data: avatarFormData,
        withCredentials: true,
      });
      if (status === 200) {
        return response;
      }
      throw new Error(`Avatar upload failed ${response.reason}`);
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  public async changePassword(passwordChangeInput: { oldPassword: string; newPassword: string }) {
    try {
      const { status } = await this.transporter.put("/user/password", {
        data: JSON.stringify(passwordChangeInput),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (status === 200) return true;
    } catch (e) {
      console.error("ProfileEditAPI passowrd change failed");
      console.error(e);
    }
    return true;
  }
}

export default new ProfileEditAPI();
