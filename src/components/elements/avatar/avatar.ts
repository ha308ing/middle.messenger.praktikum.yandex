import { Block } from "@/system/block";
import "./avatar.scss";
import { brandImage, brandTitle } from "@/system/consts";

export const avatarUrl = brandImage;
export const avatarAlt = brandTitle;
const avatarClassName = "avatar ";

const defaultProps = {
  src: avatarUrl,
  alt: avatarAlt,
};

export type AvatarProps = {
  src: string;
  alt: string;
};

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps = defaultProps, className = "") {
    super("img", {
      src: props.src,
      alt: props.alt,
      class: avatarClassName + " " + className,
      settings: {
        withInternalId: true,
      },
    });
  }

  render() {
    return this.compile(" ", this.props);
  }
}
