document.addEventListener('DOMContentLoaded', () => {
    const methodBoxes = document.querySelectorAll('.method-box');

    methodBoxes.forEach(box => {
        box.addEventListener('click', () => {
            methodBoxes.forEach(item => item.classList.remove('selected'));
            box.classList.add('selected');
        });
    });

    const basePriceElement = document.getElementById('basePrice');
    const billingCycleElement = document.getElementById('billingCycle');
    const totalPriceElement = document.getElementById('totalPrice');

    const selectedPlanType = sessionStorage.getItem('selectedPlanType'); 
    const selectedPlanBasePrice = parseFloat(sessionStorage.getItem('selectedPlanBasePrice')); 
    const taxRate = 0.10; 
    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const displayPrices = () => {
        let currentBasePrice = selectedPlanBasePrice;
        let cycleText = "";

        if (selectedPlanType === 'monthly') {
            cycleText = "/Month";
        } else if (selectedPlanType === 'yearly') {
            cycleText = "/Year";
        } else {
            console.warn("No subscription plan type found in sessionStorage. Displaying default/fallback prices.");
            currentBasePrice = 69000; 
            cycleText = "/Month";
        }

        const calculatedTax = currentBasePrice * taxRate;
        const finalTotalPrice = currentBasePrice + calculatedTax;

        basePriceElement.textContent = formatRupiah(currentBasePrice);
        billingCycleElement.textContent = cycleText;
        totalPriceElement.textContent = formatRupiah(finalTotalPrice);
    };

    displayPrices();

    const paymentForm = document.querySelector('.payment-form');
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        let isValid = true;
        let errorMessage = '';

        const selectedMethodBox = document.querySelector('.method-box.selected');
        const paymentMethod = selectedMethodBox ? selectedMethodBox.dataset.method : null; 

        const cardNumber = document.getElementById('cardNumber').value.trim();
        const cvc = document.getElementById('cvc').value.trim();
        const nameOnCard = document.getElementById('nameOnCard').value.trim();
        const expMonth = document.getElementById('expMonth').value.trim(); 
        const expYear = document.getElementById('expYear').value.trim();     
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const province = document.getElementById('province').value.trim();
        const country = document.getElementById('country').value.trim();

        if (!paymentMethod) {
            isValid = false;
            errorMessage = 'Please select a payment method.';
        } else if (paymentMethod === 'Visa' || paymentMethod === 'MasterCard') {
            if (cardNumber === '' || !/^\d{16}$/.test(cardNumber)) { 
                isValid = false;
                errorMessage = 'Please enter a valid 16-digit card number.';
            } else if (cvc === '' || !/^\d{3,4}$/.test(cvc)) { 
                isValid = false;
                errorMessage = 'Please enter a valid 3 or 4-digit CVC.';
            } else if (expMonth === '' || !/^(0[1-9]|1[0-2])$/.test(expMonth)) { 
                isValid = false;
                errorMessage = 'Please enter a valid expiration month (MM).';
            } else if (expYear === '' || !/^\d{2}$/.test(expYear)) { 
                isValid = false;
                errorMessage = 'Please enter a valid expiration year (YY).';
            } else if (!isExpirationDateValid(expMonth, expYear)) { 
                isValid = false;
                errorMessage = 'Card expiration date is in the past.';
            } else if (nameOnCard === '') {
                isValid = false;
                errorMessage = 'Please enter the name on your card.';
            } else if (address === '' || city === '' || province === '' || country === '') {
                isValid = false;
                errorMessage = 'Please fill in all billing address fields.';
            } else {
                isValid = true;
            }
        } else if (paymentMethod === 'Paypal' || paymentMethod === 'Gpay') { 
            if (address === '' || city === '' || province === '' || country === '') {
                isValid = false;
                errorMessage = 'Please fill in your billing address for this payment method.';
            }
        } else {
            isValid = false;
            errorMessage = 'Unknown payment method selected.';
        }

        if (!isValid) {
            alert('Payment Error: ' + errorMessage);
        } else {
            console.log('Payment details submitted:', {
                selectedPaymentMethod: paymentMethod,
                cardNumber: (paymentMethod === 'Visa' || paymentMethod === 'MasterCard') ? cardNumber : 'N/A',
                cvc: (paymentMethod === 'Visa' || paymentMethod === 'MasterCard') ? cvc : 'N/A',
                expirationMonth: (paymentMethod === 'Visa' || paymentMethod === 'MasterCard') ? expMonth : 'N/A',
                expirationYear: (paymentMethod === 'Visa' || paymentMethod === 'MasterCard') ? expYear : 'N/A',
                nameOnCard: nameOnCard,
                address: address,
                city: city,
                province: province,
                country: country,
                subscriptionTypeDisplayed: selectedPlanType,
                basePriceDisplayed: basePriceElement.textContent,
                totalPriceDisplayed: totalPriceElement.textContent,
            });

            alert('Subscription purchased successfully!');
        }
    });

    function isExpirationDateValid(month, year) {
        const currentYear = new Date().getFullYear() % 100; 
        const currentMonth = new Date().getMonth() + 1; 

        const expMonthNum = parseInt(month, 10);
        const expYearNum = parseInt(year, 10);

        if (expYearNum < currentYear) {
            return false;
        }
        if (expYearNum === currentYear && expMonthNum < currentMonth) {
            return false;
        }
        return true;
    }
});