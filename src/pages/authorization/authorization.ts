import { formValidator, submitValidate } from "../../utils/formValidation";

document.addEventListener("DOMContentLoaded", () => {
  const form: HTMLFormElement | null = document.querySelector("form.form_authorization");
  if (form !== null) formValidator(form);

  const submitButton = form?.querySelector(".button_submit");

  submitButton?.addEventListener("click", event => {
    event.preventDefault();
    const { valid, result } = submitValidate(form);
    if (!valid) {
      console.log(`form isn't valid`);
    } else {
      console.log(`form is valid`);
      console.log(result);
    }
  });
});
