import store from "@/system/store";
import ThreadController from "@/controllers/threadsController";
import { Button } from "@/components/elements/button";

export class ButtonLeaveThread extends Button {
  constructor() {
    super({
      buttonText: "Delete thread",
      click: () => {
        const { activeThread } = store.getState();
        if (activeThread == null) {
          console.error("Failed to leave the thread. No active thread in the store");
          return;
        }
        ThreadController.removeThread(activeThread);
      },
      class: "button button__leaveThread",
    });
  }
}
