// Flip the card on click except click on the play button
document.getElementById('flashCard').addEventListener('click', function (event) {
  const flashCard = document.getElementById('flashCard');
  const playButton = document.getElementById('playButton');
  const flipAudio = document.getElementById('flipAudio');

  if (event.target !== playButton) {
    flashCard.classList.toggle('rotate');
    flipAudio.play();
  }
});
