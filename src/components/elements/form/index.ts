import Component from "@/system/component";
import formTemplateString from "./form.hbs?raw";
import { formDefaultEvents } from "./formDefaultEvents";
import type Input from "@/components/elements/input";
import type Button from "@/components/elements/button";

export type FormProps = {
  inputs?: Array<Input | boolean>;
  submitter?: (args_: any) => any;
  submit_capture?: (args_: any) => any;
  input_capture?: (args_: any) => any;
  change_capture?: (args_: any) => any;
  blur_capture?: (args_: any) => any;
  buttons?: Button[];
  editMode?: boolean;
};

export default class Form extends Component<FormProps> {
  constructor(props: FormProps = {}, persistClass = "") {
    super(
      "form",
      {
        ...formDefaultEvents,
        ...props,
        submit_capture:
          props.submitter != null
            ? (event: Event) => {
                const formValue = formDefaultEvents.submit_capture(event);
                if (props.submitter != null) {
                  props.submitter(formValue);
                }
              }
            : formDefaultEvents.submit_capture,
      },
      persistClass
    );
  }

  protected _setTemplate(): string {
    return formTemplateString.trim();
  }
}
