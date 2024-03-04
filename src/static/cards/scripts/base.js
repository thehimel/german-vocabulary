// Flip the card on click except click on the play button
document.getElementById('flashCard').addEventListener('click', function (event) {
  if (event.target !== document.getElementById('playButton')) {
    // If the clicked element does not have the class 'playButton', flip the card
    const flipAudio = document.getElementById('flipAudio');
    document.getElementById('flashCard').classList.toggle('rotate');
    flipAudio.play();
  }
});

function changeText() {
  const button = document.getElementById('playButton');
  button.innerHTML = 'Playing...';
  speakText('Ich bin sehr glücklich.', 'de-DE', 0.7); // German language code: "de-DE"
}

function speakText(text, lang) {
  const speechSynthesis = window.speechSynthesis; // Using the Web Speech API for text-to-speech
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = lang;

  utterance.onend = function () {
    const button = document.getElementById("playButton");
    button.innerHTML = "Play"; // Change button text when TTS is complete
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
    // If it's the first load, add the 'loaded' class after 1 second
    setTimeout(function () {
      fadeContainer.classList.add('loaded');
    }, 500);

    // Set a flag in sessionStorage to indicate that the page is loaded
    sessionStorage.setItem('isPageLoaded', 'true');
  }
});

