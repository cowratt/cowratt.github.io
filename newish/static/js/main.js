$("#portfolioScroll").click(function() {
	console.log("test")
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#portfolio").offset().top
    }, 2000);
});


function ps(){
	console.log("test")
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#portfolio").offset().top
    }, 500);
}

$(function(){
	 //$('#carousel').carousel(2)
	console.log(location.hash)
	if(location.hash == "#art")
		$('#carousel-art').addClass("active")
	else if (location.hash == "#music")
		$('#carousel-music').addClass("active")
	else
		$('#carousel-main').addClass("active")
})