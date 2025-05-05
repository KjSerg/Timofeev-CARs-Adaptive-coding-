import $ from 'jquery';
import 'ion-rangeslider';

export const rangeInit = () => {
    $(document).ready(function () {
        $(".range-slider").each(function () {
            const $inp = $(this);
            let min = $inp.attr('data-min');
            let max = $inp.attr('data-max');
            let from = $inp.attr('data-from');
            let step = $inp.attr('data-step');
            let postfix = $inp.attr('data-postfix');
            min = min !== undefined ? Number(min) : 1;
            max = max !== undefined ? Number(max) : 10000000000000000000;
            from = from !== undefined ? Number(from) : min;
            step = step !== undefined ? Number(step) : step;
            postfix = postfix || '';
            $inp.ionRangeSlider({
                min: min,
                max: max,
                from: from,
                step: step,
                postfix: postfix,
                skin: "round",
                onChange: function (data) {
                    console.log(data)
                    $inp.closest('.calculator-item').find('.range-slider-value').text(data.from_pretty + postfix);
                }
            });
        })
    });
}