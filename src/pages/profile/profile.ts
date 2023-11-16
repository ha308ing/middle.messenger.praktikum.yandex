import { formValidator } from "../../utils/formValidation";

document.addEventListener("DOMContentLoaded", () => {
  let editMode = true;
  updateInputs(editMode);

  const form: HTMLFormElement | null = document.querySelector("form.form_profileEdit");
  if (form !== null) formValidator(form);

  const profileEditButton = document.querySelector(".profile .iconButton_edit");

  if (profileEditButton !== null) {
    profileEditButton.addEventListener("click", () => {
      editMode = !editMode;
      updateInputs(editMode);
    });
  }

  function updateInputs(editMode: boolean) {
    const inputsContainer = document.querySelector(".profile .inputsContainer");
    const profileSaveButton = document.querySelector(".profile .button_saveProfile");

    const inputs = {
      containers: document.querySelectorAll(".profile .inputsContainer .inputText"),
      fields: document.querySelectorAll(".profile .inputsContainer .inputText_input"),
    };

    if (editMode) {
      if (Object.keys(inputs.containers).length > 0) {
        inputs.containers.forEach(c => {
          c.classList.remove("inputText__readonly");
        });
      }

      if (Object.keys(inputs.fields).length > 0) {
        inputs.fields.forEach(c => {
          c.removeAttribute("readonly"); // = false; //("readonly");
          c.classList.remove("inputText_input__readonly");
        });
      }
      if (profileSaveButton != null) profileSaveButton.classList.remove("hidden");
      if (inputsContainer != null) inputsContainer.classList.add("inputsContainer_edit");
    } else {
      inputs.containers.forEach(c => {
        c.classList.add("inputText__readonly");
      });
      inputs.fields.forEach(c => {
        c.classList.add("inputText_input__readonly");
        c.setAttribute("readonly", "readonly");
      });
      if (profileSaveButton != null) profileSaveButton.classList.add("hidden");
      if (inputsContainer != null) inputsContainer.classList.remove("inputsContainer_edit");
    }
  }
});
