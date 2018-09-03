document.addEventListener('click', function (event) {
  /** @type Element */
  var result = event.target;
  if (result.hasAttribute('translation-result')) {
    var origin = result.nextElementSibling;
    if (origin.getAttribute('translation-origin') === 'off') {
      origin.setAttribute('translation-origin', 'on');
    } else {
      origin.setAttribute('translation-origin', 'off');
    }
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
});