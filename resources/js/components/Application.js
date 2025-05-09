import {detectBrowser, hidePreloader, isHorizontal, isMobile, showPreloader} from "./utils/_helpers";
import {burger} from "./ui/_burger";
import {accordion} from "./ui/_accardion";
import {numberInput} from "./forms/_number-input";
import {showPassword} from "./forms/_show-password";
import {fancyboxInit, showNotices} from "../plugins/_fancybox-init";
import {selectrickInit} from "../plugins/_selectric-init";
import FormHandler from "./forms/FormHandler";
import {toggler} from "./ui/_togglers";
import {tabs} from "./ui/_tabs";
import Slick, {initGallery} from "../plugins/Slick";
import {catalogFilterInit, renderCatalog} from "./forms/_catalog-filter";
import {copyLink} from "./ui/_copy-link";
import {showText} from "./ui/_show-text";
import {hoveredModel} from "./ui/_models";
import {rangeInit} from "../plugins/_rangeslider";
import {Calculator} from "./_creditCalculator";

export default class Application {
    constructor() {
        this.$doc = $(document);
        this.$body = $("body");
        this.parser = new DOMParser();
        this.init();
    }

    init() {
        this.initBrowserAttributes();
        this.initComponents();
    }

    showLoaderOnClick() {
        this.$doc.on('click', 'a.show-load, .header a, .footer a', function (e) {
            let href = $(this).attr('href') || '';
            let target = $(this).attr('target') || '';
            let test = !href.includes('#') &&
                !href.includes('tel') &&
                !href.includes('mailto') &&
                target !== '_blank';
            if (test) {
                showPreloader();
                setTimeout(hidePreloader, 3000);
            }

        });
    }

    initBrowserAttributes() {
        const browserName = detectBrowser();
        this.$body.attr("data-browser", browserName).addClass(browserName);
        $(window).on('load resize', (e) => {
            const attr = window.innerWidth > window.innerHeight ? 'horizontal' : 'vertical'
            this.$body.attr("data-screen-position", attr);
            this.$body.attr("data-mobile", isMobile ? "mobile" : '');
        });
    }

    cutTextInit() {
        this.$doc.find('.cut-text-js').each(function () {
            let $wrap = $(this);
            let $text = $wrap.find('.text');
            let $b = $wrap.find('.text-hidden__button');
            $text.css('height', 'auto');
            let textHeight = $text.height();
            $text.removeAttr('style');
            if (textHeight <= $text.height()) {
                $b.hide();
            } else {
                $b.show();
            }
        });
    }

    initComponents() {
        let t = this;

        this.$doc.ready(() => {
            hidePreloader();
            showNotices();
            burger();
            toggler();
            accordion();
            numberInput();
            showPassword();
            selectrickInit();
            fancyboxInit();
            tabs();
            catalogFilterInit();
            copyLink();
            showText();
            hoveredModel();
            initGallery();
            rangeInit();
            t.cutTextInit();
            t.loadMore();
            this.showLoaderOnClick();
            this.linkListener();
            this.mainProductTrigger();
            const form = new FormHandler('.form-js');
            const slick = new Slick();
            slick.gallerySliderRefresh();
            const calculator = new Calculator();
            calculator.selfInit();
        });

    }


    linkListener() {
        const t = this;
        this.$doc.on('click', 'a[href*="#"]:not(.fancybox, .accordion-head, .single-gallery__image, .cars-head__link)', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (href === '#') return;
            const hashValue = href.split('#')[1];
            if (hashValue !== undefined) {
                const $el = t.$doc.find('#' + hashValue);
                if ($el.length > 0) {
                    if ($t.hasClass('not-scroll')) return;
                    $('html, body').animate({
                        scrollTop: $el.offset().top
                    });
                    return;
                }
            }
            window.location.href = href;
        });
        this.$doc.on('click', '[data-link]', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('data-link');
            if (href === '#') return;
            const hashValue = href.split('#')[1];
            if (hashValue !== undefined) {
                const $el = t.$doc.find('#' + hashValue);
                if ($el.length > 0) {
                    $('html, body').animate({
                        scrollTop: $el.offset().top
                    });
                    return;
                }
            }
            window.location.href = href;
        });
        this.$doc.on('click', '.set-showed-language-modal', function (e) {
            e.preventDefault();
            const $t = $(this);
            const date = new Date();
            date.setTime(date.getTime() + (90 * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = "showed_modal_language=true;" + expires + ";path=/";
        });
    }

    mainProductTrigger() {
        this.$doc.on('click', '.main-product-box__item', function (e) {
            e.preventDefault();
            const $t = $(this);
            window.location.href = $t.attr('href');
        });
        this.$doc.on('click', '.main-product', function (e) {
            e.preventDefault();
            const $t = $(this);
            const $box = $t.find('.main-product-box');
            if ($(window).width() > 1023) return;
            $box.addClass('active');
        });
        this.$doc.mouseup(function (e) {
            var div = $('.main-product-box');
            if (!div.is(e.target)
                && div.has(e.target).length === 0) {
                div.removeClass('active');
            }
        });
    }
    loadMore() {
        let load = false;
        const parser = new DOMParser();
        $(document).on('click', '.button-load-more', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (load) return;
            const $pagination = $(document).find('.pagination-container');
            showPreloader();
            $pagination.addClass('not-active');
            $t.addClass('not-active');
            $.ajax({
                type: 'GET',
                url: href,
            }).done(function (r) {
                hidePreloader();
                let $requestBody = $(parser.parseFromString(r, "text/html"));
                $(document).find('.container-js').append($requestBody.find('.container-js').html());
                $pagination.html($requestBody.find('.pagination-container').html());
                load = false;
                $pagination.removeClass('not-active');
                $t.remove();
            });
        });
    }
}