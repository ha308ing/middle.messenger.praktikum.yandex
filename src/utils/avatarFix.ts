import type { Indexed } from "@/types/types";
import { brandImage } from "@/system/consts";

export const avatarFix = (avatar: null | string): string =>
  avatar == null ? brandImage : `https://ya-praktikum.tech/api/v2/resources/${avatar}`;

export const avatarFixObj = (data: Indexed): Indexed => {
  let { avatar, ...others } = data;
  avatar = avatarFix(avatar as string);
  return { avatar, ...others };
};
