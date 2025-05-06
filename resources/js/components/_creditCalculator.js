

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
        const commission = Number(creditData.commission);
        const annualRate = Number(creditData.annualRate);
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
        console.log(price)
        console.log(S)
        console.log(K)
        console.log(monthlyPayment)
        $priceOut.text(this.formatedNumber(price, dollarExchangeRate));
        $sumOut.text(this.formatedNumber(S, dollarExchangeRate));
        $commissionOut.text(this.formatedNumber(K, dollarExchangeRate));
        $paymentOut.text(this.formatedNumber(monthlyPayment, dollarExchangeRate));
    }

    formatedNumber(usdAmount, usdRate) {
        const uahAmount = Math.floor(usdAmount * usdRate);

        const formatNumber = (number) => {
            return number.toLocaleString('uk-UA');
        };

        return `${formatNumber(usdAmount)} $ / ${formatNumber(uahAmount)} грн`;
    }
}