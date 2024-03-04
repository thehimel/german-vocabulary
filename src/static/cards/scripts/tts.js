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
