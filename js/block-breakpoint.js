/**
 * @file
 * Adds a mutation observer, DOMContentLoaded and utility functions to observe
 * block_breakpoint blocks and hides them conditionally, if the selected
 * breakpoint does not match the current user's browser.
 */

/**
 * Get the closest parent for a given element.
 *
 * @param element
 *   The given DomElement
 * @param selector
 *   The selector the parent must match for.
 * @returns {null|*}
 *   The first matching DomElement.
 */
var blockBreakpointGetClosestParent = function (element, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {
        }
        return i > -1;
      };
  }

  // Get the closest matching element
  for (; element && element !== document; element = element.parentNode) {
    if (element.matches(selector)) {
      return element;
    }
  }
  return null;
};

/**
 * Matches the block breakpoint element with the given media query.
 *
 * @param element
 *   The given element
 */
var blockBreakpointMatchElement = function(element) {
  if (!element.classList.contains('layout-builder-block')) {
    var match_media_query = element.getAttribute('data-block-breakpoint-media-query');
    if (match_media_query) {
      // Check if the given media query is matched. Otherwise remove the block
      // before it is getting further processed in the DOM.
      if (window.matchMedia(match_media_query).matches && element.getAttribute('data-block-breakpoint-hidden')) {
        element.setAttribute('data-block-breakpoint-hidden', 0)
        element.removeAttribute('data-block-breakpoint-prev-display')
        element.style.display = element.getAttribute('data-block-breakpoint-prev-display')
      } else {
        // Internet Explorer 11 does not support removing HtmlElement,
        // therefore using the old fashion way.
        element.setAttribute('data-block-breakpoint-hidden', 1)
        element.setAttribute('data-block-breakpoint-prev-display', element.style.display)
        element.style.display = 'none'
      }
    }
  }
}

function throttle(callback, limit) {
  var waiting = false
  return function() {
    if (!waiting) {
      // eslint-disable-next-line
      callback.apply(this, arguments)
      waiting = true
      setTimeout(function() {
        waiting = false
      }, limit)
    }
  }
}

function checkBlockBreakpoints() {
  var blocks = document.body.querySelectorAll('.block-breakpoint');
  for (var i = 0; i < blocks.length; i++) {
    blockBreakpointMatchElement(blocks[i]);
  }
}

/**
 * React on DOM changes using the MutationObserver.
 */
if (window.MutationObserver) {
  // Observe the creation of blocks with block_breakpoint feature anbled.
  new MutationObserver(function () {
    checkBlockBreakpoints()
  }).observe(document.documentElement, {childList: true, subtree: false});
}

/**
 * React the initial DOM.
 */
document.addEventListener('DOMContentLoaded', function() {
  checkBlockBreakpoints()
});

window.addEventListener('resize', throttle(() => {
  checkBlockBreakpoints()
}, 50))

window.addEventListener('orientationchange', throttle(() => {
  checkBlockBreakpoints()
}, 50))
