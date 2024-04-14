import { Block } from "@/system/block";
import { ThreadMember } from "../../../threadMember";
import type { ThreadMemberProps } from "../../../threadMember";

type ThreadMembersListProps = {
  members: ThreadMemberProps[];
};

const defaultProps: ThreadMembersListProps = {
  members: [],
};

const memberDefaultProps = {
  isMember: true,
};

export class ThreadMembersList extends Block {
  constructor(props = defaultProps) {
    super("ul", { class: "threadMembersList", settings: { withInternalId: true } });

    this.lists.Members = props.members.map((u: ThreadMemberProps) => new ThreadMember({ ...u, ...memberDefaultProps }));
  }

  componentDidUpdate() {
    this.lists.Members = this.props.members.map(
      (u: ThreadMemberProps) => new ThreadMember({ ...u, ...memberDefaultProps })
    );
    this.lists.Members.forEach(m => {
      m.dispatchComponentDidMount();
    });
    return true;
  }

  render() {
    return this.compile(`{{{Members}}}`, {
      Members: this.lists.Members,
    });
  }
}
