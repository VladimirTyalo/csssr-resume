import svg4everybody from 'svg4everybody';
import $ from 'jquery';

import makeExpandingArea from '../blocks/expanding-area/expanding-area.js';
import Slider from '../blocks/slider/slider.js';

const initialText = 'Здравствуйте! Узнал о Вашей компании недавно, но уже успел прочитать почти весь Ваш блог. Очень понравилась идея работать удаленно не в одиночку, а в команде профессионалов. Чеснто говоря, решил, что хочу начать карьеру у Вас в компании после того как попробовал Ваш шаблон для быстрого старта. Удобно, понятно и очень модульно.';


$(() => {
	svg4everybody();

	// init textarea rows adjustment
	const $about = $('.expanding-area');
	makeExpandingArea($about[0], initialText);

	// init slider
	const $slider = $('#slider');
	const slider = new Slider($slider);
	slider.init();
});
