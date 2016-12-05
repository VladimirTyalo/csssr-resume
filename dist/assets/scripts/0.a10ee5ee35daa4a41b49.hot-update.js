webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _svg4everybody = __webpack_require__(1);
	
	var _svg4everybody2 = _interopRequireDefault(_svg4everybody);
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _expandingArea = __webpack_require__(5);
	
	var _expandingArea2 = _interopRequireDefault(_expandingArea);
	
	var _slider = __webpack_require__(8);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialText = 'Здравствуйте! Узнал о Вашей компании недавно, но уже успел прочитать почти весь Ваш блог. Очень понравилась идея работать удаленно не в одиночку, а в команде профессионалов. Чеснто говоря, решил, что хочу начать карьеру у Вас в компании после того как попробовал Ваш шаблон для быстрого старта. Удобно, понятно и очень модульно.';
	
	(0, _jquery2.default)(function () {
		(0, _svg4everybody2.default)();
	
		// init textarea rows adjustment
		var $about = (0, _jquery2.default)('.expanding-area');
		(0, _expandingArea2.default)($about[0], initialText);
	
		// init slider
		var $slider = (0, _jquery2.default)('#slider');
		var slider = new _slider2.default($slider);
		slider.init();
	});

/***/ }
])
//# sourceMappingURL=0.a10ee5ee35daa4a41b49.hot-update.js.map