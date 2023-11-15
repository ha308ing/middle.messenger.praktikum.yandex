document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".inputText_input");

  const removeInvalidClass = (input: HTMLElement) => {
    const inputParent = input.parentElement;
    if (inputParent == null) return;
    const inputParentClassList = inputParent.classList;
    if (inputParentClassList.contains("inputText__invalid")) {
      inputParentClassList.remove("inputText__invalid");
    }
  };

  inputs.forEach(input => {
    if (!(input instanceof HTMLElement)) return;
    input.addEventListener("input", () => {
      removeInvalidClass(input);
    });
  });
});
