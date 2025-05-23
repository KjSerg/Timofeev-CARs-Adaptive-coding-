import {showMsg} from "../../plugins/_fancybox-init";
import {selectrickInit} from "../../plugins/_selectric-init";
import {hidePreloader, showPreloader} from "../utils/_helpers";

const parser = new DOMParser();
let loading = false;
export const catalogFilterInit = () => {
    $(document).on('change', 'input[data-name]', function (e) {
        const $this = $(this);
        const type = $this.attr('type');
        const name = $this.attr('data-name');
        const $item = $this.closest('.catalog-filter-item');
        const $counter = $item.find('.counter');
        const $form = $this.closest('form');
        const $box = $form.find('.catalog-filter-box');
        const $list = $item.find('.catalog-filter-item-list');
        const $inputs = $list.find('input');
        let $res = $box.find(`input[name="${name}"]`);
        let values = [];
        if ($res.length === 0) {
            $box.append(`<input type="hidden" name="${name}" value="">`);
            $res = $box.find(`input[name="${name}"]`);
        }
        $inputs.each(function () {
            const $input = $(this);
            if ($input.prop('checked') === true) {
                values.push($input.val());
            }
        });
        if (values.length === 0) {
            $(document).find('.catalog-filter-item').removeClass('current');
        } else {
            $item.addClass('current');
        }
        $counter.text(values.length);
        $res.val(values.join(','));
        if ($this.hasClass('trigger-submit-on-change')) $form.trigger('submit');
    });
    $(document).on('click', '.catalog-filter-item__head', function (e) {
        e.preventDefault();
        const $t = $(this);
        const $item = $t.closest('.catalog-filter-item');
        if ($item.hasClass('active')) {
            $item.removeClass('active');
        } else {
            $(document).find('.catalog-filter-item').removeClass('active');
            $item.addClass('active');
        }
    });
    $(document).on('submit', '.filter-js111', function (e) {
        e.preventDefault();
        const $t = $(this);
        const url = $t.attr('action');
        const serialize = $t.serialize();
        $t.addClass('not-active');
        renderCatalog(url, serialize);
    });
    $(document).mouseup(function (e) {
        const div = $(document).find(".catalog-filter-item");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $(document).find('.catalog-filter-item').removeClass('active');
        }
    });
    $(document).on('submit', '.filter-js', function(e){
        e.preventDefault();
        var $form    = $(this);
        var base     = $form.data('archive-url').replace(/\/+$/,'');
        var modelRaw = $form.find('input[name="model"]').val().trim();
        var defaultOrder   = $form.data('default-order') || '';
        var url      = base + '/';

        if ( modelRaw ) {
            // ["Model 3","Model S"] → ["model-3","model-s"]
            var slugs = modelRaw.split(',')
                .map(function(s){
                    return s.toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9]+/g,'-')  // все не-лат.цифры в дефис
                        .replace(/(^-+|-+$)/g,'');   // обрезать лишние дефисы
                })
                .filter(Boolean)
                .join(',');

            // Новая ЧПУ-часть
            url = base + '/' + slugs + '/';
        }

        // 4) Собираем все GET-поля кроме model (он уже в пути)
        var paramsArray = $form.serializeArray().filter(function(f){
            if (f.name === 'model') return false;
            // убираем default-order
            if (f.name === '_order' && f.value === defaultOrder) return false;
            return true;
        });
        var query = $.param(paramsArray);

        $form.addClass('not-active');
        renderCatalog(url, query);
    });
}

export const renderCatalog = (url, data = {}, addToHistory = true) => {
    if ($(document).find('.container-js').length === 0) return;
    if (loading) return;
    loading = true;
    console.log(addToHistory)
    if (addToHistory) showPreloader();
    $.ajax({
        type: "GET",
        url: url,
        processData: false,
        contentType: false,
        data: data,
    }).done((response) => {
        const $r = $(parser.parseFromString(response, "text/html"));
        const $pagination = $r.find('.pagination-container');
        const $catalog = $r.find('.container-js');
        const $filter = $r.find('.catalog-filter');
        $(document).find('.pagination-container').html($pagination.html());
        $(document).find('.container-js').html($catalog.html());
        $(document).find('.filter-js').removeClass('not-active');
        loading = false;
        if (addToHistory) {
            let pushStateURL = url;
            if (typeof data === 'string') {
                pushStateURL += '?' + data;
            }
            history.pushState({}, "", pushStateURL);
        } else {
            $(document).find('.catalog-filter').html($filter.html());
            selectrickInit();
        }
        hidePreloader();
    }).fail((r) => {
        console.log(r);
        showMsg("error: " + r);
        // window.location.reload();
    });
}

window.onpopstate = (event) => {
    console.log(event)
    renderCatalog(document.location, '', false);
};