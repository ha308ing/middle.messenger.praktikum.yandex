document.addEventListener("DOMContentLoaded", () => {
  let editMode = true;

  updateInputs(editMode);

  const profileEditButton = document.querySelector(".profile .iconButton_edit");

  profileEditButton &&
    profileEditButton.addEventListener("click", () => {
      editMode = !editMode;
      updateInputs(editMode);
    });

  function updateInputs(editMode: boolean) {
    const inputsContainer = document.querySelector(".profile .inputsContainer");
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

    if (editMode) {
      if (Object.keys(inputs.containers).length) {
        inputs.containers.forEach((c) => {
          c.classList.remove("inputText__readonly");
        });
      }

      if (Object.keys(inputs.fields).length) {
        inputs.fields.forEach((c) => {
          c.removeAttribute("readonly"); // = false; //("readonly");
          c.classList.remove("inputText_input__readonly");
        });
      }
      profileSaveButton && profileSaveButton.classList.remove("hidden");
      inputsContainer && inputsContainer.classList.add("inputsContainer_edit");
    } else {
      inputs.containers.forEach((c) => c.classList.add("inputText__readonly"));
      inputs.fields.forEach((c) => {
        c.classList.add("inputText_input__readonly");
        c.setAttribute("readonly", "readonly");
      });
      profileSaveButton && profileSaveButton.classList.add("hidden");
      inputsContainer &&
        inputsContainer.classList.remove("inputsContainer_edit");
    }
  }
});
