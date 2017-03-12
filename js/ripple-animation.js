'use strict';

$.fn.rippleEffect = function(options) {
	var $this = $(this),
  	options = $.extend({}, options),
  	rippleWidth = Math.max($this.outerWidth(), $this.outerHeight()),
  	rippleElClass = 'ripple-effect';

  $this.prepend(
  	$('<span>')
    	.addClass(rippleElClass)
  );

  $this.on('click', function(event) {
  	var $this = $(this),
    	$rippleEl = $this.children('span.' + rippleElClass),
      offset = $this.offset(),
      css = {
        width: 0,
        height: 0,
      	left: event.pageX - offset.left,
        top: event.pageY - offset.top,
        opacity: 1
			};

    $rippleEl
    	.stop()
      .css(css)
      .animate({
        width: rippleWidth * 2,
        height: rippleWidth * 2,
        left: css.left - rippleWidth,
        top: css.top - rippleWidth,
        opacity: 0
      }, 400, function() {
      	options.doneTrigger &&
					$this.trigger('doneRippleAnimation');
      });

    event.stopPropagation();
  });

  $this.on('doneRippleAnimation', function() {
		console.log('Done');
  });

  return $this;
};

$('#customerFeedback > li').rippleEffect({ doneTrigger: true });
