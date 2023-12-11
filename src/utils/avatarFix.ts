import sweater from "@/assets/sweater.png";

const avatarFix = (avatar: string) =>
  avatar == null ? sweater : `https://ya-praktikum.tech/api/v2/resources/${avatar}`;

export const avatarFixObj = (data: Record<string, any>) => {
  let { avatar, ...others } = data;
  avatar = avatarFix(avatar);
  return { avatar, ...others };
};

export default avatarFix;
