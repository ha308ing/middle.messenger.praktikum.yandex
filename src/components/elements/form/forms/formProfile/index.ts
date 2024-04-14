import { Form } from "@/components/elements/form";
import {
  InputProfileLoginConnected,
  InputProfileEmailConnected,
  InputProfilePhoneConnected,
  InputProfileDisplayNameConnected,
  InputProfileFirstNameConnected,
  InputProfileSecondNameConnected,
} from "../../inputs";

export class FormProfile extends Form {
  constructor() {
    super({ class: "form form_profileEdit" });

    this.lists.inputs = [
      new InputProfileLoginConnected(),
      new InputProfileEmailConnected(),
      new InputProfilePhoneConnected(),
      new InputProfileDisplayNameConnected(),
      new InputProfileFirstNameConnected(),
      new InputProfileSecondNameConnected(),
    ];
  }
}
