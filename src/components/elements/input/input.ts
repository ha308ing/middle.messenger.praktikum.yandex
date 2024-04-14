import template from "./input.hbs?raw";
import "./input.scss";
import { Block } from "@/system/block";

export type InputValueStringProp = {
  value?: string | number | false;
  readonly?: boolean;
  disabled?: boolean;
};

export type InputProps = {
  id?: string;
  class?: string;
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  vertical?: boolean;
  readonly?: boolean;
  value?: string | number | false;
  style?: string;
  disabled?: boolean;
};

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super("div", { settings: { withInternalId: true }, ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
