import "./logo.scss";
import template from "./logo.hbs?raw";
import { Block } from "@/system/block";
import { brandImage as logoUrl, brandTitle as logoText, brandName as logoAlt } from "@/system/consts";

const logoClassName = "logo";

type LogoProps = {
  src?: string;
  alt?: string;
  logoText?: string;
  class?: string;
};

const defaultProps = {
  src: logoUrl,
  alt: logoAlt,
  logoText,
  class: logoClassName,
};

export class Logo extends Block<LogoProps> {
  constructor(props: LogoProps = defaultProps) {
    super("div", {
      ...props,
      class: defaultProps.class + " " + (props?.class ?? ""),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
