/**
 * @file
 * Adds a mutation observer, that observes block_breakpoint blocks and hides
 * them conditionally, if the selected breakpoint does not match the current
 * user's browser.
 */

new MutationObserver(function () {
  // Observe the creation of blocks with block_breakpoint feature anbled.
  document.body.querySelectorAll('.block-breakpoint').forEach(function (block) {
    // Blocks in the layout builder configuration page should not get removed.
    if (!block.classList.contains('layout-builder-block')) {
      var match_media_query;
      if (match_media_query = block.getAttribute('data-block-breakpoint-media-query')) {
        // Check if the given media query is matched. Otherwise remove the block
        // before it is getting further processed in the DOM.
        if (!window.matchMedia(match_media_query).matches) {
          block.remove();
        }
      }
    }
  });
}).observe(document.documentElement, {childList: true, subtree: false});
