import $ from 'jquery';

// Function to adjust height to a number of lines without scrollbar
const textareaAdjust = element => {
	const init = () => {
		const $el = $(element);
		const $textarea = $el.find('textarea');

		$textarea.on('input', () => {
			const scrollHeight = $textarea[0].scrollHeight;
			$textarea.height(scrollHeight);
		});
	};

	return {
		init
	};
};

export default textareaAdjust;
