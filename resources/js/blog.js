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