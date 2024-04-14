import bigLogoLayoutTemplateString from "./bigLogoLayout.hbs?raw";
import "./bigLogoLayout.scss";
import { Logo } from "@/components/elements/logo";
import { Block } from "@/system/block";

type BigLogoLayoutComponentProps = {
  content: Array<Block | string>;
};

export class BigLogoLayout extends Block<BigLogoLayoutComponentProps> {
  constructor() {
    super("article", {
      class: "bigLogoLayout",
    });

    this.children.Logo = new Logo();
  }

  render() {
    return this.compile(bigLogoLayoutTemplateString.trim(), {
      Logo: this.children.Logo,
      content: this.lists?.content ?? "no content",
    });
  }
}
