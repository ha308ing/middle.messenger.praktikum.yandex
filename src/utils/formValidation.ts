import inputValidator from "./inputValidation";

const inputParentClass = "inputText";
const inputParentClassInvalid = "inputText__invalid";
const buttonClass = "button_submit";
const buttonClassDisabled = "button__disabled";

/*
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const formValidate = _formValidate(form)
  if(form !== null) buttonValidate(form)

  form?.addEventListener(
    "blur",
    (event:Event) => {
      const inputField = event.target;
      if (inputField === null) throw new Error('form blur: no target on event')
      formValidate(event);

      inputField.addEventListener("input", (event:Event) => {
        formValidate(event)
      });

      inputField.addEventListener("focus", (event:Event) => {
        formValidate(event)
      });

    },
    true
  );
});
*/

function inputValidate(input: HTMLInputElement, allowEmpty: boolean = true) {
  const inputName = input.getAttribute("name");
  if (inputName === null) throw new Error(`input validator: input name is not present`);

  let isValid = inputValidator[inputName](input.value);
  if (allowEmpty) {
    isValid = isValid || input.value.length === 0;
  }

  return isValid;
}

function inputToggleInvalid(input: Element, enable = true) {
  const inputParentElement = input?.parentElement;
  if (inputParentElement === null) return;
  if (enable) {
    inputParentElement.classList.remove(inputParentClassInvalid);
  } else {
    inputParentElement.classList.add(inputParentClassInvalid);
  }
}

function buttonToggleDisable(form: HTMLFormElement, enable = true) {
  const submitButton = form?.querySelector(`.${buttonClass}`);
  if (submitButton == null) return;
  if (enable) {
    submitButton.classList.remove(buttonClassDisabled);
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.classList.add(buttonClassDisabled);
    submitButton.setAttribute("disabled", "disabled");
  }
}

export function buttonValidate(form: HTMLFormElement | null) {
  if (form === null) throw new Error("buttonValidate: form not found");
  if (form?.querySelectorAll(`div.${inputParentClass}.${inputParentClassInvalid}`)?.length > 0) {
    buttonToggleDisable(form, false);
  } else {
    buttonToggleDisable(form, true);
  }
}

export function _formValidate(form: HTMLFormElement | null) {
  if (form === null) throw new Error("_formValidate: form not found");
  return function (event: Event, allowEmpty = true) {
    const inputField = event.target;
    if (!(inputField instanceof HTMLInputElement)) return;

    const isValid = inputValidate(inputField, allowEmpty);
    inputToggleInvalid(inputField, isValid);

    buttonValidate(form);
  };
}

export function formValidator(form: HTMLFormElement) {
  const formValidate = _formValidate(form);
  buttonValidate(form);

  form?.addEventListener(
    "blur",
    (event: Event) => {
      const inputField = event.target;
      if (inputField === null) throw new Error("form blur: no target on event");
      formValidate(event);

      inputField.addEventListener("input", (event: Event) => {
        formValidate(event, false);
      });

      inputField.addEventListener("focus", (event: Event) => {
        if (event.target === null) return;
        if ((inputField as HTMLInputElement).getAttribute("readonly") !== null) formValidate(event, false);
      });
    },
    true
  );
}

export function submitValidate(form: HTMLFormElement | null) {
  if (form === null) throw new Error(`sumbit validate: form not found`);
  const buttonSubmit = form.querySelector(`.${buttonClass}`);
  if (buttonSubmit === null) throw new Error(`sumbit validate: submit button not found`);

  if (form.querySelectorAll(`div.${inputParentClass}.${inputParentClassInvalid}`)?.length > 0)
    return {
      valid: false,
      result: {},
    };

  const inputs: HTMLInputElement[] = Array.from(form.querySelectorAll("input:not([readonly ])"));
  if (inputs === null) throw new Error(`sumbit validate: no inputs on the form`);

  const isValid = inputs.reduce(
    (acc: { valid: boolean; result: Record<string, string> }, input) => {
      acc.valid = acc.valid && inputValidate(input, false);
      const key = input.getAttribute("name");
      if (key === null) throw new Error("input has no name attribute");
      const value = input.value;
      acc.result[key] = value;
      return acc;
    },
    { valid: true, result: {} }
  );

  return isValid;
}
