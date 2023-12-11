import { inputValidate } from "@/utils/inputValidation";

export const formDefaultEvents = {
  blur_capture: function (event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;
    const { input, inputParent, submit } = getFormElements(event);

    const isValid = inputValidate(input);

    if (!isValid) {
      inputParent.classList.add("input__invalid");
      submit.setAttribute("disabled", "disabled");
    }
  },
  change_capture: function (event: Event) {
    const { input, inputParent, submit } = getFormElements(event);
    const isValid = inputValidate(input);

    if (!isValid) {
      inputParent.classList.add("input__invalid");
      submit.setAttribute("disabled", "disabled");
    }
  },
  input_capture: (event: Event) => {
    const { input, form, inputParent, submit } = getFormElements(event);

    inputParent.classList.remove("input__invalid");

    const isValid = inputValidate(input);
    if (isValid) {
      inputParent.classList.remove("input__invalid");
    }
    if (validateForm(form)) {
      submit.removeAttribute("disabled");
    }
  },
  submit_capture: (event: Event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const form = event.currentTarget as HTMLFormElement;
    if (form == null) throw new Error(`submit values: no form is found`);

    const isFormValid = validateForm(form);
    console.log(`form is valid: ${isFormValid}`);

    if (!isFormValid) {
      alert("form is not valid");
      return;
    }

    const formValues = getFormValues(form);
    console.log(formValues);
    return formValues;
  },
};

interface FormElement {
  form: HTMLFormElement;
  input: HTMLInputElement;
  inputParent: HTMLElement;
  submit: HTMLButtonElement;
}

function getFormElements(event: Event): FormElement {
  const form = event.currentTarget as HTMLFormElement;
  if (form == null) throw new Error("form blur: form not found");

  const input = event.target as HTMLInputElement;
  if (input == null) throw new Error("form blur: no target on event");

  const inputParent = input.parentElement;
  if (inputParent == null) throw new Error("form blur: parent div not found");

  const submit = form.querySelector(".button_submit") as HTMLButtonElement;
  if (submit == null) throw new Error("form blur: submit button not found");

  return { form, input, inputParent, submit };
}

function getFormValues(form: HTMLFormElement) {
  return Array.from(form.querySelectorAll("input")).reduce((result, input): Record<string, string> => {
    const inputName = input.getAttribute("name");
    if (inputName == null) throw new Error(`get form values: no name attribute`);
    return { ...result, [inputName]: input.type !== "file" ? input.value : input.files };
  }, {});
}

function validateForm(form: HTMLFormElement) {
  const res = Array.from(form.querySelectorAll("input")).reduce((result, input): boolean => {
    const isFile = input.getAttribute("type") === "file";
    const isInputValid = inputValidate(input, false || isFile);
    if (input.value == null || (input.value.length === 0 && !isFile)) return false;
    result = result && isInputValid;
    return result;
  }, true);
  return res;
}
