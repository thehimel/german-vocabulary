document.addEventListener('DOMContentLoaded', function () {
  const messageContent = document.getElementById('message-content');

  if (messageContent) {
    const messages = messageContent.innerText.trim();

    if (messages !== '') {
      const autoCloseModal = new bootstrap.Modal(document.getElementById('autoCloseModal'));
      autoCloseModal.show();
      setTimeout(() => autoCloseModal.hide(), 2000);
    }
  }
});
