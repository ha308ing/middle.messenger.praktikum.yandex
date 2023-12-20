import Form from "@/components/elements/form";
import { InputProfileLogin } from "../InputUserLogin";
import { InputProfilePhone } from "../InputUserPhone";
import { InputProfileEmail } from "../InputUserEmail";
import { InputProfileFirstName } from "../InputUserFirstName";
import { InputProfileDisplayName } from "../InputUserDisplayName";
import { InputProfileSecondName } from "../InputUserSecondName";

export default class FormProfile extends Form {
  constructor() {
    super(
      {
        inputs: [
          new InputProfileLogin(),
          new InputProfileEmail(),
          new InputProfilePhone(),
          new InputProfileDisplayName(),
          new InputProfileFirstName(),
          new InputProfileSecondName(),
        ],
        buttons: [],
      },
      "form_profileEdit"
    );
  }
}
