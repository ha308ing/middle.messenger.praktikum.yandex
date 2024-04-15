import store from "@/system/store";
import { Block } from "@/system/block";
import template from "./threadListItem.hbs?raw";

type ThreadListItemProps = {
  avatar: string;
  title: string;
  id: number;
  class?: string;
};

export class ThreadListItem extends Block {
  constructor(props?: ThreadListItemProps) {
    super("li", {
      ...props,
      class: "threadListItem" + " " + (props?.class ?? ""),
      "data-threadId": props?.id,
      click: () => {
        store.emit(store.events.clickThread, props?.id);
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
