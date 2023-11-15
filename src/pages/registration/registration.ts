document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".inputText_input");

  const removeInvalidClass = (input: HTMLElement) => {
    let inputParent;
    if (!(inputParent = input.parentElement)) return;
    if (inputParent.classList.contains("inputText__invalid")) {
      inputParent.classList.remove("inputText__invalid");
    }
  };

  inputs.forEach((input) => {
    if (!(input instanceof HTMLElement)) return;
    input.addEventListener("input", () => removeInvalidClass(input));
  });
});
