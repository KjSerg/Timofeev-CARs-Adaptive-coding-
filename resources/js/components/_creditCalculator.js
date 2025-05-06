import {isInRange} from "./utils/_helpers";

export class Calculator {

    selfInit() {
        const t = this;
        $(document).find('.credit-calculator').each(function () {
            t.calculate($(this));
        });
    }

    calculate($item) {
        console.log($item)
        const $priceInput = $item.find('.credit-input-price');
        const $advancePaymentInput = $item.find('.credit-input-advance-payment');
        const $periodInput = $item.find('.credit-input-period');
        if ($priceInput.length === 0) return;
        if ($advancePaymentInput.length === 0) return;
        if ($periodInput.length === 0) return;
        let price = $priceInput.val();
        let advancePayment = $advancePaymentInput.val();
        let period = $periodInput.val();
        price = Number(price.trim());
        advancePayment = Number(advancePayment.trim());
        period = Number(period.trim());
        console.log(price)
        if (isNaN(price)) return;
        if (isNaN(advancePayment)) return;
        if (isNaN(period)) return;
        const data = this.getRateCommission(period, advancePayment);
        const commission = data.commission;
        const annualRate = data.rate;
        const dollarExchangeRate = Number(creditData.dollarExchangeRate);
        let advancePaymentCoefficient = 1 - (advancePayment / 100);
        let S = price * advancePaymentCoefficient;
        let K = S * (commission / 100);
        let monthlyRate = annualRate / 1200;
        let variable = Math.pow((1 + monthlyRate), period);
        let monthlyPaymentCoef = (monthlyRate * variable) / (variable - 1);
        let monthlyPayment = S * monthlyPaymentCoef;
        const $priceOut = $item.find('.credit-out-price');
        const $sumOut = $item.find('.credit-out-sum');
        const $commissionOut = $item.find('.credit-out-commission');
        const $paymentOut = $item.find('.credit-out-payment');
        $priceOut.text(this.formatedNumber(price, dollarExchangeRate));
        $sumOut.text(this.formatedNumber(S, dollarExchangeRate));
        $commissionOut.text(this.formatedNumber(K, dollarExchangeRate));
        $paymentOut.text(this.formatedNumber(monthlyPayment, dollarExchangeRate));
    }

    formatedNumber(usdAmount, usdRate) {
        let n = Number(usdAmount.toFixed(0));
        const uahAmount = Math.floor(n * usdRate);

        const formatNumber = (number) => {
            return number.toLocaleString('uk-UA');
        };

        return `${formatNumber(n)} $ / ${formatNumber(uahAmount)} грн`;
    }

    getRateCommission(period, advancePayment) {
        const annualRates = creditData.annualRates || [];
        const res = {
            rate: 0,
            commission: 0
        };
        if (annualRates.length === 0) return res;
        annualRates.forEach(function (item) {
            const _period = item.period;
            const min = _period[0];
            const max = _period[1];
            if (isInRange(period, min, max)) {
                res.commission = item.commission;
                let values = item.values;
                values.forEach(function (value) {
                    const _percents = value.percent;
                    const _min = _percents[0];
                    const _max = _percents[1];
                    if (isInRange(advancePayment, _min, _max)) {
                        res.rate = value.value;
                    }
                });
            }
        });
        return res;
    }
}