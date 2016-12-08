import $ from 'jquery';

function Slider(element) {
	const $slider = (element instanceof jQuery) ? element : $(element);
	const $knob = $slider.find('[data-slider="slider-knob"]');
	let isDragging = false;

	// set x coordinate of the knob when moving
	function setX(clientX) {
		const sliderOffsetLeft = $slider.offset().left;
		let positionLeft = clientX - sliderOffsetLeft - $knob.width() / 2;

		// set boundaries for positionLeft
		if (positionLeft < 0) {
			positionLeft = -$knob.width() / 2;
		} else if (positionLeft > $slider[0].offsetWidth - $knob.width() / 2) {
			positionLeft = $slider[0].offsetWidth - $knob.width() / 2;
		}

		// move knob by dragging it with the mouse or touch
		if (isDragging) {
			$knob.addClass('slider__knob_scale')
				.css('left', positionLeft);
			return;
		}

		// when knob moving by clicking/tapping on the slider add transition class
		// and after transitioning remove class
		Promise.resolve($knob.addClass('slider__knob_move'))
			.then(() => {
				$knob.addClass('slider__knob_move');
			})
			.then($knob.css('left', positionLeft))
			.then(() => setTimeout(() => $knob.removeClass('slider__knob_move'), 500))
			.catch(err => console.log(err));
	}

	function touchStart(ev) {
		ev.preventDefault();
		const target = ev.target;

		if (target.getAttribute('data-slider') !== 'slider-knob') {
			const clientX = ev.originalEvent.touches[0].clientX;
			setX(clientX);
		} else {
			isDragging = true;
			$slider.on('touchmove', touchMove);
		}

	}

	function touchMove(ev) {
		ev.preventDefault();
		setX(ev.originalEvent.touches[0].clientX);
		window.addEventListener('touchend', touchEnd);
	}


	function onMouseDown(ev) {
		ev.preventDefault();
		const target = ev.target;

		if (target.getAttribute('data-slider') !== 'slider-knob') {
			$slider.on('click', e => {
				setX(e.clientX);
			});
			return;
		}

		isDragging = true;
		window.addEventListener('mousemove', moveStart);
	}

	function mouseUp(ev) {
		ev.preventDefault();
		// remove listeners
		window.removeEventListener('mousemove', moveStart);
		window.removeEventListener('mouseup', mouseUp);
		isDragging = false;
		$knob.removeClass('slider__knob_scale');
	}

	function touchEnd(ev) {
		$slider.unbind('touchmove', touchMove);
		window.removeEventListener('touchEnd', touchEnd);
		isDragging = false;
	}

	function moveStart(ev) {
		ev.preventDefault();
		setX(ev.clientX);
		window.addEventListener('mouseup', mouseUp);
	}


	return {
		init: () => {
			$slider.on('mousedown', onMouseDown);
			$slider.on('touchstart', touchStart);
		}
	};

}


export default Slider;
