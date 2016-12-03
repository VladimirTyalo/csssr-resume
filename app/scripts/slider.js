import $ from 'jquery';

const Slider = element => {
	const $el = $(element);
	const $field = $el.find('[data-slider="slider-field"]');
	const $knob = $el.find('[data-slider="slider-knob"]');
	const $marks = $el.find('[data-slider="slider-mark"]');
	const TRANSFORM_SCALE_UP = 1.4;
	const TRANSFORM_SCALE_NORMAL = 1.0;
	let isMouseDown = false;
	// get array of % scale
	const percentages = $marks.map((idx, m) => Number(m.getAttribute('data-value'))).toArray();

	// value - corresponding index of percentages array this value returned by public API
	let value = 1;

	// get knob's css left attribute
	const getLeftAttr = mark => {
		const position = Number(mark.getAttribute('data-value'));
		const width = Number($field[0].offsetWidth);

		let left = null;
		if (position === 100) {
			left = width * (position / 100) - $knob[0].offsetWidth;
		}else {
			left = width * (position / 100) - $knob[0].offsetWidth / 2;
		}


		return left;
	};


	// click on item should move knob to mark position
	const onMarkClick = mark => {
		$knob.css('transition', 'scale 0.2s');
		$knob.css('left', getLeftAttr(mark) + 'px');

		value = percentages.indexOf(Number(mark.getAttribute('data-value')));
	};

	// render scale marks on the field
	const createScale = () => {
		const fragment = document.createDocumentFragment();

		$marks.each((idx, el) => {
			// create mark and set styles
			const mark = document.createElement('div');
			mark.style.position = 'absolute';
			mark.style.left = getLeftAttr(el) + 5 + 'px';
			mark.style.top = '-5px';
			// don't set 0 and 100% persent scale
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
		const fieldWidth = $field[0].offsetWidth;
		const halfKnob = $knob[0].offsetWidth / 2;
		// find left style parameter  for knob
		const rect = $field[0].getBoundingClientRect();
		// x coordinate of left edge of the knob relative to the field
		const left = ev.clientX - rect.left;
		// limit x movement and adjust to the knob width
		let coord;
		if (left + halfKnob < 0) {
			coord = -halfKnob;
		}else if (left + 2 * halfKnob > fieldWidth) {
			coord = fieldWidth - 2 * halfKnob;
		}else {
			coord = left - halfKnob;
		}

		return coord;
	}

	function findNearestMarkPosition(ev) {
		const coordInPercentages = getLeftPosition(ev) * 100 / $field[0].offsetWidth;
		const mark = percentages.reduce((acc, el) => {
			const delta = Math.abs(coordInPercentages - el);
			if (acc[1] > Math.abs(delta)) {
				return [el, delta];
			}
			return acc;
		}, [0, Infinity]);

		return mark[0];
	}

	function onMouseMove(ev) {
		ev.preventDefault();
		if (!isMouseDown) {
			return;
		}
		const coord = getLeftPosition(ev);

		// set knob position;
		$knob.css('left', coord);
		// listen to mouseup on the whole document
		document.addEventListener('mouseup', function onMouseUp(event) {
			if (!isMouseDown) {
				return;
			}
			isMouseDown = false;
			// remove listeners and styles
			document.removeEventListener('mousemove', onMouseMove);
			$knob[0].style.transform = `scale(${TRANSFORM_SCALE_NORMAL})`;
			document.removeEventListener('mouseup', onMouseUp);
			// move knob to the nearest mark
			const nearest = findNearestMarkPosition(event);
			let left = null;

			if (nearest === 100) {
				left = nearest * $field[0].offsetWidth / 100 - $knob[0].offsetWidth + 'px';
			}else {
				left = nearest * $field[0].offsetWidth / 100 - $knob[0].offsetWidth / 2 + 'px';
			}

			$knob.css('left', left);

			value = percentages.indexOf(nearest);
		});
	}


	const onMouseDown = ev => {
		const target = ev.target;
		isMouseDown = true;
		if (target.getAttribute('data-slider') !== 'slider-knob') {
			return;
		}

		// scale triangle up a little
		target.style.transform = `scale(${TRANSFORM_SCALE_UP})`;

		document.addEventListener('mousemove', onMouseMove);
	};


	const init = () => {
		// set initial value
		const coord = percentages[value] * $field[0].offsetWidth / 100 - $knob[0].offsetWidth / 2 + 'px';
		$knob.css('left', coord);
		// add onClick events for marks
		$el.on('click', ev => {
			const target = ev.target;
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
	const getValue = () => {
		return value;
	};


	return {
		getValue,
		init
	};
};

export default Slider;
