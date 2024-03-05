let playing = false, playIcon = 'fa-circle-play', stopIcon = 'fa-circle-stop';

const stopSpeakText = () => speechSynthesis.speaking && speechSynthesis.cancel();

function togglePlayIcon() {
  playing = !playing;
  playButton.classList.toggle(playIcon);
  playButton.classList.toggle(stopIcon);
}

function speakText(text, lang) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.onend = () => togglePlayIcon();
  speechSynthesis.speak(utterance);
}

function playText(text, lang) {
  if (!playing) {
    togglePlayIcon();
    speakText(text, lang);
  } else {
    stopSpeakText();
    togglePlayIcon();
  }
}


