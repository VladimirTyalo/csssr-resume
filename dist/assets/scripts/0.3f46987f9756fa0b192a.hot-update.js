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
	
	var aboutMe = (0, _stringify2.default)('Здравствуйте! Узнал о Вашей компании недавно, но уже успел прочитать почти весь Ваш блог. Очень понравилась идея работать удаленно не в одиночку, а в команде профессионалов. Чеснто говоря, решил, что хочу начать карьеру у Вас в компании после того как попробовал Ваш шаблон для быстрого старта. Удобно, понятно и очень модульно.').replace(/\"/g, '');
	
	// http://alistapart.com/article/expanding-text-areas-made-elegant
	function makeExpandingArea(container) {
		var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : aboutMe;
	
		var area = container.querySelector('textarea');
		var span = container.querySelector('span');
		var THROTTLE_TIME = 100;
	
		function onInput(ev) {
			span.textContent = area.value;
		}
	
		var throttledOnInput = (0, _lodash.throttle)(onInput, THROTTLE_TIME);
		span.textContent = defaultValue;
		onInput();
	
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
//# sourceMappingURL=0.3f46987f9756fa0b192a.hot-update.js.map