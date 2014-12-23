$(document).ready(function(){

    $(document).scroll(function() {
        if (isElementInViewport($("#no-parachute"))) {
            $(".skydiver-with-plane").addClass("-without-plane");
        }

        $('.transparent').each( function(i) {

            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_object) {
                $(this).animate({'opacity': '1'}, 1000);
            }
        });
    });


    function isElementInViewport (el) {
        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }
});