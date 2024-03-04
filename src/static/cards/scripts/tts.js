let playing = false
const playIcon = 'fa-circle-play'
const stopIcon = 'fa-circle-stop'

function speakText(text, lang) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.onend = () => togglePlayIcon();
  speechSynthesis.speak(utterance);
}

function stopSpeakText() {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
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

function togglePlayIcon() {
  const hasPlayIcon = playButton.classList.contains(playIcon);

  if (hasPlayIcon) {
    playing = true;
    playButton.classList.remove(playIcon)
    playButton.classList.add(stopIcon)
  } else {
    playing = false;
    playButton.classList.remove(stopIcon)
    playButton.classList.add(playIcon)
  }
}
