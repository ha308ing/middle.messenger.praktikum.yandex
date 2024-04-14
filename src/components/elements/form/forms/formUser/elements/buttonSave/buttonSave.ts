import { Button } from "@/components/elements/button";

export class ButtonSave extends Button {
  constructor() {
    super({ buttonText: "Save", type: "submit", class: "button button_save button_saveProfile button_submit" });
  }
}
