
function calculatePriceDiscount(price, discount) {
    const priceDiscountInput = document.getElementById('price_discount');
    var priceDiscount = Math.ceil(price - price * discount / 100);
    priceDiscountInput.value = priceDiscount;
}