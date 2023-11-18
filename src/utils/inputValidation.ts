import inputValidator from "./inputValidator";

export function inputValidate(input: HTMLInputElement, allowEmpty: boolean = true) {
  const inputName = input.getAttribute("name");
  if (inputName === null) throw new Error(`input validator: input name is not present`);

  let isValid = inputValidator[inputName](input.value);
  if (allowEmpty) {
    isValid = isValid || input.value.length === 0;
  } else {
    isValid = isValid && input.value.length > 0;
  }

  return isValid;
}
