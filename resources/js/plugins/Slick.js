import 'slick-carousel';

export default class Slick {
    constructor() {
        this.init();
    }

    init() {
        this.reviewSliderInit();
        this.gallerySliderInit();
        this.recommendationsSliderInit();
    }

    reviewSliderInit() {

        $(document).find('.reviews-slider').each(function () {
            const $slider = $(this);
            const $prev = $(this).closest('section').find('.slick__prev');
            const $next = $(this).closest('section').find('.slick__next');
            $slider.slick({
                slidesToShow: 3,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: true,
                responsive: [

                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 601,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });

        });
        $(document).find('.review-car-slider').each(function () {
            const $slider = $(this);
            const $prev = $(this).closest('section').find('.slick__prev');
            const $next = $(this).closest('section').find('.slick__next');
            $slider.slick({
                slidesToShow: 1,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: false
            });

        });
    }
    recommendationsSliderInit() {

        $(document).find('.recommendations-slider').each(function () {
            const $slider = $(this);
            const $prev = $(this).closest('section').find('.slick__prev');
            const $next = $(this).closest('section').find('.slick__next');
            $slider.slick({
                slidesToShow: 3,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: true,
                responsive: [

                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 601,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });

        });
    }

    gallerySliderInit() {

        $(document).find('.single-gallery').each(function () {
            const $slider = $(this);
            const $section = $slider.closest('section');
            const $prev = $section.find('.slick__prev');
            const $next = $section.find('.slick__next');
            const $preview = $section.find('.single-gallery-preview');
            $slider.slick({
                slidesToShow: 1,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: false,
                asNavFor: $preview,
            });
            $preview.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: $slider,
                dots: false,
                centerMode: false,
                focusOnSelect: true,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 601,
                        settings: {
                            slidesToShow: 3
                        }
                    }
                ]
            });
        });
    }
}

