import Component from "@/system/component";
import threadManageTemplateString from "./ThreadManageLayout.hbs?raw";
import "./ThreadManageLayout.scss";
import ThreadMember from "../ThreadMember";
import Button from "@/components/elements/button";
import type Form from "@/components/elements/form";
import store, { StoreEvents } from "@/system/store";
import FindUserForm from "./components/FindUserForm";
import AvatarForm from "./components/AvatarForm";
import ThreadTitleForm from "./components/ThreadTitleForm";
import ThreadController from "@/controllers/threadsController";
import ThreadMembersListConnected, { type ThreadMembersList } from "./components/ThreadMembersList";
import { type User } from "@/types/types.api";

class ButtonLeaveThread extends Button {
  constructor() {
    super(
      {
        buttonText: "Delete thread",
        click: () => {
          const { activeThread } = store.getState();
          if (activeThread == null) {
            console.error("Failed to leave the thread. No active thread in the store");
            return;
          }
          ThreadController.removeThread(activeThread);
        },
      },
      "button button__leaveThread"
    );
  }
}

type ThreadManageLayoutComponentProps = {
  ThreadTitleForm?: Form;
  FindUserForm?: Form;
  AvatarForm?: Form;
  ThreadMembers?: ThreadMembersList | false;
  FoundUsers?: ThreadMember[] | false;
  ButtonLeaveThread?: Button;
};

type ThreadManageLayoutProps = {
  ThreadMembers?: ThreadMember[] | false;
  FoundUsers?: ThreadMember[] | false;
};

export default class ThreadManageLayout extends Component<ThreadManageLayoutComponentProps> {
  constructor(props: ThreadManageLayoutProps) {
    super(
      "section",
      {
        ThreadMembers: new ThreadMembersListConnected(),
        FoundUsers: props.FoundUsers ?? false,
        ThreadTitleForm: new ThreadTitleForm(),
        FindUserForm: new FindUserForm(),
        AvatarForm: new AvatarForm(),
        ButtonLeaveThread: new ButtonLeaveThread(),
      },
      "threadManage"
    );

    store.on(StoreEvents.findUsers, foundUsers => {
      if (foundUsers == null || foundUsers?.length === 0) {
        this.setProps({ FoundUsers: false });
      }
      const FoundUsers =
        foundUsers != null
          ? foundUsers.map(
              (t: User) =>
                new ThreadMember({
                  id: t.id,
                  login: t.login,
                  avatar: t.avatar,
                  isMember: false,
                  isCurrentUser: t.id === store.get("user.id"),
                  isAdmin: t.role === "admin",
                })
            )
          : false;
      if (FoundUsers.length === 0) {
        this.setProps({ FoundUsers: false });
      } else {
        this.setProps({ FoundUsers });
      }
    });

    store.on(StoreEvents.updateUsers, threadMembers => {
      if ((Array.isArray(threadMembers) && threadMembers?.length === 0) || threadMembers === true) {
        this.setProps({});
        return;
      }
      const ThreadMembers =
        threadMembers != null
          ? threadMembers.map((t: User) => {
              return new ThreadMember({
                id: t.id,
                login: t.login,
                avatar: t.avatar,
                isMember: true,
                isCurrentUser: t.id === store.get("user.id"),
                isAdmin: t.role === "admin",
              });
            })
          : false;

      this.setProps({ ThreadMembers, FoundUsers: false });
    });

    store.emit(StoreEvents.updateUsers);

    if (store.getState().activeThread?.id != null) {
      ThreadController.getThreadUsers(store.get("activeThread")).then(r => {
        store.emit(StoreEvents.updateUsers, r);
      });
    }
  }

  protected _setTemplate(): string {
    return threadManageTemplateString.trim();
  }
}

/* const ThreadFoundUsers = connect<ThreadManageLayoutProps, typeof ThreadManageLayout_>(state => {
  const threadMemebers = state.threadMemebers

  const ThreadMembers = threadMemebers != null ? threadMemebers.map(t => new ThreadMember({ id: t.id, login: t.login, avatar: t.avatar, isMember: true })) : false;
  return { ThreadMembers }
})(ThreadManageLayout_)


export default ThreadFoundUsers
 */
