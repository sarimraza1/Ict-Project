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

            // Disable submit button and show loading state
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            submitButton.style.opacity = '0.6';

            try {
                // Send data to backend API
                const response = await fetch('/submit-feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, suggestion })
                });

                const data = await response.json();

                if (data.success) {
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';

                    // Reset form after a delay
                    setTimeout(() => {
                        contactForm.reset();
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                        submitButton.style.opacity = '1';
                    }, 3000);
                } else {
                    showError(data.message || 'An error occurred. Please try again.');
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    submitButton.style.opacity = '1';
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showError('Unable to connect to the server. Please make sure the server is running and try again.');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.style.opacity = '1';
            }
        });
    }
});
