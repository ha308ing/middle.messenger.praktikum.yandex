import { Input } from "@/components/elements/input";
import { type Indexed } from "@/types/types";

export class InputAvatar extends Input {
  constructor(props?: Indexed) {
    super({
      class: "input__vertical input input_avatar input_file",
      label: "Avatar",
      type: "file",
      name: "avatar",
      placeholder: "Avatar",
      vertical: true,
      ...props,
    });
  }
}
