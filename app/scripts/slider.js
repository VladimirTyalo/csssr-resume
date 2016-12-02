import $ from 'jquery';

const Slider = element => {
	const $el = $(element);
	const $field = $el.find('[data-slider="slider-field"]');
	const $knob = $el.find('[data-slider="slider-knob"]');
	const $marks = $el.find('[data-slider="slider-mark"]');
	const TRANSFORM_SCALE_UP = 1.4;
	const TRANSFORM_SCALE_NORMAL = 1.0;


	const getLeftAttr = mark => {
		const position = Number(mark.getAttribute('data-value'));
		const width = Number($field[0].offsetWidth);
		const left = width * (position / 100) - $knob[0].offsetWidth / 2;

		return left;
	};


	// click on item should move knob to mark position
	const onMarkClick = mark => {
		$knob.css('transition', '0.2s');
		$knob.css('left', getLeftAttr(mark) + 'px');
	};


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

	function onMouseMove(ev) {
		ev.preventDefault();

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
		} else if (left + 2 * halfKnob > fieldWidth) {
			coord = fieldWidth - 2 * halfKnob;
		} else {
			coord = left - halfKnob;
		}

		// set knob position;
		$knob.css('left', coord);
		// listen to mouseup on the whole document
		document.addEventListener('mouseup', function onMouseUp() {
			console.log("------- UP ----------")
			// remove listeners and styles
			document.removeEventListener('mousemove', onMouseMove);
			$knob[0].style.transform = `scale(${TRANSFORM_SCALE_NORMAL})`;
			// move knob to the nearest mark
		});
	}

	const onMouseDown = ev => {
		const target = ev.target;
		if (target.getAttribute('data-slider') !== 'slider-knob') {
			return;
		}

		// scale triangle up a little
		target.style.transform = `scale(${TRANSFORM_SCALE_UP})`;

		document.addEventListener('mousemove', onMouseMove);
	};


	const init = () => {
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
	};

	createScale();
	init();




	const getValue = () => {
		return -1;
	};


	return {
		getValue
	};
};

export default Slider;
