import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import textareaAdjust from './textarea-adjust.js';

import Slider from './slider.js';

$(() => {
	svg4everybody();

	const $about = $('.about');
	textareaAdjust($about).init();

	const $slider = $('#slider');
	const slider = new Slider($slider);


});
