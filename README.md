# Block Breakpoint

The Block Breakpoint module makes it possible select one or more breakpoints that will
apply as a block condition.

On the rendering of the block the Javascript `MutationObserver` will listen to all
configured blocks and match the selected breakpoint media query against the current
browser window. If the media query does not match, it will remove the block from the
DOM before it is rendered.

## Installation

Install the Block Breakpoint module as you would normally install a contributed
Drupal module. Visit https://www.drupal.org/node/1897420 for further information.

## Configuration
1. Open the block configuration for your designated block.
2. Check the checkbox "Enable Block Breakpoint"
3. Select a breakpoint group (usually your Frontend theme)
4. Select the breakpoint for which the block should be shown.
5. Save the block.

## Use case: External scripts like advertisement
Usually you can achieve conditional display of blocks simply with hiding or showing
them by CSS. For external scripts like having an embed script for displaying mobile
and desktop ads and using CSS for the visibility will lead to wrong impression
statistics. The mobile banner script might be even loaded, when it is rendered on
desktop and so doubling the impressions in your ad system.

With the `MutationObserver` you ensure, that a block, that does not meet the breakpoint's
media query will never be processed further and the DOM and never drawn by the browser.
So you will only see the desktop banner impressions in your statistics.

You have another use-case. Share it with the community and let us know how you're
using the module.

## Layout Builder Support
Layout Builder components (at the time of writing) do not support third party settings,
which this module is based on. You can use the patch of of
[this issue](http://drupal.org/node/3015152). This will make the module work with
Layout Builder components.

## Requirements

* Block, Breakpoint ([Drupal core](https://drupal.org/project/drupal))
