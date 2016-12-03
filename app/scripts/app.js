import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import textareaAdjust from './textarea-adjust.js';

import Slider from './slider.js';

// Nice, slim, easy to install date picker https://chmln.github.io/flatpickr/
// import Flatpickr from 'flatpickr';


$(() => {
	svg4everybody();

	// init textarea rows adjustment
	const $about = $('.about');
	textareaAdjust($about).init();

	// init slider
	const $slider = $('#slider');
	const slider = new Slider($slider);
	slider.init();

	// init datepicker
	// const $flatpickr = $('#flatpickr').flatpickr({
	//
	// 	enableTime: true,
	//
	// 	// create an extra input solely for display purposes
	// 	altInput: true,
	// 	altFormat: "m.d.Y",
	// 	enableTime: false
	// })
});
