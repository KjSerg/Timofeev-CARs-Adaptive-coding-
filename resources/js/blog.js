import {hidePreloader} from "./components/utils/_helpers";
import {showPreloader} from "./components/utils/_helpers";
import {isJsonString} from "./components/utils/_helpers";

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
            url: adminAjax,
            data: {
                action: 'set_comment_reaction',
                id: id,
                is_like: $t.hasClass('single-article-comment__like')
            }
        }).done(function (r) {
            $t.removeClass('not-active');
            if (!r) return;
            if (!isJsonString(r)) console.log(r);
            const res = JSON.parse(r);
            $(document).find(`.single-article-comment__like[data-id="${id}"] .counter`).text(res.like || 0);
            $(document).find(`.single-article-comment__dislike[data-id="${id}"] .counter`).text(res.dislike || 0);
        });
    })
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