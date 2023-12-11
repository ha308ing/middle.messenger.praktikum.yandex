import Component from "@/system/component";
import connect from "@/system/storeConnector";

type LoginProps = {
  login?: string;
};

export class Login extends Component<LoginProps> {
  constructor(props?: LoginProps) {
    super("h3", { login: props?.login ?? "Sweater" }, "heading_login");
  }

  protected _setTemplate(): string | null {
    return "{{login}}";
  }
}

export const LoginUserConnected = connect<typeof Login, LoginProps>(state => {
  const value = state.user?.login ?? "Sweater";
  return {
    login: value,
  };
})(Login);

export const LoginProfileConnected = connect<typeof Login, LoginProps>(state => {
  const value = state.target_user?.login ?? "Sweater";
  return {
    login: value,
  };
})(Login);
