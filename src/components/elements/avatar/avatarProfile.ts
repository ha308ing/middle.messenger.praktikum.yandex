import { Avatar } from "./avatar";
import type { AvatarProps } from "./avatar";

const avatarProfileClassName = "avatar_profile";

export class AvatarProfile extends Avatar {
  constructor(props?: AvatarProps) {
    super(props, avatarProfileClassName);
  }
}
