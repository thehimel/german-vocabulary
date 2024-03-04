document.getElementById('flashCard').addEventListener('click', function (event) {
  if (!event.target.classList.contains('play-button')) {
    // If the clicked element does not have the class 'play-button', flip the card
    const flip_card = document.getElementById('flip_card');
    document.getElementById('flashCard').classList.toggle('rotate');
    flip_card.play();
  }
});

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

function changeText() {
  const button = document.getElementById("myButton");
  button.innerHTML = "Playing...";
  speakText("Ich bin sehr glücklich.", "de-DE", 0.7); // German language code: "de-DE"
}

function speakText(text, lang) {
  const speechSynthesis = window.speechSynthesis; // Using the Web Speech API for text-to-speech
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = lang;

  utterance.onend = function () {
    const button = document.getElementById("myButton");
    button.innerHTML = "Play"; // Change button text when TTS is complete
  };

  speechSynthesis.speak(utterance);
}
