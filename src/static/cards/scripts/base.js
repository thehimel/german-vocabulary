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

function changeText() {
  const playButton = document.getElementById('playButton');
  let text = 'Ich bin sehr glücklich.'
  let lang = 'de-DE'
  let speed = 0.6

  playButton.innerHTML = 'Playing...';
  speakText(text, lang, speed);
}

function speakText(text, lang) {
  const speechSynthesis = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = lang;

  utterance.onend = function () {
    const playButton = document.getElementById("playButton");
    playButton.innerHTML = "Play"; // Change button text when TTS is complete
  };

  speechSynthesis.speak(utterance);
}

document.addEventListener('DOMContentLoaded', function () {
  const fadeContainer = document.querySelector('.fade-in-container');

  // Check if it's the first load or a refresh
  if (sessionStorage.getItem('isPageLoaded') === 'true') {
    // If it's a refresh, add the 'loaded' class immediately
    fadeContainer.classList.add('loaded');
  } else {
    // If it's the first load, add the 'loaded' class after 1/2 second
    setTimeout(function () {
      fadeContainer.classList.add('loaded');
    }, 500);

    // Set a flag in sessionStorage to indicate that the page is loaded
    sessionStorage.setItem('isPageLoaded', 'true');
  }
});

