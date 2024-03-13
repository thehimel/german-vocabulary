/**
 * Toggles the behavior of the placeholder text for the input element with the specified ID.
 * When the input is focused, the placeholder text is removed.
 * When the input loses focus and no text is entered, the placeholder text is added back.
 * @param {string} inputId The ID of the input element for which to toggle the placeholder behavior.
 */
function togglePlaceholderBehavior(inputId) {
    // Get the input element
    const searchInput = document.getElementById(inputId);

    // Add event listeners for focus and blur events
    searchInput.addEventListener('focus', function () {
        this.setAttribute('data-placeholder', this.getAttribute('placeholder'));
        this.removeAttribute('placeholder');
    });

    searchInput.addEventListener('blur', function () {
        this.setAttribute('placeholder', this.getAttribute('data-placeholder'));
        this.removeAttribute('data-placeholder');
    });
}

function addShadowOnMouseover(elementId) {
    const element = document.getElementById(elementId);

    element.addEventListener('mouseover', function() {
        this.classList.add('shadow-on-mouseover'); // Add shadow class when hovered
    });

    element.addEventListener('mouseleave', function() {
        this.classList.remove('shadow-on-mouseover'); // Remove shadow class on mouse leave
    });
}

togglePlaceholderBehavior('search_input');
addShadowOnMouseover('search_bar');

