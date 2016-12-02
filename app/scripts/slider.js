import $ from 'jquery';


const Slider = ({element}) => {
	const $el = $(element);

	const $knob = $el.find('.slider__knob');
	const $fixedItems = $el.find('.slider__notation-item');

	// click on item should move knob to according position





	const getValue = () => {
		return -1;
	}


	return {
		getValue
	};
};

export default Slider;
