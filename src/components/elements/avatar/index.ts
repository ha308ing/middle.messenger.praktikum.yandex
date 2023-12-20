import Component from "@/system/component";
import sweater from "@/assets/sweater.png";
import "./avatar.scss";

export type AvatarProps = {
  src?: string;
  alt?: string;
};

export default class Avatar extends Component<AvatarProps> {
  constructor(props?: AvatarProps, persistClass: string = "") {
    super("img", { src: props?.src ?? sweater, alt: props?.alt ?? "Sweater" }, `avatar ${persistClass}`);
  }

  _setTemplate() {
    return " ";
  }
}

function classifiedAvatar(className: string) {
  return class extends Avatar {
    constructor(props?: AvatarProps) {
      super(props, className);
    }
  };
}

export const AvatarProfile = classifiedAvatar("avatar_profile");
export const AvatarThread = classifiedAvatar("avatar_thread");

/* export class AvatarProfile extends Avatar {
  constructor(props:AvatarProps) {
    super(
      "img",
      "avatar avatar_profile"
    );
  }
}

export class AvatarThread extends Avatar {
  constructor(props: AvatarProps) {
    super(
      "img",
      {
        src: props?.src,
        alt: props?.alt
      },
      "avatar avatar_thread"
    );
  }
} */
