document.addEventListener('DOMContentLoaded', () => {
    const purchaseButtons = document.querySelectorAll('.purchase-btn');

    purchaseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const planType = button.dataset.planType; 

            const planCard = button.closest('.plan');
            let basePrice = 0;
            let formattedPrice = '';

            if (planCard) {
                const priceElement = planCard.querySelector('.plan-price');
                basePrice = parseFloat(priceElement.dataset.rawPrice); 
                formattedPrice = priceElement.textContent.trim(); 
            }

            sessionStorage.setItem('selectedPlanType', planType);
            sessionStorage.setItem('selectedPlanBasePrice', basePrice);
            sessionStorage.setItem('selectedPlanFormattedPrice', formattedPrice); 

            window.location.href = '../html/payment.html';
        });
    });
});