import { Block } from "@/system/block";
export type TopBarThreadLinkProps = { avatar?: string; title?: string; click?: (...args: any[]) => any };

export class TopBarThreadLink extends Block {
  constructor(props?: TopBarThreadLinkProps) {
    super("div", {
      ...props,
      class: "topBar topBar__titleLink",
    });
  }

  render() {
    const template = `

    <img src="{{avatar}}" alt="{{title}}" class="avatar avatar_thread">
    <h1>{{title}}</h1>
    `;
    return this.compile(template, this.props);
  }
}
