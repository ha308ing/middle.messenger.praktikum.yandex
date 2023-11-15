document.addEventListener("DOMContentLoaded", () => {
  const threadMembers = document.querySelectorAll(".threadManage .threadMember[data-login]");
  const buttonLeaveThread = document.querySelector(".threadManage .button__leaveThread");

  const intentToRemoveMember = (login: string) => () => {
    console.log(`intent to remove ${login}`);
  };

  const intentToInviteMember = (login: string) => () => {
    console.log(`intent to invite ${login}`);
  };

  threadMembers.forEach(m => {
    if (m == null || !(m instanceof HTMLElement)) return;
    const login = m.dataset.login;

    if (login == null) return;

    const buttonRemoveMember = m.querySelector(".button_removeMember");
    const buttonInviteMember = m.querySelector(".button_inviteMember");

    if (buttonRemoveMember != null) {
      buttonRemoveMember.addEventListener("click", intentToRemoveMember(login));
    }

    if (buttonInviteMember != null) {
      buttonInviteMember.addEventListener("click", intentToInviteMember(login));
    }
  });

  if (buttonLeaveThread != null) {
    buttonLeaveThread.addEventListener("click", () => {
      const modal = document.querySelector(".threadManage .modal_container.modal_confirmLeaveThread.hidden");
      if (modal != null) {
        modal.classList.remove("hidden");
      }
    });
  }
});
