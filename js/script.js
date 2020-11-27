/*const DEBOUNCE_DELAY = 100;

let scrollPos = 0,
	activeScreen = $("#screen1");


$(document).ready(function(){

	$(window).on("scroll", debounce(function() {
		
		let scrollTopStart = $(window).scrollTop(),
			nextScreen = $(activeScreen).data("next-screen"),
			prevScreen = $(activeScreen).data("prev-screen");

		if (scrollTopStart > scrollPos){
			
			let scrollTopEnd = $(nextScreen).offset().top,
				headerClass = $(nextScreen).data("header-class");
			
			$("#header").removeClass("negative").addClass(headerClass);
			$(window).scrollTop(scrollTopEnd);
			activeScreen = nextScreen;
			scrollPos = scrollTopEnd;
		} else {
			
			let scrollTopEnd = $(prevScreen).offset().top,
				headerClass = $(prevScreen).data("header-class");

			$("#header").removeClass("negative").addClass(headerClass);
			$(window).scrollTop(scrollTopEnd);
			activeScreen = prevScreen;
			scrollPos = scrollTopEnd;
		}
		
		scrollPos = scrollTopStart;
	
	}, DEBOUNCE_DELAY));

});

function debounce(f, t) {
	return function (args) {
		let previousCall = this.lastCall;
		this.lastCall = Date.now();
		if (previousCall && ((this.lastCall - previousCall) <= t)) {
			clearTimeout(this.lastCallTimer);
		}
		this.lastCallTimer = setTimeout(() => f(args), t);
	}
}*/
$(".screen4__btn").on("click", function() {
	let gallery = $(this).data("tab");
	
	$(".screen4__btn, .screen4-gallery").removeClass("active");
	$(this).addClass("active");
	$(gallery).addClass("active");

	return false;
});