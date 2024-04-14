import { Input } from "@/components/elements/input";
import { defaultThread } from "@/system/consts";

export type InputThreadTitleProps = {
  value?: string;
};

export class InputThreadTitle extends Input {
  constructor(props?: InputThreadTitleProps) {
    super({
      class: "setTitle titleContainer",
      type: "text",
      name: "threadTitle",
      placeholder: "Thread title",
      value: defaultThread,
      ...props,
    });
  }
}
