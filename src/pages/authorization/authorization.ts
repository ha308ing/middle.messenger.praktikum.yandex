import inputValidator from "../../utils/inputValidation";

document.addEventListener("DOMContentLoaded", () => {
  const inputs = ["login", "password"];

  inputs.forEach(input => {
    inputValidate(input);
  });
});

function inputValidate(inputName: string) {
  const input: HTMLInputElement | null = document.querySelector(`input.inputText_input[name=${inputName}]`);
  if (input === null) return null;
  const inputParentElement = input?.parentElement;
  if (inputParentElement === null) return null;

  input.addEventListener("blur", () => {
    const isValid = inputValidator[inputName](input.value);
    console.log(`${inputName} is valid: ${isValid}`);
    if (!isValid && input.value.length > 0) {
      inputParentElement.classList.add("inputText__invalid");
    }
  });

  input.addEventListener("input", () => {
    inputParentElement.classList.remove("inputText__invalid");
  });
  return 0;
}
