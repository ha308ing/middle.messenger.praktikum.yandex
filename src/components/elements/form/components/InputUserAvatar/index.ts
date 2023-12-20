import Input from "@/components/elements/input";
import { type Indexed } from "@/types/types";

export default class InputAvatar extends Input {
  constructor(props?: Indexed) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "Avatar",
        type: "file",
        name: "avatar",
        placeholder: "Avatar",
        vertical: true,
        ...props,
      },
      "input input_avatar input_file"
    );
  }
}
