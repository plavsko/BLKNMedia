(function( $ ) {
    "use strict";
/*----------------------------------------------------------------------*/
/* =  Preloader
/*----------------------------------------------------------------------*/
    $(window).on('load', function () {
        anime.timeline({
                targets: '.preloader',
                easing: 'easeOutExpo',
            })
            .add({
                height: ['100vh', '0vh'],
                duration: 700,
                delay: 2000,
            })
            .add({
                offset: '-=400',
                complete: function (anim) {
                    document.querySelector('.preloader').remove();
                }
            })
            .add({
                offset: '-=1300',
                targets: '#site-wrapper',
                top: 0,
                duration: 700,
            })

        anime.timeline({
                easing: 'easeOutExpo',
            })
            .add({
                targets: '.preloader .txt',
                delay: 100,
                opacity: 1,
                duration: 700,
                translateY: ["30px", "0px"],
            })
            .add({
                targets: '.preloader .progress',
                offset: '-=400',
                opacity: 1,
                duration: 700,
            })
            .add({
                targets: ".preloader .progress .bar-loading",
                offset: '-=400',
                duration: 2000,
                width: ["0", "100%"],
            })
            .add({
                targets: '.preloader .loading',
                offset: '-=900',
                opacity: 0,
                duration: 1000,
                translateY: ["0", "-100px"],
            })
    });

/*----------------------------------------------------------------------*/
/* =  Mobile Menu Toggle
/*----------------------------------------------------------------------*/

    var scrollLink = $('ul.pr-main-menu li a, .pr__mobile__nav .menu .ul-menu > li >a');
    
    // Smooth scrolling
    scrollLink.click(function() {
    $('body,html').animate({
        scrollTop: $(this.hash).offset().top-68
    }, 800, 'easeInExpo' );
    });

    $('<div class="mobile-navigation-overlay"></div>').insertBefore('.mobile-navigation');
    $('.nav-toggle, .close-tigger, .mobile-navigation-overlay').on('click', function() {
        $('body, .mobile-navigation, .mobile-navigation-inner, .mobile-navigation-overlay').toggleClass('mobile-menu-opened');
    });

/*----------------------------------------------------------------------*/
/* =  Mobile Menu List
/*----------------------------------------------------------------------*/
    
    $(".pr__mobile__nav .ul-menu ul").slideUp(600);
        
    $(".pr__mobile__nav .ul-menu > li.menu-item-has-children > a").on("click", function (e) {
        $(".pr__mobile__nav .ul-menu ul").slideUp(600);
        if (!$(this).next().is(":visible")) {
            $(this).next().slideDown(600);
        }
        e.preventDefault();
    });
    $(".pr__mobile__nav .ul-menu > li.menu-item-has-children > ul > li.menu-item-has-children > a").on("click", function (e) {
        $(".pr__mobile__nav .ul-menu ul ul").slideUp(600);
        if (!$(this).next().is(":visible")) {
            $(this).next().slideDown(600);
        }
        e.preventDefault();
    });

/*----------------------------------------------------------------------*/
/* =  Add parent class If submenu goes outside
/*----------------------------------------------------------------------*/
function menus_dropdown_conditionally_open() {
    $(".primary-navigation .sub-menu .menu-item.menu-item-has-children").each(function(){ 
      if($(this).children('ul').length == 1) {
        var parent = $(this);
        var child_menu = $(this).children('ul');
        if( $(parent).offset().left + $(parent).width() + $(child_menu).width() > $(window).width() ){
          $(child_menu).addClass('pixe-left-align-sub-menu');
        } 
      }
    });
  };
  menus_dropdown_conditionally_open();

/*----------------------------------------------------------------------*/
/* =  Sticky Header Initialisation
/*----------------------------------------------------------------------*/
var sticky_nav = $('.pixe_sticky_header_holder .pr-primary-navigation > nav > ul.pr-main-menu');

var sticky = $('.pixe_sticky_header_holder');
UIkit.util.on(sticky, 'active', function () {
    sticky.addClass('show_sticky');
    UIkit.scrollspyNav(sticky_nav, {
        "offset": 0, 
        "closest": 'li', 
        "scroll": true,
    });

});
 
UIkit.util.on(sticky, 'inactive', function () {
    sticky.removeClass("show_sticky");
    UIkit.scrollspyNav(sticky_nav).$destroy();
});

var off_canvas = $('#navbar-mobile');

UIkit.util.on(off_canvas, 'shown', function () {
    off_canvas.addClass('offcanvas_anime')
});
UIkit.util.on(off_canvas, 'hidden', function () {
    off_canvas.removeClass('offcanvas_anime')
});

})(jQuery);