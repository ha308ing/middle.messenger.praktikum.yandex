import Input from "@/components/elements/input";

export default class InputAvatar extends Input {
  constructor(props?: Record<string, any>) {
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
