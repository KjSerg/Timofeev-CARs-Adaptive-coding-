// $('.about-slider').slick({
//     arrows: true,
//     lazyLoad: 'ondemand',
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     variableWidth: true,
//     prevArrow: $('.about .prev'),
//     nextArrow: $('.about .next'),
//     centerMode: true,
//     centerPadding: '0',
//     responsive: [{
//         breakpoint: 993,
//         settings: {
//             variableWidth: false,
//             dots: true,
//             fade: true,
//             cssEase: 'linear',
//             slidesToShow: 1
//         }
//     }, {
//         breakpoint: 577,
//         settings: {
//             variableWidth: false,
//             dots: true,
//             fade: true,
//             cssEase: 'linear',
//             slidesToShow: 1
//         }
//     }]
//   });
  

// function initSlick() {
//     if ($(window).width() < 993) {
//         if (!$('.safety-wrap').hasClass('slick-initialized')) {
//             $('.safety-wrap').slick({
//                 arrows: true,
//                 lazyLoad: 'ondemand',
//                 loop: false,
//                 dots: true,
//                 prevArrow: $('.safety .prev'),
//                 nextArrow: $('.safety .next'),
//             });
//         }
//     } else {
//         if ($('.safety-wrap').hasClass('slick-initialized')) {
//             $('.safety-wrap').slick('unslick');
//         }
//     }
// }
// initSlick();
// $(window).on('resize', function () {
//     initSlick();
// });
// $('.equipment-slider').slick({
//   arrows: true,
//   slidesToShow: 3,
//   lazyLoad: 'ondemand',
//   slidesToScroll: 1,
//   variableWidth: true,
//   prevArrow: $('.equipment .prev'),
//   nextArrow: $('.equipment .next'),
//   centerMode: true,
//   centerPadding: '0',
//   responsive: [{
//       breakpoint: 993,
//       settings: {
//           variableWidth: false,
//           slidesToShow: 2
//       }
//   }, {
//       breakpoint: 577,
//       settings: {
//           variableWidth: false,
//           slidesToShow: 1
//       }
//   }]
// });

// $('.team-slider').slick({
//   arrows: true,
//   slidesToShow: 5,
//   lazyLoad: 'ondemand',
//   slidesToScroll: 1,
//   variableWidth: true,
//   prevArrow: $('.team-inner .prev'),
//   nextArrow: $('.team-inner .next'),
//   centerMode: true,
//   centerPadding: '0',
//   responsive: [{
//       breakpoint: 993,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//       }
//   },]
// });

// function gallerySlider() {
//     if (typeof $.fancybox === "undefined") {
//         console.error("Fancybox не завантажений! Переконайтеся, що бібліотека підключена.");
//         return;
//     }
//     $('.gallery-slider').slick({
//         arrows: true,
//         slidesToShow: 3,
//         lazyLoad: 'ondemand',
//         slidesToScroll: 1,
//         variableWidth: true,
//         prevArrow: $('.gallery .prev'),
//         nextArrow: $('.gallery .next'),
//         centerMode: true,
//         centerPadding: '0',
//         responsive: [{
//             breakpoint: 993,

//             settings: {
//                 variableWidth: false,
//                 slidesToShow: 3
//             }
//         }, {
//             breakpoint: 577,
//             settings: {
//                 variableWidth: false,
//                 slidesToShow: 1
//             }
//         }]
//     });
//     $("[data-fancybox]").fancybox({
//         loop: true,
//         beforeShow: function(instance, slide) {
//             $('.gallery-slider').slick('slickPause');
//         },
//         afterClose: function(instance, slide) {
//             $('.gallery-slider').slick('slickPlay');
//             $('.gallery-slider').slick('setPosition');
//         }
//     });
//     $('.gallery-slider').on('afterChange', function () {
//         $.fancybox.destroy(); 
//         $("[data-fancybox]").fancybox({
//           loop: true, 
//         }); 
//     });
// }
// gallerySlider();

// $('.reviews-slider').slick({
//   arrows: true,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   lazyLoad: 'ondemand',
//   variableWidth: true,
//   prevArrow: $('.reviews-nav .prev'),
//   nextArrow: $('.reviews-nav .next'),
//   centerMode: true,
//   centerPadding: '0',
//   responsive: [{
//       breakpoint: 993,
//       settings: {
//           variableWidth: false,
//           slidesToShow: 2
//       }
//   }, {
//       breakpoint: 577,
//       settings: {
//           variableWidth: false,
//           slidesToShow: 1
//       }
//   }]
// });
// $('.portfolio-slider').slick({
//   arrows: true,
//   slidesToShow: 1,
//   slidesToScroll: 1,
// });

// $('.about-slider, .equipment-slider, .safety-wrap, .team-slider, .gallery-slider, .reviews-slider').on('afterChange', function(event, slick, currentSlide){
//   $('img.lazy').Lazy('update');
// });
// $('.header-btn').on('click', function (e) {
//     e.preventDefault();
//     const $this = $(this);
//     $this.toggleClass('active');
//     $('.header').toggleClass('active');
//     $('body').toggleClass('scroll');
// });

// $('.btn-popup').on('click', function (e) {
//     e.preventDefault();
//     const $this = $(this);
//     const dataPopup = $this.data('popup');
//     $('.popup').removeClass('active');
//     $('body').addClass('scroll');
//     $('div[data-popup = '+dataPopup+']').addClass('active');
// });

// $('.popup-close, .popup-overlay').on('click', function (e) {
//     e.preventDefault();
//     $('body').removeClass('scroll');
//     $('.popup').removeClass('active');
// });
// $('.consultation-form').on('subit',  function(){
//     $('body').removeClass('scroll');
//     $('.popup').removeClass('active');
//     $('div[data-popup ="thn"]').addClass('active');
//     setTimeout(() => {
//         $('.popup').removeClass('active');
//     }, 2000); 
// })


// $(".playPauseBtn").click(function () {
//         const $ths = $(this);
//         const video = $(this).parents('section').find('.bg-video')[0];
//         if (video && typeof video.pause === "function") {
//             if (video.paused) {
//                 video.play();
//                 $ths.addClass('play');
//             } else {
//                 video.pause();
//                 $ths.removeClass('play');
//             }
//         } else {
//             console.log("Відео не знайдено або невірний тип!");
//         }
// });
// $('.seo .btn-secondary').on('click', function (e){
//     e.preventDefault();
//     $('.seo-text').toggleClass('active');
//     $(this).find('span').toggleClass('hidden')
// });

// function checkWidth() {
//     if ($(window).width() <= 768) {
//         $(".has-sub > a").off("click").on("click", function(e){
//             e.preventDefault();
//             $(this).next(".submenu").slideToggle(); 
//         });
//         $(".submenu li > a").off("click").on("click", function(e){
//             e.preventDefault();
//             $(".submenu li > ul").css('display', 'none');
//             $(this).next().slideToggle(); 
//             $(this).toggleClass('active');
//         });
//         $("h4").off("click").on("click", function(e){
//             e.preventDefault();
//             $(this).toggleClass('active');
//             $(this).next().slideToggle(); 
//         });
//     } else {
//         $(".has-sub > a, .submenu li > a").off("click"); 
//     }
// }

// $(document).ready(checkWidth);
// $(window).resize(checkWidth);
// $("iframe, picture, img.lazy").Lazy();

// $(function(){
//     $('.lazy-bg').Lazy({
//       afterLoad: function(element) {
//         // Ensure the data attribute exists and is not undefined
//         var bgUrl = element.data('src');
//         if (bgUrl) {
//           element.css('background-image', 'url(' + bgUrl + ')');
//         } else {
//             }
//       }
//     });
//   });
//   $(function(){
//   $(".bg-video.lazy").Lazy({
//     beforeLoad: function(element) {
//       // Якщо в data-poster задано постер, встановлюємо його
//       var poster = element.data("poster");
//       if (poster) {
//         element.attr("poster", poster);
//       }
//       // Встановлюємо src для всіх <source> елементів
//       element.find("source").each(function(){
//         var src = $(this).data("src");
//         if (src) {
//           $(this).attr("src", src);
//         }
//       });
//     },
//     afterLoad: function(element) {
//       // Викликаємо load() на нативному елементі відео, щоб розпочати завантаження
//       element[0].load();
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", function() {
//     const lazyVideos = document.querySelectorAll("video.bg-video.lazy");
//     if ("IntersectionObserver" in window) {
//       let videoObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             let video = entry.target;
//             // Set poster if available
//             const poster = video.dataset.poster;
//             if (poster) {
//               video.setAttribute("poster", poster);
//               video.removeAttribute("data-poster");
//             }
//             // Set each source's src attribute
//             video.querySelectorAll("source").forEach(source => {
//               const src = source.dataset.src;
//               if (src) {
//                 source.setAttribute("src", src);
//               }
//             });
//             video.load();
//             observer.unobserve(video);
//           }
//         });
//       });
//       lazyVideos.forEach(video => {
//         videoObserver.observe(video);
//       });
//     } else {
//       // Fallback: load videos immediately
//       lazyVideos.forEach(video => {
//         const poster = video.dataset.poster;
//         if (poster) {
//           video.setAttribute("poster", poster);
//           video.removeAttribute("data-poster");
//         }
//         video.querySelectorAll("source").forEach(source => {
//           const src = source.dataset.src;
//           if (src) {
//             source.setAttribute("src", src);
//           }
//         });
//         video.load();
//       });
//     }
//   });
//   AOS.init({disable: 'mobile',});
$(document).ready(function() {
    var $tabsContainer = $('.tab-nav');
    var $tabs = $('.tab-nav a');
    var $highlight = $('<span class="highlight"></span>');
    $tabsContainer.append($highlight);
    function setHighlight($element) {
      var rect = $element[0].getBoundingClientRect();
      var containerRect = $tabsContainer[0].getBoundingClientRect();
      $highlight.css({
        width: rect.width + 'px',
        left: (rect.left - containerRect.left) + 'px'
      });
    }
    $tabs.on('mouseenter', function() {
      setHighlight($(this));
    }).on('mouseleave', function() {
      setHighlight($('.tab-nav a.active'));
    }).on('click', function(e) {
        e.preventDefault();
      $('.tab-nav a').removeClass('active');
      $(this).addClass('active');
      setHighlight($(this));
    });
    
    $(window).on('load', function() {
      setHighlight($('.tab-nav a.active'));
    });
  });
  