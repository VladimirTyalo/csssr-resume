import {throttle} from 'lodash';

const aboutMe = JSON.stringify('Здравствуйте, уважаемая компания CSSSR! Только начинаю карьеру разработчика, и практического опыта не так много. Хочу работать у Вас в компании чтобы делать не просто хорошие сайты, а лучшие. Потрясающий шаблон для быстрого старта - все понятно, продумано и очень модульно. Надеюсь быть полезным в решении сложных и интересных задач.').replace(/\"/g, '');

// http://alistapart.com/article/expanding-text-areas-made-elegant
function makeExpandingArea(container, defaultValue = aboutMe) {
	const area = container.querySelector('textarea');
	const span = container.querySelector('span');
	const THROTTLE_TIME = 100;

	function onInput() {
		span.textContent = area.value;
	}

	const throttledOnInput = throttle(onInput, THROTTLE_TIME);
	area.value = defaultValue;


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
