const flashCard = document.getElementById('flashCard');
const linkedWords = document.getElementById('linkedWords');
const playButton = document.getElementById('playButton');
const flipAudio = document.getElementById('flipAudio');
const speechSynthesis = window.speechSynthesis;

// Flip the card on click except click on the play button
document.getElementById('flashCard').addEventListener('click', function (event) {
  if (event.target !== playButton && event.target !== linkedWords) {
    flashCard.classList.toggle('rotate');
    flipAudio.play();
  }
});
