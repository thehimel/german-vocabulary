function rotateCard(cardContainer) {
  const flashcard = cardContainer.querySelector('.flashcard');
  const flip_card = document.getElementById('flip_card');
  flashcard.classList.toggle('rotate');
  flip_card.play();
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
