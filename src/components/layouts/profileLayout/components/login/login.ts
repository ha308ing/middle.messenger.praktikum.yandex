import { Block } from "@/system/block";
import { defaultLogin } from "@/system/consts";

export type LoginProps = {
  login?: string;
};

export class Login extends Block<LoginProps> {
  constructor(props?: LoginProps) {
    super("h3", { login: props?.login ?? defaultLogin, class: "heading_login", settings: { withInternalId: true } });
  }

  render() {
    const template = "{{login}}";
    return this.compile(template, this.props);
  }
}
