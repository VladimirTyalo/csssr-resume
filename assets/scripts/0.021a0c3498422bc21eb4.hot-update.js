webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _svg4everybody = __webpack_require__(1);
	
	var _svg4everybody2 = _interopRequireDefault(_svg4everybody);
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _expandingArea = __webpack_require__(5);
	
	var _expandingArea2 = _interopRequireDefault(_expandingArea);
	
	var _slider = __webpack_require__(9);
	
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

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Slider = function Slider(element) {
		var $el = (0, _jquery2.default)(element);
		var $field = $el.find('[data-slider="slider-field"]');
		var $knob = $el.find('[data-slider="slider-knob"]');
		var $marks = $el.find('[data-slider="slider-mark"]');
		var TRANSFORM_SCALE_UP = 1.4;
		var TRANSFORM_SCALE_NORMAL = 1.0;
		var isMouseDown = false;
	
		// get array of % scale
		var percentages = $marks.map(function (idx, m) {
			return Number(m.getAttribute('data-value'));
		}).toArray();
	
		// value - corresponding index of percentages array this value returned by public API
		var value = 1;
	
		// get knob's css left attribute
		var getLeftAttr = function getLeftAttr(mark) {
			var position = Number(mark.getAttribute('data-value'));
			var width = Number($field[0].offsetWidth);
			var left = null;
			if (position === 0) {
				left = -$knob[0].offsetWidth * 0.5;
			} else if (position === 100) {
				left = width * (position / 100) - $knob[0].offsetWidth * 0.6;
			} else {
				left = width * (position / 100) - $knob[0].offsetWidth / 2;
			}
	
			return left;
		};
	
		// click on item should move knob to mark position
		var onMarkClick = function onMarkClick(mark) {
			$knob.css('transition', '0.3s');
			$knob.css('left', getLeftAttr(mark) + 'px');
	
			value = percentages.indexOf(Number(mark.getAttribute('data-value')));
		};
	
		// render scale marks on the field
		var createScale = function createScale() {
			var fragment = document.createDocumentFragment();
	
			$marks.each(function (idx, el) {
				// create mark and set styles
				var mark = document.createElement('div');
				mark.style.position = 'absolute';
				mark.style.left = getLeftAttr(el) + $knob[0].offsetWidth / 2 + 'px';
				mark.style.top = '-5px';
				// don't set 0 and 100% present scale
				if (idx !== 0 && idx !== $marks.length - 1) {
					mark.innerText = '|';
				}
				// append makr element to a document fragment
				mark.style.color = '#2f1b15';
				fragment.appendChild(mark);
			});
	
			$field[0].appendChild(fragment);
		};
	
		// culculate new left position
		function getLeftPosition(ev) {
			var fieldWidth = $field[0].offsetWidth;
			var halfKnob = $knob[0].offsetWidth / 2;
	
			// find left style parameter  for knob
			var rect = $field[0].getBoundingClientRect();
	
			// x coordinate of left edge of the knob relative to the field
			var left = ev.clientX - rect.left;
	
			// limit x movement and adjust to the knob width
			var coord = void 0;
			if (left + halfKnob < 0) {
				coord = -halfKnob;
			} else if (left + 2 * halfKnob > fieldWidth) {
				coord = fieldWidth - 2 * halfKnob;
			} else {
				coord = left - halfKnob;
			}
	
			return coord;
		}
	
		function findNearestMarkPosition(ev) {
			var coordInPercentages = getLeftPosition(ev) * 100 / $field[0].offsetWidth;
			var mark = percentages.reduce(function (acc, el) {
				var delta = Math.abs(coordInPercentages - el);
				if (acc[1] > Math.abs(delta)) {
					return [el, delta];
				}
				return acc;
			}, [0, Infinity]);
	
			return mark[0];
		}
	
		function onMouseUp(event) {
			if (!isMouseDown) {
				return;
			}
			isMouseDown = false;
			// remove listeners
			document.removeEventListener('mousemove', onMouseMove);
			$knob[0].style.transform = 'scale(' + TRANSFORM_SCALE_NORMAL + ')';
			document.removeEventListener('mouseup', onMouseUp);
	
			// set transition to knob
			$knob.css('transition', '0.4s');
			// move knob to the nearest mark
			var nearest = findNearestMarkPosition(event);
	
			value = percentages.indexOf(nearest);
		}
	
		function onMouseMove(ev) {
			ev.preventDefault();
			if (!isMouseDown) {
				return;
			}
			var coord = getLeftPosition(ev);
	
			// remove transition property when move
			$knob.css('transition', 'none');
			// set knob position;
			$knob.css('left', coord);
			// listen to mouseup on the whole document
			document.addEventListener('mouseup', function (event) {
				if (!isMouseDown) {
					return;
				}
				isMouseDown = false;
				// remove listeners
				document.removeEventListener('mousemove', onMouseMove);
				$knob[0].style.transform = 'scale(' + TRANSFORM_SCALE_NORMAL + ')';
				document.removeEventListener('mouseup', onMouseUp);
	
				// set transition to knob
				$knob.css('transition', '0.4s');
				// move knob to the nearest mark
				var nearest = findNearestMarkPosition(event);
	
				value = percentages.indexOf(nearest);
			});
		}
	
		var onMouseDown = function onMouseDown(ev) {
			var target = ev.target;
			isMouseDown = true;
			if (target.getAttribute('data-slider') === 'slider-field') {
				// move knob to clicked position
				var coord = getLeftPosition(ev);
				$knob.css('transition', '0.5s');
				$knob.css('left', coord);
			} else if (target.getAttribute('data-slider') !== 'slider-knob') {
				return;
			} else {
				// scale triangle up a little
				target.style.transform = 'scale(' + TRANSFORM_SCALE_UP + ')';
				document.addEventListener('mousemove', onMouseMove);
			}
		};
	
		var init = function init() {
			// set initial value
			var coord = percentages[value] * $field[0].offsetWidth / 100 - $knob[0].offsetWidth / 2 + 'px';
			$knob.css('left', coord);
			// add onClick events for marks
			$el.on('click', function (ev) {
				var target = ev.target;
				if (target.getAttribute('data-slider') !== 'slider-mark') {
					return;
				}
	
				onMarkClick(target);
			});
	
			// add onMouseDown event list-group-item-danger
			$el.on('mousedown', onMouseDown);
			createScale();
		};
	
		// public function to find position of the knob (0 - n) where n is number of marks
		var getValue = function getValue() {
			return value;
		};
	
		return {
			getValue: getValue,
			init: init
		};
	};
	
	exports.default = Slider;

/***/ }

})
//# sourceMappingURL=0.021a0c3498422bc21eb4.hot-update.js.map