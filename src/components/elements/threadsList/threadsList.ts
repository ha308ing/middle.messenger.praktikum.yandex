import "./threadsList.scss";
import { Block } from "@/system/block";
import { ThreadListItem } from "./elements/threadListItem";
import type { Thread } from "@/types/types.api";

const template = `
{{#if Threads}}
<ul class="threadList">
  {{{Threads}}}
</ul>
{{else}}
  <pre>no threads</pre>
{{/if}}`;

type ThreadsListProps = {
  threads: Thread[];
};

const defaultProps: ThreadsListProps = {
  threads: [],
};

export class ThreadsList extends Block<ThreadsListProps> {
  constructor(props: ThreadsListProps = defaultProps) {
    super("div", {
      class: "threadsListContainer",
      threads: props.threads,
    });

    this.lists.Threads = props.threads.map(t => new ThreadListItem(t));
  }

  componentDidUpdate() {
    this.lists.Threads = this.props.threads.map((t: Thread) => new ThreadListItem(t));
    return true;
  }

  render() {
    return this.compile(template, {
      Threads: this.lists.Threads,
    });
  }
}
