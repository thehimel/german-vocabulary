let playing = false, playIcon = 'fa-circle-play', stopIcon = 'fa-circle-stop';

const stopSpeakText = () => speechSynthesis.speaking && speechSynthesis.cancel();

function togglePlayIcon() {
  playing = !playing;
  playButton.classList.toggle(playIcon);
  playButton.classList.toggle(stopIcon);
}

async function speakText(api_url, text, lang) {
  try {
    // Assuming the API returns the audio file directly as a Blob
    const audioBlob = await getTTSResponse(api_url, text, lang);

    // Create a Blob URL for the audio
    const audioUrl = URL.createObjectURL(audioBlob);

    // Create an audio element
    const audio = new Audio(audioUrl);

    // Add an event listener to toggle the play icon when the audio playback ends
    audio.addEventListener('ended', () => togglePlayIcon());

    await audio.play();
  } catch (error) {
    // Handle errors from getTTSResponse or audio playback
    console.error('Error:', error);
  }
}

function playText(api_url, text, lang) {
  if (!playing) {
    speakText(api_url, text, lang).then(r => togglePlayIcon());
  } else {
    stopSpeakText();
    togglePlayIcon();
  }
}
