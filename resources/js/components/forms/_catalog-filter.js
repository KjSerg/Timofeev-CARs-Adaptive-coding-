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
        if(values.length === 0){
            $(document).find('.catalog-filter-item').removeClass('current');
        }else {
            $item.addClass('current');
        }
        $counter.text(values.length);
        $res.val(values.join(','));
        if ($this.hasClass('trigger-submit-on-change')) $form.trigger('submit');
    });
    $(document).on('click', '.catalog-filter-item__head', function (e) {
        e.preventDefault();
        const $t =  $(this);
        const $item = $t.closest('.catalog-filter-item');
        if($item.hasClass('active')){
            $item.removeClass('active');
        }else{
            $(document).find('.catalog-filter-item').removeClass('active');
            $item.addClass('active');
        }

    });
}