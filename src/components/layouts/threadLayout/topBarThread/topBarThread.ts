import type { IconButton } from "@/components/elements/iconButton";
import { IconButtonBack } from "@/components/elements/iconButton";
import "./topBarThread.scss";
import { type TopBarThreadLink } from "../topBarThreadLink";
import { type TopBarTitleLink } from "@/components/elements/topBar";
import { Block } from "@/system/block";

export type TopBarThreadProps = {
  backButton?: IconButton;
  TopBarLink?: TopBarThreadLink | TopBarTitleLink;
  hidden?: boolean;
  [key: string]: unknown;
  noBackButton: boolean;
};

export class TopBarThread extends Block {
  constructor(props?: TopBarThreadProps) {
    super("nav", {
      settings: { withInternalId: true },
      hidden: false,
      class: "topBar",
      ...props,
    });

    const iconBackButtonStyle = props?.noBackButton != null ? "visibility:hidden" : "visibility:initial";
    this.children.backButton = new IconButtonBack({ style: iconBackButtonStyle });
  }

  render() {
    const template = `
    {{#unless hidden}}
      {{{backButton}}}
      {{{TopBarLink}}}
    {{/unless}}
    `;
    return this.compile(template, {
      ...this.props,
      backButton: this.children.backButton,
      TopBarLink: this.children?.TopBarLink,
    });
  }
}
