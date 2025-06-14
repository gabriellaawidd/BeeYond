document.addEventListener('DOMContentLoaded', () => {
    const paymentMethods = document.querySelectorAll('.method-box');
    const cardPaymentFields = document.getElementById('cardPaymentFields');
    const paypalPaymentFields = document.getElementById('paypalPaymentFields');
    const gpayPaymentFields = document.getElementById('gpayPaymentFields');
    const backButton = document.querySelector('.back-button');
    const purchaseButton = document.querySelector('.purchase-button');

    const basePriceElement = document.getElementById('basePrice');
    const totalPriceElement = document.getElementById('totalPrice');

    const selectedPlanType = sessionStorage.getItem('selectedPlanType');
    const storedBasePrice = parseFloat(sessionStorage.getItem('selectedPlanBasePrice'));
    const storedFormattedPrice = sessionStorage.getItem('selectedPlanFormattedPrice'); // This should already contain "/Month" or "/Year"
    const isLoggedIn = () => {
        return sessionStorage.getItem('isLoggedIn') === 'true';
    };

    const updatePurchaseButtonState = () => {
        if (isLoggedIn()) {
            purchaseButton.disabled = false;
            purchaseButton.style.cursor = 'pointer';
            purchaseButton.style.opacity = '1';
        } else {
            purchaseButton.disabled = false;
            purchaseButton.style.cursor = 'pointer';
            purchaseButton.addEventListener('click',()=>{
                const loginNotif = document.getElementById('loginNotif');
                if (loginNotif) {
                    loginNotif.style.display = 'block';
                }
                const loginMessage = document.getElementById('loginMessage');
                const loginButton = document.getElementById('loginButton');
                if (loginMessage) {
                    loginMessage.innerHTML = `You need to login first to subscribe.`;
                }
                if (loginButton) {
                    loginButton.addEventListener('click', () => {
                        window.location.href = '../html/login.html';
                    });
                }
            });
        }
    };

    const hideAllPaymentFields = () => {
        cardPaymentFields.style.display = 'none';
        paypalPaymentFields.style.display = 'none';
        gpayPaymentFields.style.display = 'none';
    };

    const showPaymentFields = (method) => {
        hideAllPaymentFields();
        cardPaymentFields.querySelectorAll('input').forEach(input => input.removeAttribute('required'));
        paypalPaymentFields.querySelectorAll('input').forEach(input => input.removeAttribute('required'));

        if (method === 'Visa' || method === 'MasterCard') {
            cardPaymentFields.style.display = 'block';
            cardPaymentFields.querySelectorAll('input').forEach(input => input.setAttribute('required', ''));
        } else if (method === 'Paypal') {
            paypalPaymentFields.style.display = 'block';
            paypalPaymentFields.querySelector('#paypalEmail').setAttribute('required', '');
        } else if (method === 'Gpay') {
            gpayPaymentFields.style.display = 'block';
        }
    };

    paymentMethods.forEach(methodBox => {
        methodBox.addEventListener('click', () => {
            paymentMethods.forEach(box => box.classList.remove('selected'));
            methodBox.classList.add('selected');

            const selectedMethod = methodBox.dataset.method;
            showPaymentFields(selectedMethod);
        });
    });

    const initialSelectedMethodBox = document.querySelector('.method-box.selected');
    if (initialSelectedMethodBox) {
        showPaymentFields(initialSelectedMethodBox.dataset.method);
    } else {
        document.querySelector('.method-box[data-method="Visa"]').classList.add('selected');
        showPaymentFields('Visa');
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = '../html/subscription.html';
        });
    }

    const paymentForm = document.querySelector('.payment-form');
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const selectedMethod = document.querySelector('.method-box.selected').dataset.method;
        const formData = new FormData(paymentForm);
        const paymentData = {};
        if(isLoggedIn()){
            if (selectedMethod === 'Visa' || selectedMethod === 'MasterCard') {
            paymentData.method = selectedMethod;
            paymentData.cardNumber = formData.get('cardNumber');
            paymentData.cvc = formData.get('cvc');
            paymentData.nameOnCard = formData.get('nameOnCard');
            paymentData.expMonth = formData.get('expMonth');
            paymentData.expYear = formData.get('expYear');
            paymentData.address = formData.get('address');
            paymentData.city = formData.get('city');
            paymentData.province = formData.get('province');
            paymentData.country = formData.get('country');

            if (!paymentData.cardNumber || !/^\d{13,19}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
                alert('Please enter a valid card number.');
                return;
            }
            if (!paymentData.cvc || !/^\d{3,4}$/.test(paymentData.cvc)) {
                alert('Please enter a valid CVC.');
                return;
            }
            if (!paymentData.expMonth || !/^(0[1-9]|1[0-2])$/.test(paymentData.expMonth)) {
                alert('Please enter a valid expiration month (MM).');
                return;
            }
            if (!paymentData.expYear || !/^\d{2}$/.test(paymentData.expYear)) {
                alert('Please enter a valid expiration year (YY).');
                return;
            }
            const currentYearLastTwoDigits = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;

            if (parseInt(paymentData.expYear) < currentYearLastTwoDigits ||
                (parseInt(paymentData.expYear) === currentYearLastTwoDigits && parseInt(paymentData.expMonth) < currentMonth)) {
                alert('Expiration date cannot be in the past.');
                return;
            }


            } else if (selectedMethod === 'Paypal') {
                paymentData.method = selectedMethod;
                paymentData.paypalEmail = formData.get('paypalEmail');
                if (!paymentData.paypalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentData.paypalEmail)) {
                    alert('Please enter a valid PayPal email address.');
                    return;
                }
                alert('Redirecting to PayPal for payment...');
            } else if (selectedMethod === 'Gpay') {
                paymentData.method = selectedMethod;
                alert('Initiating Google Pay transaction...');
            }
            paymentData.basePrice = storedBasePrice;
            localStorage.setItem('paymentData', JSON.stringify(paymentData));
            const subscriptionData = {
                plan: selectedPlanType,
                done: true,
            }
            localStorage.setItem('subscriptionData', JSON.stringify(subscriptionData));
            console.log('Payment data saved to localStorage:', paymentData);
            console.log('Subscription data saved to localStorage:', subscriptionData);
            const notificationBox = document.getElementById('notificationBox');
            if (notificationBox) {
                notificationBox.style.display = 'block';
            }
            const notificationMessage = document.getElementById('notificationMessage');
            const notificationButton = document.getElementById('notificationButton');
            if (notificationMessage) {
                notificationMessage.innerHTML = `Payment for <b style = "color: var(--primary)">${selectedPlanType} plan</b> with <b style = "color: var(--primary)">${paymentData.method}</b> initiated! Your subscription is now active!`;
            }
            if (notificationButton) {
                notificationButton.addEventListener('click', () => {
                    window.location.href = '../html/course.html';
                });
            }
        }
    });

    const calculateTotalPrice = (basePrice) => {
        const taxRate = 0.10;
        const totalPrice = basePrice * (1 + taxRate);
        totalPriceElement.textContent = `Rp ${totalPrice.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`;
    };

    const displayPrices = () => {
        if (!isNaN(storedBasePrice) && storedFormattedPrice) {
            basePriceElement.textContent = storedFormattedPrice; // Display the exact formatted price including "/Month" or "/Year"
            calculateTotalPrice(storedBasePrice);
        } else {
            // Fallback for when no price is stored (e.g., direct access)
            console.warn('No subscription plan found in session storage. Displaying default monthly price.');
            const defaultMonthlyRawPrice = 69000;
            const defaultMonthlyFormattedPrice = 'Rp69.000/Month'; // Match this to your subscription HTML
            
            basePriceElement.textContent = defaultMonthlyFormattedPrice;
            calculateTotalPrice(defaultMonthlyRawPrice);
        }
    };

    displayPrices();
    updatePurchaseButtonState();
});