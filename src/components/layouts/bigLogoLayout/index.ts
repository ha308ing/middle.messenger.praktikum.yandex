import bigLogoLayoutTemplateString from "./bigLogoLayout.hbs?raw";
import Component from "@/system/component";
import "./bigLogoLayout.scss";
import Logo from "@/components/elements/logo";

type BigLogoLayoutComponentProps = {
  Logo: Logo;
  content: unknown;
};

type BigLogoLayoutProps = {
  content: unknown;
};

export default class BigLogoLayout extends Component<BigLogoLayoutComponentProps> {
  constructor(props: BigLogoLayoutProps) {
    super(
      "article",
      {
        Logo: new Logo(),
        content: props.content ?? "no content",
      },
      "bigLogoLayout"
    );
  }

  protected _setTemplate(): string | null {
    return bigLogoLayoutTemplateString.trim();
  }
}
