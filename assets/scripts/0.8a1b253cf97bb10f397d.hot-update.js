webpackHotUpdate(0,{

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _stringify = __webpack_require__(6);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _lodash = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var aboutMe = (0, _stringify2.default)('Здравствуйте уважаемая компания CSSSR. Только начинаю карьеру разработчика, и практического опыта не так много. Хочу работать у Вас в компании чтобы делать не просто хорошие сайты, а лучшие. Потрясающий шаблон для быстрого старта - все понятно, продумано и очень модульно. Надеюсь быть полезным в решении сложных и интересных задач.').replace(/\"/g, '');
	
	// http://alistapart.com/article/expanding-text-areas-made-elegant
	function makeExpandingArea(container) {
		var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : aboutMe;
	
		var area = container.querySelector('textarea');
		var span = container.querySelector('span');
		var THROTTLE_TIME = 100;
	
		function onInput() {
			span.textContent = area.value;
		}
	
		var throttledOnInput = (0, _lodash.throttle)(onInput, THROTTLE_TIME);
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
	
	exports.default = makeExpandingArea;

/***/ }

})
//# sourceMappingURL=0.8a1b253cf97bb10f397d.hot-update.js.map