webpackHotUpdate(0,{

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _lodash = __webpack_require__(6);
	
	// http://alistapart.com/article/expanding-text-areas-made-elegant
	function makeExpandingArea(container, defaultText) {
		var area = container.querySelector('textarea');
		var span = container.querySelector('span');
		var THROTTLE_TIME = 100;
	
		function onInput(ev) {
			// if prssed key is enter set new height
			span.textContent = area.value;
		}
	
		var throttledOnInput = (0, _lodash.throttle)(onInput, THROTTLE_TIME);
	
		area.value = defaultText || "О себе...";
	
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
//# sourceMappingURL=0.b8bcb325a83f8d7d78b6.hot-update.js.map