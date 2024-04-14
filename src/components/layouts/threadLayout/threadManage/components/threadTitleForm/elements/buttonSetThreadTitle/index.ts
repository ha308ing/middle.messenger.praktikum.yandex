import { Button } from "@/components/elements/button";

export class ButtonSetThreadTitle extends Button {
  constructor() {
    super({
      class: "button button_threadTitle button_submit",
      buttonText: "Set title",
      type: "submit",
    });
  }
}
