import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import textareaAdjust from './textarea-adjust.js';

// import Slider from './slider.js';

$(() => {
	svg4everybody();

	const $slider = $('.about');
	textareaAdjust($slider).init();
});
