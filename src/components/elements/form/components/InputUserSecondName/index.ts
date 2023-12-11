import Input, { type InputValueStringProp } from "@/components/elements/input";
import connect from "@/system/storeConnector";
import { EditModeBus, EditModeBusEvents } from "../FormUser";

export class InputUserSecondName_ extends Input {
  constructor(props: InputValueStringProp = { value: false, disabled: false }) {
    super(
      "div",
      {
        class: "input__vertical",
        label: "Second name",
        type: "text",
        name: "second_name",
        placeholder: "Second name",
        vertical: true,
        value: props.value,
        readonly: props.readonly,
        disabled: props.disabled,
      },
      "input input_secondName"
    );

    EditModeBus.on(EditModeBusEvents.toggleEditMode, value => {
      this.setProps({ readonly: value });
    });
  }
}

export const InputUserSecondName = connect<typeof InputUserSecondName_, InputValueStringProp>(state => {
  const value = state.user?.second_name ?? false;
  return {
    value,
    readonly: EditModeBus.enable,
  };
})(InputUserSecondName_);

export const InputProfileSecondName = connect<typeof InputUserSecondName_, InputValueStringProp>(state => {
  const value = state.target_user?.second_name ?? false;
  return {
    value,
    readonly: true,
    disabled: value === false,
  };
})(InputUserSecondName_);
