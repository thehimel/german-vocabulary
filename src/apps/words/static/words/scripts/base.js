// Get the input element
const searchInput = document.getElementById('search_input');

// Add event listeners for focus and blur events
searchInput.addEventListener('focus', function () {
    this.setAttribute('data-placeholder', this.getAttribute('placeholder'));
    this.removeAttribute('placeholder');
});

searchInput.addEventListener('blur', function () {
    this.setAttribute('placeholder', this.getAttribute('data-placeholder'));
    this.removeAttribute('data-placeholder');
});
