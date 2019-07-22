$(document).ready(function(){

	var dropZone = $("#upload-box"),
		maxFileSize = 1000000000; // max file size = 1Gb

	if (typeof(window.FileReader) == 'undefined') {
		dropZone.addClass("not-drop");
	};
	dropZone[0].ondragover = function() {
		dropZone.addClass('hover');
		return false;
	};
	dropZone[0].ondragleave = function() {
		dropZone.removeClass('hover');
		return false;
	};
	dropZone[0].ondrop = function(event) {
		event.preventDefault();
		dropZone.removeClass('hover');
		dropZone.addClass('drop');
	};


	$(".work-slider-box").slick({
		dots: false,
		infinite: false,
		appendArrows: $(".work-slider"),
		prevArrow:'<div class="work-slider-arr work-slider-left_arr"></div>',
		nextArrow:'<div class="work-slider-arr work-slider-right_arr"></div>'
	});

	$(".review-slider-box").slick({
		dots: false,
		infinite: true,
		appendArrows: $(".review-slider"),
		prevArrow:'<div class="review-slider-arr review-slider-left_arr"></div>',
		nextArrow:'<div class="review-slider-arr review-slider-right_arr"></div>'
	});

});