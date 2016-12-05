webpackHotUpdate(0,{

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _lodash = __webpack_require__(6);
	
	// http://alistapart.com/article/expanding-text-areas-made-elegant
	function makeExpandingArea(container) {
		var area = container.querySelector('textarea');
		var span = container.querySelector('span');
		var THROTTLE_TIME = 300;
	
		function onInput(ev) {
			// if prssed key is enter set new height
			// span.textContent = (area.value === '') ? ' ' : area.value;
			span.textContent = area.value;
			// area.offsetHeight;
		}
	
		var throttledOnInput = (0, _lodash.throttle)(onInput, THROTTLE_TIME);
	
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
	
		// container.querySelector('pre').appendChild(document.createElement('br'));
	}
	
	exports.default = makeExpandingArea;

/***/ }

})
//# sourceMappingURL=0.af9f31714acb0e112ee6.hot-update.js.map