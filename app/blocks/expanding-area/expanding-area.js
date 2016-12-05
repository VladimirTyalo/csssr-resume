import {throttle} from 'lodash';

// http://alistapart.com/article/expanding-text-areas-made-elegant
function makeExpandingArea(container, defaultText = 'О себе...') {
	const area = container.querySelector('textarea');
	const span = container.querySelector('span');
	const THROTTLE_TIME = 100;

	function onInput(ev) {
		span.textContent = area.value;
	}

	const throttledOnInput = throttle(onInput, THROTTLE_TIME);
	area.value = defaultText;

	if (area.addEventListener) {
		area.addEventListener('input', throttledOnInput, false);
		onInput();

	} else if (area.attachEvent) {
		// IE8 compatibility
		area.attachEvent('onpropertychange', throttledOnInput);
		onInput();
	}
	// Enable extra CSS
	container.className += ' expanding-area_active';


}

export default makeExpandingArea;
