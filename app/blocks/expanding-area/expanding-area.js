import {throttle} from 'lodash';

const aboutMe = JSON.stringify('Здравствуйте! Узнал о Вашей компании недавно, но уже успел прочитать почти весь Ваш блог. Очень понравилась идея работать удаленно не в одиночку, а в команде профессионалов. Чеснто говоря, решил, что хочу начать карьеру у Вас в компании после того как попробовал Ваш шаблон для быстрого старта. Удобно, понятно и очень модульно.').replace(/\"/g, '');

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
