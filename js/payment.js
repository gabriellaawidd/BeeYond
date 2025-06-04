document.addEventListener('DOMContentLoaded', () => {
    const methodBoxes = document.querySelectorAll('.method-box');

    methodBoxes.forEach(box => {
        box.addEventListener('click', () => {
            methodBoxes.forEach(item => item.classList.remove('selected'));
            box.classList.add('selected');
        });
    });

    const paymentForm = document.querySelector('.payment-form');
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const cardNumber = document.getElementById('cardNumber').value;
        const cvc = document.getElementById('cvc').value;
        const nameOnCard = document.getElementById('nameOnCard').value;

        if (cardNumber.trim() === '' || cvc.trim() === '' || nameOnCard.trim() === '') {
            alert('Please fill in all required payment information fields.');
            return;
        }

        console.log('Form submitted:', {
            cardNumber: cardNumber,
            cvc: cvc,
            nameOnCard: nameOnCard,
        });
        alert('Subscription purchased successfully!');

    });
});