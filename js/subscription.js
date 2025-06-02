document.addEventListener('DOMContentLoaded', function() {
    const purchaseButtons = document.querySelectorAll('.purchase-btn');
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planType = this.closest('.plan').classList.contains('monthly-plan') ? 'monthly' : 'yearly';
           
            const planTitle = this.closest('.plan').querySelector('.plan-title').textContent;
            const planPrice = this.closest('.plan').querySelector('.plan-price').textContent.split('/')[0].trim();
           
            const paymentUrl = `payment.html?plan=${planType}&title=${encodeURIComponent(planTitle)}&price=${encodeURIComponent(planPrice)}`;
           
            window.location.href = paymentUrl;
        });
    });
  
    const planCards = document.querySelectorAll('.plan');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
   
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(item => item.classList.remove('active'));
       
            this.classList.add('active');
        });
    });

    purchaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.disabled = true;
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                this.style.opacity = '1';
            }, 3000);
        });
    });
});