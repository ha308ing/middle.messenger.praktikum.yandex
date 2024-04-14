import { Input } from "@/components/elements/input";
import { type Indexed } from "@/types/types";

export class InputAvatar extends Input {
  constructor(props?: Indexed) {
    super({
      // class: "input__horizontal",
      // label: "Avatar",
      type: "file",
      name: "avatar",
      placeholder: "Avatar",
      vertical: false,
      class: "input input_file",
      ...props,
    });
  }
}
