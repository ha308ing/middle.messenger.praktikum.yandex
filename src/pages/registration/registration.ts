import { formValidator } from "../../utils/formValidation";

document.addEventListener("DOMContentLoaded", () => {
  const form: HTMLFormElement | null = document.querySelector("form.form_registration");
  if (form !== null) formValidator(form);
});
