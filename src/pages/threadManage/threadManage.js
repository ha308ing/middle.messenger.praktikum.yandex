document.addEventListener("DOMContentLoaded", () => {
  const threadMembers = document.querySelectorAll(
    ".threadManage .threadMember[data-login]"
  );
  const buttonLeaveThread = document.querySelector(
    ".threadManage .button__leaveThread"
  );

  const intentToRemoveMember = (login) => () =>
    console.log(`intent to remove ${login}`);
  const intentToInviteMember = (login) => () =>
    console.log(`intent to invite ${login}`);

  threadMembers.forEach((m) => {
    const login = m.dataset["login"];

    const buttonRemoveMember = m.querySelector(".button_removeMember");
    const buttonInviteMember = m.querySelector(".button_inviteMember");

    if (buttonRemoveMember) {
      buttonRemoveMember.addEventListener("click", intentToRemoveMember(login));
    }
    if (buttonInviteMember) {
      buttonInviteMember.addEventListener("click", intentToInviteMember(login));
    }
  });

  buttonLeaveThread.addEventListener("click", () => {
    const modal = document.querySelector(
      ".threadManage .modal_container.modal_confirmLeaveThread.hidden"
    );
    console.log(modal);
    if (modal) {
      modal.classList.remove("hidden");
    }
  });
});
