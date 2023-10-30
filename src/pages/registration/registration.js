document.addEventListener("DOMContentLoaded", () => {
  const button__next = document.querySelector(".button__next");
  const inputs = document.querySelectorAll(".inputText_input");

  const removeInvalidClass = (input) => {
    let inputParent;
    if (!(inputParent = input.parentElement)) return;
    if (inputParent.classList.contains("inputText__invalid")) {
      inputParent.classList.remove("inputText__invalid");
    }
  };

  inputs.forEach((input) =>
    input.addEventListener("input", () => removeInvalidClass(input))
  );

  const inputText_login_input = document.querySelector(
    ".inputText_login>.inputText_input"
  );

  const registration_inputs__first = document.querySelector(
    ".registration_inputs__first"
  );

  const registration_inputs__last = document.querySelector(
    ".registration_inputs__last"
  );

  const checkInputs = () => {
    if (inputText_login_input.value === "wrong login")
      return { passed: false, element: inputText_login_input.parentElement };
    return { passed: true };
  };

  button__next.addEventListener("click", () => {
    const checkInputsResult = checkInputs();
    if (checkInputsResult.passed) {
      registration_inputs__first.classList.add("hidden");
      registration_inputs__last.classList.remove("hidden");
    } else {
      if (!checkInputsResult.element)
        throw new Error("Input check failed, but no element returned");
      checkInputsResult.element.classList.add("inputText__invalid");
    }
  });
});
