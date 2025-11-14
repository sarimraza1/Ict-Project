// Contact Form Handler
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const email = document.getElementById('email').value;
            const suggestion = document.getElementById('suggestion').value;

            // Simulate form submission (in real application, you'd send this to a server)
            console.log('Form submitted:', { email, suggestion });

            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';

            // Optional: Reset form after a delay if you want to allow multiple submissions
            setTimeout(() => {
                contactForm.reset();
                // Uncomment below if you want the form to reappear after some time
                // contactForm.style.display = 'block';
                // successMessage.style.display = 'none';
            }, 3000);
        });
    }
});
