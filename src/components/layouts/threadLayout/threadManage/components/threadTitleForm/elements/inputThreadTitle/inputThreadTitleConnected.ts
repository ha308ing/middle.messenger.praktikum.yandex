import { storeConnector } from "@/system/storeConnector";
import { InputThreadTitle } from "./inputThreadTitle";
import type { InputThreadTitleProps } from "./inputThreadTitle";
import { defaultThread } from "@/system/consts";

export const InputThreadTitleConnected = storeConnector<typeof InputThreadTitle, InputThreadTitleProps>(state => {
  const activeThread = state?.activeThread;
  if (activeThread == null) return {};
  const value = state.threads_[activeThread].title ?? defaultThread;
  return {
    value,
  };
})(InputThreadTitle);
