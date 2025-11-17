// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Display error message
function showError(message) {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: rgba(220, 53, 69, 0.1);
        border: 1px solid rgba(220, 53, 69, 0.5);
        color: #dc3545;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        animation: slideIn 0.3s ease-out;
    `;
    errorDiv.textContent = message;

    const form = document.getElementById('contactForm');
    if (form) {
        form.insertBefore(errorDiv, form.firstChild);

        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitButton = contactForm?.querySelector('button[type="submit"]');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const suggestion = document.getElementById('suggestion').value.trim();

            // Client-side validation
            if (!email) {
                showError('Please enter your email address');
                return;
            }

            if (!isValidEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }

            if (!suggestion) {
                showError('Please enter your suggestion');
                return;
            }

            if (suggestion.length < 10) {
                showError('Suggestion must be at least 10 characters long');
                return;
            }

            // Disable button and show loading
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            try {
                console.log('Sending request to /api/contact');

                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, suggestion })
                });

                console.log('Response status:', response.status);

                const data = await response.json();
                console.log('Response data:', data);

                if (response.ok && data.success) {
                    contactForm.reset();
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 5000);
                    }
                } else {
                    showError(data.message || 'Failed to send suggestion. Please try again.');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                showError('Unable to connect to the server. Please make sure the server is running and try again.');
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Suggestion';
                }
            }
        });
    }
});
