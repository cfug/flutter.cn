document.addEventListener('click', function (event) {
  /** @type Element */
  var result = event.target;
  // 忽略 A 标签
  if (result.tagName === 'A') {
    return;
  }
  if (result.hasAttribute('translation-result')) {
    var origin = result.nextElementSibling;
    if (origin.getAttribute('translation-origin') === 'off') {
      origin.setAttribute('translation-origin', 'on');
    } else {
      origin.setAttribute('translation-origin', 'off');
    }
    event.stopPropagation();
  }
});
