import svg4everybody from 'svg4everybody';
import $ from 'jquery';

import makeExpandingArea from '../blocks/expanding-area/expanding-area.js';
import Slider from '../blocks/slider/slider.js';

$(() => {
	svg4everybody();

	// init textarea rows adjustment function
	const $about = $('.expanding-area');
	makeExpandingArea($about[0]);

	// init slider
	const $slider = $('#slider');
	const slider = new Slider($slider);
	slider.init();
});
