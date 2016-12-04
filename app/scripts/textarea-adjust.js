import $ from 'jquery';

// Function to adjust height to a number of lines without scrollbar
const textareaAdjust = element => {
	const $el = $(element);
	const $textarea = $el.find('textarea');
	const initialText = 'Здравствуйте! Узнал о Вашей компании недавно, но уже успел прочитать почти весь Ваш блог. Очень понравилась идея работать удаленно не в одиночку, а в команде профессионалов. Чеснто говоря решил, что хочу начать карьеру у Вас в компании после того как попробовал Ваш шаблон для быстрого старта. Удобно, понятно и очень модульно.';

	const updateSize = () => {
		const scrollHeight = $textarea[0].scrollHeight;
		$textarea.height(scrollHeight);
	};


	const init = () => {
		// normalize string and remove quotes
		const innerText = JSON.stringify(initialText).replace(/\"/g, '');
		$textarea.val(innerText);

		// to remove vertical scrollbar update textarea height
		updateSize();

		$textarea.on('input', () => {
			updateSize();
		});
	};

	return {
		init
	};
};

export default textareaAdjust;
