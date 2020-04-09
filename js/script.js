$(document).ready(function(){

	$("#main-carousel1").slick({
		infinite: false,
		appendArrows: "#main-carousel1__nav"
	});
	
	$("#main-carousel2").slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: false,
		appendArrows: "#main-carousel2__nav"
	});
	
	$("#main-carousel3").slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: false,
		appendArrows: "#main-carousel3__nav"
	});

});

jQuery.exists = function(selector) {
	return ($(selector).length > 0);
}