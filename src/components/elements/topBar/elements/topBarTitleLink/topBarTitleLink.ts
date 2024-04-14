import { Block } from "@/system/block";

type TopBarTitleLinkProps = {
  content?: unknown;
};

export class TopBarTitleLink extends Block<TopBarTitleLinkProps> {
  constructor(props: TopBarTitleLinkProps) {
    super("div", { ...props, content: props.content ?? "no content", class: "topBar__titleLink" });
  }

  render() {
    const template = "{{{content}}}";
    return this.compile(template, this.props);
  }
}
