import Component, { type Props } from "@/system/Component";
import sweaterImage from "@/assets/sweater.png";
import "./avatar.scss";

export default class Avatar extends Component {
  _setTemplate() {
    return " ";
  }
}

export function createAvatarProfile(props: Props = {}, persistClass = "") {
  return new Avatar(
    "img",
    {
      src: sweaterImage,
      class: "avatar avatar_profile",
      ...props,
    },
    persistClass
  );
}

export function createAvatarThread(props: Props = {}, persistClass = "") {
  return new Avatar(
    "img",
    {
      src: sweaterImage,
      class: "avatar avatar_thread",
      ...props,
    },
    persistClass
  );
}
