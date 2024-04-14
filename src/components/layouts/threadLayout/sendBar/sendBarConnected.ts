import "./sendBar.scss";
import { storeConnector } from "@/system/storeConnector";
import { SendBar } from "./sendBar";

export const SendBarConnected = storeConnector<typeof SendBar>(state => {
  const { activeThread } = state;
  if (activeThread == null) {
    return { hidden: true, class: "hidden" };
  } else {
    return { hidden: false, class: "", activeThread };
  }
})(SendBar);
