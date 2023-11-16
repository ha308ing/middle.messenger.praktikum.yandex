import { formValidator } from "../../../utils/formValidation";

document.addEventListener("DOMContentLoaded", () => {
  const form: HTMLFormElement | null = document.querySelector("form.sendBar");
  if (form !== null) formValidator(form);
});
