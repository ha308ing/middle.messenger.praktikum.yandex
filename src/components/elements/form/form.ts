import formTemplateString from "./form.hbs?raw";
import { formDefaultEvents } from "./formDefaultEvents";
import type { Input } from "@/components/elements/input";
import type { Button } from "@/components/elements/button";
import { Block } from "@/system/block";

export type FormProps = {
  inputs?: Array<Input | boolean>;
  submitter?: (args_: any) => any;
  submit_capture?: (args_: any) => any;
  input_capture?: (args_: any) => any;
  change_capture?: (args_: any) => any;
  blur_capture?: (args_: any) => any;
  buttons?: Button[];
  editMode?: boolean;
  class?: string;
};

export class Form extends Block<FormProps> {
  constructor(props: FormProps = {}) {
    super("form", {
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
      settings: { withInternalId: true },
    });
  }

  render() {
    return this.compile(formTemplateString.trim(), {
      // ...this.props,
      inputs: this.lists?.inputs,
      buttons: this.lists?.buttons,
    });
  }
}
