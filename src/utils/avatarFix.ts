import sweater from "@/assets/sweater.png";
import { type Indexed } from "@/types/types";

const avatarFix = (avatar: null | string): string =>
  avatar == null ? sweater : `https://ya-praktikum.tech/api/v2/resources/${avatar}`;

export const avatarFixObj = (data: Indexed): Indexed => {
  let { avatar, ...others } = data;
  avatar = avatarFix(avatar as string);
  return { avatar, ...others };
};

export default avatarFix;
