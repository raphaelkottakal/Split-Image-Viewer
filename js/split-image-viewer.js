(function($) {

	// Function to set height as per image ratio
	function setHeight($target, ratio) {

		var width = $target.width();

		$target.css({ height: width * ratio, position: 'relative' });
	};

	$.fn.spliter = function(data) {

		var $this = this;

		$this.css({ 'max-width': '360px', background: 'red' });

		var settings = $.extend({
			maxWidth: 360,
			imageRatio: 1,
			center: 54,
			slideText: 'Slide'
		}, data.settings);


		// set height to container on load
		setHeight($this, settings.imageRatio);
		// set height on window resize
		$(window).resize(function() {
			setHeight($this, settings.imageRatio);
		});

		// componetns
		var $after = $('<div/>').css({
						'background-image': 'url(' + data.after + ')',
					    'background-size': 'cover',
					    'position': 'relative',
					    'width': '100%',
					    'height': '100%',
					    'margin': 0
					}),
		$before = $('<div/>').css({
						'background-image': 'url(' + data.before + ')',
					    'background-size': 'cover',
					    'position': 'absolute',
					    'width': settings.center + '%',
					    'overflow': 'hidden',
					    'bottom': 0,
					    'height': '100%'
					}),
		$slider = $('<input/>', {
						type: 'range',
						min: 0,
						max: 100,
						value: settings.center
					}).css({
						'-webkit-appearance': 'none',
						'-moz-appearance': 'none',
						'position': 'absolute',
						'top': 0,
						'left': 0,
						'width': '100%',
						'height': '100%',
						'margin': 0,
						'background': 'none'

					}),
		$slideBtn = $('<div/>').text(settings.slideText).css({
						'position': 'absolute',
						'top': '50%',
						'left': settings.center + '%',
						'background-color': '#888',
						'color': 'white',
						'padding': '0 2%',
						'font-weight': '500',
						'border-radius': '3px'
					});

		// Append before and after images
		$after.appendTo($this).append($before);

		// Append slider
		$this.append($slider).append($slideBtn);

		// negative margin to center div
		$slideBtn.css({ 'margin-left': '-' + $slideBtn.outerWidth() / 2 + 'px' });

		// Bind input movement to fuction
		$slider.bind('input',function() {

			$before.css({ width: $(this).val() + '%' });
			$slideBtn.hide();
		});


		return $this;

	}

	$('.target').spliter(object);

})(jQuery);