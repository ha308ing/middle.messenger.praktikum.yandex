import { Avatar } from "./avatar";
import type { AvatarProps } from "./avatar";

const avatarThreadClassName = "avatar_thread";

export class AvatarThread extends Avatar {
  constructor(props?: AvatarProps) {
    super(props, avatarThreadClassName);
  }
}
