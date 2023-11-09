document.addEventListener("DOMContentLoaded", () => {
  let editMode = true;

  const inputsContainer = document.querySelector(".profile .inputsContainer");
  const profileEditButton = document.querySelector(".profile .iconButton_edit");
  const profileSaveButton = document.querySelector(
    ".profile .button_saveProfile"
  );

  const inputs = {
    containers: document.querySelectorAll(
      ".profile .inputsContainer .inputText"
    ),
    fields: document.querySelectorAll(
      ".profile .inputsContainer .inputText_input"
    ),
  };

  profileEditButton.addEventListener("click", () => {
    editMode = !editMode;
    updateInputs(editMode);
  });

  const updateInputs = (editMode) => {
    if (editMode) {
      inputs.containers.forEach((c) =>
        c.classList.remove("inputText__readonly")
      );
      inputs.fields.forEach((c) => {
        c.removeAttribute("readonly"); // = false; //("readonly");
        c.classList.remove("inputText_input__readonly");
      });
      profileSaveButton.classList.remove("hidden");
      inputsContainer.classList.add("inputsContainer_edit");
    } else {
      inputs.containers.forEach((c) => c.classList.add("inputText__readonly"));
      inputs.fields.forEach((c) => {
        c.classList.add("inputText_input__readonly");
        c.setAttribute("readonly", "readonly");
      });
      profileSaveButton.classList.add("hidden");
      inputsContainer.classList.remove("inputsContainer_edit");
    }
  };

  updateInputs(editMode);
});
