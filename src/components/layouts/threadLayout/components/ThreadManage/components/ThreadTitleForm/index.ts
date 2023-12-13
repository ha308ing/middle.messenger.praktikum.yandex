import Button from "@/components/elements/button";
import Form from "@/components/elements/form";
import Input from "@/components/elements/input";
import connect from "@/system/storeConnector";
import { type Thread } from "@/types/types.api";

type InputThreadTitleProps = {
  value?: string;
};

class InputThreadTitle_ extends Input {
  constructor(props?: InputThreadTitleProps) {
    super(
      "div",
      {
        class: "setTitle",
        type: "text",
        name: "threadTitle",
        placeholder: "Thread title",
        value: "Sweater",
        ...props,
      },
      "titleContainer"
    );
  }
}

const InputThreadTitle = connect<typeof InputThreadTitle_, InputThreadTitleProps>(state => {
  const activeThread = state?.activeThread;
  const value = state.threads[activeThread].title ?? "Sweater";
  return {
    value,
  };
})(InputThreadTitle_);

class ButtonSetThreadTitle extends Button {
  constructor() {
    super({
      class: "button button_threadTitle button_submit",
      buttonText: "Set title",
      type: "submit",
    });
  }
}

export default class ThreadTitleForm extends Form {
  constructor() {
    super(
      {
        inputs: [new InputThreadTitle()],
        buttons: [new ButtonSetThreadTitle()],
        submitter: threadTitle => {
          console.log(threadTitle);
        },
      },
      "form form_threadManage form_setThreadTitle"
    );
  }
}
