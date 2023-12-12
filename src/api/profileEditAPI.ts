import { BaseAPI } from "@/api/baseAPI";
import { type UserDetails } from "@/types/types.api";

class ProfileEditAPI extends BaseAPI {
  public async sendDetails(detailsInput: UserDetails) {
    try {
      const request = await this.transporter.put("/user/profile", {
        data: JSON.stringify(detailsInput),
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const { status, response } = request;

      if (status === 200) {
        return JSON.parse(response);
      }

      throw new Error(`Send user detailes failed ${JSON.parse(response).reason}`);
    } catch (e) {
      alert(e);
    }
    return null;
  }

  public async sendAvatar(avatarFormData: FormData) {
    try {
      const request = await this.transporter.put("/user/profile/avatar", {
        data: avatarFormData,
        withCredentials: true,
      });

      const { status, response } = request;
      if (status === 200) {
        return JSON.parse(response);
      }
      throw new Error(`Avatar upload failed ${JSON.parse(response).reason}`);
    } catch (e) {
      alert(e);
    }

    return null;
  }

  public async changePassword(passwordChangeInput: { oldPassword: string; newPassword: string }) {
    try {
      const request = await this.transporter.put("/user/password", {
        data: JSON.stringify(passwordChangeInput),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const { status } = request;
      if (status === 200) return true;
    } catch (e) {
      console.error("ProfileEditAPI passowrd change failed");
      console.error(e);
    }
    return true;
  }
}

export default new ProfileEditAPI();
