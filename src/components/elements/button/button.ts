import "./button.scss";
import { Block } from "@/system/block";

const template = `{{buttonText}}`;

export type ButtonProps = {
  class?: string;
  buttonText?: string;
  type?: string;
  disabled?: boolean;
  click?: (event: Event) => any;
  style?: string;
};

export class Button extends Block<ButtonProps> {
  constructor(props?: ButtonProps) {
    super("button", { settings: { withInternalId: true }, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
