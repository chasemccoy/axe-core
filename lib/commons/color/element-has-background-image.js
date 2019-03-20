/* global color */

/**
 * Reports if an element has a background image or gradient
 *
 * @method elementHasBackgroundImage
 * @memberof axe.commons.color
 * @private
 * @param {Element} elm
 * @param {Object|null} style
 * @return {Boolean}
 */
color.elementHasBackgroundImage = function elementHasBackgroundImage(
	elm,
	style
) {
	const graphicNodes = ['IMG', 'CANVAS', 'OBJECT', 'IFRAME', 'VIDEO', 'SVG'];
	const nodeName = elm.nodeName.toUpperCase();

	if (graphicNodes.includes(nodeName)) {
		axe.commons.color.incompleteData.set('bgColor', 'imgNode');
		return true;
	}

	style = style || window.getComputedStyle(elm);

	const bgImageStyle = style.getPropertyValue('background-image');
	const hasBgImage = bgImageStyle !== 'none';

	if (hasBgImage) {
		var hasGradient = /gradient/.test(bgImageStyle);
		axe.commons.color.incompleteData.set(
			'bgColor',
			hasGradient ? 'bgGradient' : 'bgImage'
		);
	}

	return hasBgImage;
};