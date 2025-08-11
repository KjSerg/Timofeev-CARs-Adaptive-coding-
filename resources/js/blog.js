import $ from 'jquery';

window.$ = $;
window.jQuery = $;
import '@fancyapps/fancybox';
import {hidePreloader, moveToElement} from "./components/utils/_helpers";
import {showPreloader} from "./components/utils/_helpers";
import {isJsonString} from "./components/utils/_helpers";

const $document = $(document);
$(document).ready(function () {
    wrapArticleTables();
    createSidebarList();
    $(document).on('click', '.sidebar-js a', function (e) {
        e.preventDefault();
        const $t = $(this);
        const href = $t.attr('href');
        if (href === undefined || href === '#') return;
        const $el = $(document).find(href);
        if ($el.length === 0) return;
        $('html, body').animate({
            scrollTop: $el.offset().top
        });
    })
    $(document).on('click', '.single-article-comment__dislike, .single-article-comment__like', function (e) {
        e.preventDefault();
        const $t = $(this);
        const id = $t.attr('data-id');
        if (id === undefined || id === '') return;
        $t.addClass('not-active');
        $.ajax({
            type: 'POST',
            url: admin_ajax,
            data: {
                action: 'set_comment_reaction',
                id: id,
                is_like: $t.hasClass('single-article-comment__like'),
                nonce: timofeev_cars_ajax_nonce
            }
        }).done(function (r) {
            $t.removeClass('not-active');
            if (!r) return;
            if (!isJsonString(r)) console.log(r);
            const res = JSON.parse(r);
            const msg = res.msg;
            const type = res.type;
            if(msg !== undefined && msg !== ''){
                showMessage(msg);
            }
            if(type === 'error') return;
            $(document).find(`.single-article-comment__like[data-id="${id}"] .counter`).text(res.like || 0);
            $(document).find(`.single-article-comment__dislike[data-id="${id}"] .counter`).text(res.dislike || 0);
        });
    });
    $(document).on('click', '.next-comments-link-js', function (e) {
        e.preventDefault();
        const $t = $(this);
        const href = $t.attr('href');
        if (href === undefined || href === '') return;
        $t.addClass('not-active');
        showPreloader();
        $.ajax({
            type: 'GET',
            url: href,

        }).done(function (r) {
            hidePreloader();
            $t.removeClass('not-active');
            if (!r) return;
            const parser = new DOMParser();
            const $r = $(parser.parseFromString(r, "text/html"));
            const $pagination = $r.find('.single-article-comments-controls');
            const $catalog = $r.find('#article-comments-list');
            $(document).find('.single-article-comments-controls').html($pagination.html());
            $(document).find('#article-comments-list').append($catalog.html());
        });
    });
    $(document).on('submit', '.comments-form-js', function (e) {
        e.preventDefault();
        const $form = $(this);
        const formId = $form.attr('id');
        if (!validateForm($form)) return;
        const formData = new FormData(document.getElementById(formId));
        const args = {
            type: $form.attr('method') || "POST",
            url: $form.attr('action') || adminAjax,
            processData: false,
            contentType: false,
            data: formData,
        };
        sendRequest(args)
        if (!$form.hasClass('no-reset')) $form.trigger('reset');
    });
});

function wrapArticleTables() {
    $(document).find('.text table').each(function () {
        const $table = $(this);
        const $wrap = $table.closest('.single-article-table');
        if ($wrap.length === 0) $table.wrap('<div class="pricing-table single-article-table" />')
    })
}

function createSidebarList() {
    const $text = $(document).find('.single-article-container .text');
    const $sidebar = $(document).find('.sidebar-js');
    if ($sidebar.length === 0) return;
    let html = '';
    $text.each(function (i) {
        const $t = $(this);
        const $headers = $t.find('h1,h2,h3,h4,h5,h6');
        $headers.each(function (index) {
            const $this = $(this);
            const text = $this.text().trim();
            let id = $this.attr('id');
            if (id === undefined) {
                id = 'title-' + i + index;
                $this.attr('id', id);
            }
            html += `<li><a href="#${id}">${text}</a></li>`;
        });
    });
    $sidebar.html(html).addClass('active');

}

function validateForm($form) {
    let isValid = true;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    // Validate inputs and textareas
    $form.find('input, textarea').each((_, input) => {
        const $input = $(input);
        const $label = $input.closest('.form-label');
        const value = $input.val().trim();
        const regExp = $input.data('reg') ? new RegExp($input.data('reg')) : null;

        if ($input.attr('required') && (!value || (regExp && !regExp.test(value)))) {
            isValid = false;
            $input.addClass('error');
            $label.addClass('error');
            moveToElement($label);
        } else {
            $input.removeClass('error');
            $label.removeClass('error');
        }
    });

    // Validate select elements
    $form.find('select[required]').each((_, select) => {
        const $select = $(select);
        const $label = $select.closest('.form-label');
        const value = $select.val();
        const test = !value || value === null || (Array.isArray(value) && value.length === 0);

        if (test) {
            isValid = false;
            $label.addClass('error');
            moveToElement($label);
        } else {
            $label.removeClass('error');
        }
    });

    // Validate custom required inputs
    if (!validateRequiredInputs($form)) isValid = false;

    // Validate consent checkbox
    const $consent = $form.find('input[name="consent"]');
    if ($consent.length && !$consent.prop('checked')) {
        $consent.closest('.form-consent').addClass('error');
        isValid = false;
        moveToElement($consent.closest('.form-consent'));
    } else {
        $consent.closest('.form-consent').removeClass('error');
    }

    if ($form.find('.address-js').length > 0) {
        if ($form.find('.address-js').val() !== $form.find('.address-js').attr('data-selected')) {
            isValid = false;
            $form.find('.address-js').closest('.form-label').addClass('error');
            $form.find('.address-js').addClass('error');
            moveToElement($form.find('.address-js').closest('.form-label'));
        } else {
            $form.find('.address-js').closest('.form-label').removeClass('error');
            $form.find('.address-js').removeClass('error');
        }
    }

    return isValid;
}


function validateRequiredInputs($form) {
    const inputsGroup = {};
    let isValid = true;

    $form.find('[data-required]').each((_, input) => {
        const $input = $(input);
        const name = $input.attr('name');

        if (name) {
            if (!inputsGroup[name]) inputsGroup[name] = [];
            if ($input.prop('checked')) {
                inputsGroup[name].push($input.val());
            }
        }
    });

    Object.keys(inputsGroup).forEach((key) => {
        const isChecked = inputsGroup[key].length > 0;
        $form.find(`[name="${key}"]`).closest('.form-label').toggleClass('error', !isChecked);
        if (!isChecked) isValid = false;
    });

    return isValid;
}

function sendRequest(options) {
    showPreloader();
    $document.find('body').addClass('loading').addClass('sending-form');
    $.ajax(options).done((response) => {
        if (response) {
            hidePreloader();
            const isJson = isJsonString(response);
            if (isJson) {
                const data = JSON.parse(response);
                const message = data.msg || '';
                const text = data.msg_text || '';
                const type = data.type || '';
                const url = data.url || '';
                const reload = data.reload || '';
                const comment_html = data.comment_html || '';
                if (comment_html !== '') $document.find('#article-comments-list').html(comment_html);
                if (message !== '') {
                    showMessage(message, url);
                }
                if (url !== '') {
                    showPreloader();
                    window.location.href = url;
                    return;
                }
                if (reload === 'true') {
                    window.location.reload();
                }
            } else {
                showMessage(response);
            }

        }
    });
}

function showMessage(message, url = '') {
    const selector = '#dialog';
    const $modal = $(document).find(selector);

    if ($modal.length === 0) {
        alert(message);
        if (url !== '') {
            window.location.href = url;
        }
        return;
    }

    $modal.find('.modal__title').html(message);

    $.fancybox.open($modal, {
        afterClose: function () {
            if (url !== '') {
                window.location.href = url;
            }
        }
    });
}