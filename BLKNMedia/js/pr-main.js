(function($){

    //PR Progress Bar Handler
    var PRProgressBarWidgetHandler = function ($scope,$){
        var progressbarElement = $scope.find('.pr-progressbar-progress-bar').each(function(){
            
            var settings = $(this).data('settings');
            
            var length  = settings['progress_length'];
            
            $(this).animate({width: length + '%'} , length * 25);
        });
    };
    //PR Progress Bar on Scroll Handler
    var PRProgressBarScrollWidgetHandler = function ($scope,$){
        elementorFrontend.waypoint($scope, function (direction) {
            PRProgressBarWidgetHandler($(this), $);
        }, {
            offset: $.waypoints('viewportHeight') - 150,
            triggerOnce: true
        });
    };

    //PR Grid Handler
    var WidgetPRPostGridHandler = function ($scope, $) {

        var $grid =  $scope.find('.pr-post-grid');
    
         $grid.imagesLoaded( function() {
    
          $grid.masonry({
              itemSelector: '.pr-grid-post',
              percentPosition: true,
              columnWidth: '.pr-post-grid-column'
            });
    
          });
    
    };

    //PR Testimonials Carousel Handler New

    var TestimonialSliderHandler = function ($scope, $) {
        var $testimonialSlider = $scope.find('.pre-testimonial-slider-main').eq(0),
            $pagination =
                $testimonialSlider.data('pagination') !== undefined
                    ? $testimonialSlider.data('pagination')
                    : '.swiper-pagination',
            $arrow_next =
                $testimonialSlider.data('arrow-next') !== undefined
                    ? $testimonialSlider.data('arrow-next')
                    : '.swiper-button-next',
            $arrow_prev =
                $testimonialSlider.data('arrow-prev') !== undefined
                    ? $testimonialSlider.data('arrow-prev')
                    : '.swiper-button-prev',
            $items =
                $testimonialSlider.data('items') !== undefined
                    ? $testimonialSlider.data('items')
                    : 3,
            $items_tablet =
                $testimonialSlider.data('items-tablet') !== undefined
                    ? $testimonialSlider.data('items-tablet')
                    : 3,
            $items_mobile =
                $testimonialSlider.data('items-mobile') !== undefined
                    ? $testimonialSlider.data('items-mobile')
                    : 3,
            $margin =
                $testimonialSlider.data('margin') !== undefined
                    ? $testimonialSlider.data('margin')
                    : 10,
            $margin_tablet =
                $testimonialSlider.data('margin-tablet') !== undefined
                    ? $testimonialSlider.data('margin-tablet')
                    : 10,
            $margin_mobile =
                $testimonialSlider.data('margin-mobile') !== undefined
                    ? $testimonialSlider.data('margin-mobile')
                    : 10,
            $effect =
                $testimonialSlider.data('effect') !== undefined
                    ? $testimonialSlider.data('effect')
                    : 'slide',
            $speed =
                $testimonialSlider.data('speed') !== undefined
                    ? $testimonialSlider.data('speed')
                    : 400,
            $autoplay =
                $testimonialSlider.data('autoplay_speed') !== undefined
                    ? $testimonialSlider.data('autoplay_speed')
                    : 999999,
            $loop =
                $testimonialSlider.data('loop') !== undefined
                    ? $testimonialSlider.data('loop')
                    : 0,
            $grab_cursor =
                $testimonialSlider.data('grab-cursor') !== undefined
                    ? $testimonialSlider.data('grab-cursor')
                    : 0,
            $centeredSlides = $effect == 'coverflow' ? true : false,
            $pause_on_hover =
                $testimonialSlider.data('pause-on-hover') !== undefined
                    ? $testimonialSlider.data('pause-on-hover')
                    : ''
    
        var $testimonialSliderOptions = {
            direction: 'horizontal',
            speed: $speed,
            effect: $effect,
            centeredSlides: $centeredSlides,
            grabCursor: $grab_cursor,
            autoHeight: true,
            loop: $loop,
            autoplay: {
                delay: $autoplay,
                disableOnInteraction: false
            },
            pagination: {
                el: $pagination,
                clickable: true,
            },
            navigation: {
                nextEl: $arrow_next,
                prevEl: $arrow_prev,
            },
        }
    
        if ($effect === 'slide' || $effect === 'coverflow') {
            $testimonialSliderOptions.breakpoints = {
                1024: {
                    slidesPerView: $items,
                    spaceBetween: $margin,
                },
                768: {
                    slidesPerView: $items_tablet,
                    spaceBetween: $margin_tablet,
                },
                320: {
                    slidesPerView: $items_mobile,
                    spaceBetween: $margin_mobile,
                },
            }
        } else {
            $testimonialSliderOptions.items = 1
        }
    
        var $testimonialSliderObj = swiperLoader(
            $testimonialSlider,
            $testimonialSliderOptions
        )
        $testimonialSliderObj.then( ( $testimonialSliderObj ) => {
            if ($autoplay === 0) {
                $testimonialSliderObj.autoplay.stop()
            }
    
            if ($pause_on_hover && $autoplay !== 0) {
                $testimonialSlider.on('mouseenter', function () {
                    $testimonialSliderObj.autoplay.stop()
                })
                $testimonialSlider.on('mouseleave', function () {
                    $testimonialSliderObj.autoplay.start()
                })
            }
            $testimonialSliderObj.update()
    
            //gallery pagination
            var $paginationGallerySelector = $scope
            .find('.pre-testimonial-slider .pre-testimonial-gallary-pagination')
            .eq(0)
            if ($paginationGallerySelector.length > 0) {
                swiperLoader($paginationGallerySelector, {
                    spaceBetween: 20,
                    centeredSlides: true,
                    touchRatio: 0.2,
                    slideToClickedSlide: true,
                    loop: true,
                    slidesPerGroup: 1,
                    loopedSlides: $items,
                    slidesPerView: 3,
                }).then(( $paginationGallerySlider) => {
                    $testimonialSliderObj.controller.control = $paginationGallerySlider
                    $paginationGallerySlider.controller.control = $testimonialSliderObj
                })
            }
        } );
    
    
        var $tabContainer = $('.pre-advance-tabs'),
            nav = $tabContainer.find('.pre-tabs-nav li'),
            tabContent = $tabContainer.find('.pre-tabs-content > div')
    
        nav.on('click', function () {
            var currentContent = tabContent.eq($(this).index()),
                sliderExist = $(currentContent).find(
                    '.swiper-container-wrap.pre-testimonial-slider'
                )
            if (sliderExist.length) {
                swiperLoader($testimonialSlider, $testimonialSliderOptions)
            }
        })
    
    }
    
    const swiperLoader = (swiperElement, swiperConfig) => {
        if ( 'undefined' === typeof Swiper ) {
            const asyncSwiper = elementorFrontend.utils.swiper;
            return new asyncSwiper( swiperElement, swiperConfig ).then( ( newSwiperInstance ) => {
                return  newSwiperInstance;
            } );
        } else {
            return swiperPromise( swiperElement, swiperConfig );
        }
    }
    
    const swiperPromise =  (swiperElement, swiperConfig) => {
        return new Promise((resolve, reject) => {
            const swiperInstance =  new Swiper( swiperElement, swiperConfig );
            resolve( swiperInstance );
        });
    }

    //PR Post Carousel Handler

    var WidgetPRPostCarouselHandler = function ($scope, $) {
        var carousel_wrap               = $scope.find('.pr-blog-carousel-wrap').eq(0),
            carousel                    = carousel_wrap.find('.pr-blog-carousel'),
            slider_options              = JSON.parse( carousel_wrap.attr('data-slider-settings') );

        var mySwiper = new Swiper(carousel, slider_options);
    };

    //PR Team Carousel Handler
    var WidgetPRPersonCarouselHandler = function ($scope, $) {
    
        var testimonials_elem = $scope.find('.pr-team-slider').eq(0);
    
        var settings = testimonials_elem.data('settings');
    
        testimonials_elem.slick({
            autoplay: settings['pr_team_slider_autoplay'],
            infinite: settings['pr_team_slide_infinite'],
            speed: settings['pr_team_slide_speed'],
            slidesToShow: settings['pr_team_slider_max_items'],
            slidesToScroll: settings['pr_team_slide_item'],
            arrows: settings['pr_team_arrows'],
            dots: settings['pr_team_dots'],
            pauseOnHover: settings['pr_team_slider_pause_hover'],
            draggable: settings['pr_team_slide_draggable'],
            centerMode: settings['pr_team_slide_center_mode'],
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                    slidesToShow: settings['pr_team_max_tab_item'],
                    slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                    slidesToShow: settings['pr_team_max_mobile_item'],
                    slidesToScroll: 1
                    }
                }
                ]
        });
    
    };

    //PR Image Carousel Handler
    var WidgetPRImageCarouselHandler = function ($scope, $) {
    
        var testimonials_elem = $scope.find('.pr-main-adv-carousel').eq(0);
    
        var settings = testimonials_elem.data('settings');
    
        testimonials_elem.slick({
            autoplay: settings['pr_carousel_image_autoplay'],
            infinite: settings['pr_carousel_image_infinite'],
            speed: settings['pr_carousel_image_speed'],
            slidesToShow: settings['pr_carousel_image_max_items'],
            slidesToScroll: settings['pr_carousel_image_slide_item'],
            arrows: settings['pr_carousel_image_arrows'],
            dots: settings['pr_carousel_image_dots'],
            pauseOnHover: settings['pr_carousel_image_pause_hover'],
            draggable: settings['pr_carousel_image_draggable'],
            centerMode: settings['pr_carousel_image_center_mode'],
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                    slidesToShow: settings['pr_carousel_image_max_tab_item'],
                    slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                    slidesToShow: settings['pr_carousel_image_max_mobile_item'],
                    slidesToScroll: 1
                    }
                }
                ]
        });
    
    };

    //PR Grid Handler
    var PRGridWidgetHandler = function($scope,$){    
        if ($().isotope === undefined) {
            return;
        }
        var gridElement = $scope.find('.pr-img-portfolio');
        if (gridElement.length === 0) {
            return;
        }
        var htmlContent = $scope.find('.pr-portfolio-container');
        var isotopeOptions = htmlContent.data('settings');
        if(isotopeOptions['img_size'] === 'original'){
            htmlContent.isotope({
            // options
                itemSelector: '.pr-portfolio-item',
                percentPosition: true,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            htmlContent.imagesLoaded(function () {
                htmlContent.isotope({layoutMode: 'masonry'});
            });
        } else if(isotopeOptions['img_size'] === 'one_size'){
            
            htmlContent.isotope({
            // options
                itemSelector: '.pr-portfolio-item',
                percentPosition: true,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            htmlContent.imagesLoaded(function () {
                htmlContent.isotope({layoutMode: 'fitRows'});
            });
        }
        $scope.find('.pr-portfolio-cats-container li a').click(function(e){
            e.preventDefault();        
            $scope.find('.pr-portfolio-cats-container li .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            htmlContent.isotope({filter: selector});
            return false;
        });
    };

    //PR Fancy Text Handler

	//PR Countdown Handler
    var PRCountDownHandler = function ($scope,$){
        var countDownElement = $scope.find('.pr-countdown').each(function(){
            var countDownSettings = $(this).data('settings');
            var label1 = countDownSettings['label1'],
                label2 = countDownSettings['label2'],
                newLabe1 = label1.split(','),
                newLabe2 = label2.split(',');
                if(countDownSettings['event'] === 'onExpiry'){
                    $(this).find('.pr-countdown-init').pr_countdown({
                        labels 		: newLabe2,
                        labels1 	: newLabe1,
                        until 		: new Date( countDownSettings['until'] ),
                        format 		: countDownSettings['format'],
                        padZeroes	: true,
                        onExpiry    : function() {
                            $(this).html(countDownSettings['text']);
                        },
                        serverSync : function() { return new Date(countDownSettings['serverSync']); }
                    });
                } else if(countDownSettings['event'] === 'expiryUrl') {
                    $(this).find('.pr-countdown-init').pr_countdown({
                        labels 		: newLabe2,
                        labels1 	: newLabe1,
                        until 		: new Date( countDownSettings['until'] ),
                        format 		: countDownSettings['format'],
                        padZeroes	: true,
                        expiryUrl   : countDownSettings['text'],
                        serverSync : function() { return new Date(countDownSettings['serverSync']); }
                    });
                }
                times = $(this).find('.pr-countdown-init').pr_countdown('getTimes');
                function runTimer( el ) {
                    return el == 0;
                    }
                if( times.every( runTimer ) ) {
                    if( countDownSettings['event'] === 'onExpiry' ){
                        $(this).find('.pr-countdown-init').html(countDownSettings['text']);
                    }
                    if( countDownSettings['event'] === 'expiryUrl' ){
                        var editMode = $('body').find('#elementor').length;
                        if( editMode > 0 ) {
                            $(this).find('.pr-countdown-init').html( '<h1>You can not redirect url from elementor Editor!!</h1>' );
                        } else {
                            window.location.href = countDownSettings['text'];
                        }
                    }				
                }
            });
        };
        
    //Elementor JS Hooks
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/pr-img-gallery.default',PRGridWidgetHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/pr-countdown-timer.default',PRCountDownHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/pr-testimonialslider.default', TestimonialSliderHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/pr-personcarousel.default', WidgetPRPersonCarouselHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/pr-imagecarousel.default', WidgetPRImageCarouselHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/pr-postgrid.default', WidgetPRPostGridHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/pr-postcarousel.default', WidgetPRPostCarouselHandler);
        if(elementorFrontend.isEditMode()){
            elementorFrontend.hooks.addAction('frontend/element_ready/pr-progressbar.default', PRProgressBarWidgetHandler);
        } else {
            elementorFrontend.hooks.addAction('frontend/element_ready/pr-progressbar.default', PRProgressBarScrollWidgetHandler);
        }
    });
})(jQuery);
