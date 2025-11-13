// ==========================================
// GLOBAL VARIABLES
// ==========================================
const API_KEY = '75a41027238be6bca9820ca740639b4c';
let currentTheme = 'dark';

// ==========================================
// WEATHER FETCHING FUNCTIONALITY
// ==========================================
async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    
    if (city === '') {
        showAlert('Please enter a city name!', 'warning');
        return;
    }
    
    const btn = document.querySelector('.search-btn');
    const btnText = btn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // Loading state
    btnText.textContent = 'Searching...';
    btn.classList.add('loading');
    btn.disabled = true;
    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        // Animate the update
        animateWeatherUpdate(data);
        
    } catch (error) {
        showAlert(`Error: ${error.message}. Please try another city.`, 'error');
        resetWeatherDisplay();
    } finally {
        btnText.textContent = originalText;
        btn.classList.remove('loading');
        btn.disabled = false;
    }
}

// ==========================================
// QUICK SEARCH FUNCTIONALITY
// ==========================================
function quickSearch(cityName) {
    document.getElementById('cityInput').value = cityName;
    getWeather();
}

// ==========================================
// ANIMATE WEATHER UPDATE
// ==========================================
function animateWeatherUpdate(data) {
    const weatherCard = document.querySelector('.weather-card');
    
    // Add fade animation
    weatherCard.style.opacity = '0';
    weatherCard.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        updateWeatherDisplay(data);
        weatherCard.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        weatherCard.style.opacity = '1';
        weatherCard.style.transform = 'scale(1)';
        
        // Apply temperature-based styling
        applyTemperatureTheme(data.main.temp);
    }, 100);
}

// ==========================================
// UPDATE WEATHER DISPLAY
// ==========================================
function updateWeatherDisplay(data) {
    // Location info
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('countryName').textContent = data.sys.country;
    
    // Temperature
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('feelsLike').textContent = Math.round(data.main.feels_like);
    
    // Weather condition
    const condition = data.weather[0].description;
    document.getElementById('condition').textContent = condition;
    
    // Weather icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;
    
    // Details
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    
    // Update time
    updateCurrentTime();
    
    // Add entrance animations to details
    animateDetails();
}

// ==========================================
// APPLY TEMPERATURE THEME
// ==========================================
function applyTemperatureTheme(temp) {
    const weatherCard = document.querySelector('.weather-card');
    
    // Remove existing theme classes
    weatherCard.classList.remove('hot', 'cold', 'moderate');
    
    if (temp > 30) {
        weatherCard.classList.add('hot');
        createFireParticles();
    } else if (temp < 10) {
        weatherCard.classList.add('cold');
        createSnowParticles();
    } else {
        weatherCard.classList.add('moderate');
    }
}

// ==========================================
// PARTICLE EFFECTS
// ==========================================
function createFireParticles() {
    const weatherInfo = document.querySelector('.weather-icon-container');
    removeParticleEffects();
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'temp-particle fire';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ef4444;
            border-radius: 50%;
            animation: rise ${1 + Math.random()}s ease-in infinite;
            left: ${20 + Math.random() * 60}%;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        weatherInfo.appendChild(particle);
    }
}

function createSnowParticles() {
    const weatherInfo = document.querySelector('.weather-icon-container');
    removeParticleEffects();
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'temp-particle snow';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #3b82f6;
            border-radius: 50%;
            animation: fall ${2 + Math.random()}s linear infinite;
            left: ${20 + Math.random() * 60}%;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        weatherInfo.appendChild(particle);
    }
}

function removeParticleEffects() {
    const particles = document.querySelectorAll('.temp-particle');
    particles.forEach(p => p.remove());
}

// Add particle animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes rise {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-50px); opacity: 0; }
    }
    @keyframes fall {
        0% { transform: translateY(-50px); opacity: 1; }
        100% { transform: translateY(50px); opacity: 0; }
    }
    .weather-icon-container {
        position: relative;
        overflow: visible;
    }
`;
document.head.appendChild(style);

// ==========================================
// ANIMATE DETAILS
// ==========================================
function animateDetails() {
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 * index);
    });
}

// ==========================================
// RESET WEATHER DISPLAY
// ==========================================
function resetWeatherDisplay() {
    document.getElementById('cityName').textContent = 'Not Found';
    document.getElementById('countryName').textContent = 'Please try again';
    document.getElementById('temperature').textContent = '--';
    document.getElementById('condition').textContent = 'City not found';
    document.getElementById('feelsLike').textContent = '--';
    document.getElementById('humidity').textContent = '--%';
    document.getElementById('windSpeed').textContent = '-- km/h';
    document.getElementById('pressure').textContent = '-- hPa';
    document.getElementById('visibility').textContent = '-- km';
}

// ==========================================
// UPDATE CURRENT TIME
// ==========================================
function updateCurrentTime() {
    const timeElement = document.getElementById('currentTime');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
}

// ==========================================
// ALERT SYSTEM
// ==========================================
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#6366f1'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Add alert animations
const alertStyle = document.createElement('style');
alertStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(alertStyle);

// ==========================================
// THEME TOGGLE
// ==========================================
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const themeIcon = document.querySelector('.theme-icon');
    
    if (currentTheme === 'light') {
        themeIcon.textContent = '☀️';
        showAlert('Light mode coming soon!', 'info');
    } else {
        themeIcon.textContent = '🌙';
    }
}

// ==========================================
// ANIMATED COUNTER
// ==========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.feature-card, .table-section, .stats-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate counters when stats section is visible
                if (entry.target.classList.contains('stats-section')) {
                    animateCounters();
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    reveals.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}

// ==========================================
// ENTER KEY SUPPORT
// ==========================================
function setupEnterKey() {
    const input = document.getElementById('cityInput');
    if (input) {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                getWeather();
            }
        });
    }
}

// ==========================================
// PARALLAX EFFECT
// ==========================================
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.05;
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// LOADING SCREEN
// ==========================================
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        inset: 0;
        background: #0f172a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease-out;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 60px; height: 60px; border: 4px solid rgba(99, 102, 241, 0.2); border-top-color: #6366f1; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem;"></div>
            <p style="color: #cbd5e1; font-weight: 600;">Loading WeatherSphere...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    showLoadingScreen();
    setupEnterKey();
    setupParallax();
    setupSmoothScroll();
    revealOnScroll();
    updateCurrentTime();
    setupFAQ();
    
    // Character counter for contact form
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', updateCharCount);
        updateCharCount();
    }
    
    // Update time every minute
    setInterval(updateCurrentTime, 60000);
    
    // Auto-search for a default city on load (only on home page)
    if (document.getElementById('cityInput')) {
        setTimeout(() => {
            const defaultCity = 'London';
            document.getElementById('cityInput').value = defaultCity;
            getWeather();
        }, 1000);
    }
});

// ==========================================
// FORM VALIDATION FOR CONTACT PAGE
// ==========================================
function submitForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation logic
    if (name.length < 2) {
        showAlert('Name must be at least 2 characters long!', 'warning');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        showAlert('Please enter a valid email address!', 'warning');
        return;
    }
    
    if (message.length < 10) {
        showAlert('Message must be at least 10 characters long!', 'warning');
        return;
    }
    
    // Success message with animation
    showAlert(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
    
    // Clear form with animation
    const form = document.getElementById('contactForm');
    form.style.opacity = '0';
    form.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        form.reset();
        updateCharCount();
        form.style.transition = 'all 0.3s ease-out';
        form.style.opacity = '1';
        form.style.transform = 'scale(1)';
    }, 300);
}

// ==========================================
// CHARACTER COUNTER FOR TEXTAREA
// ==========================================
function updateCharCount() {
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (textarea && charCount) {
        charCount.textContent = textarea.value.length;
        
        if (textarea.value.length > 450) {
            charCount.style.color = '#f59e0b';
        } else if (textarea.value.length > 480) {
            charCount.style.color = '#ef4444';
        } else {
            charCount.style.color = '';
        }
    }
}

// ==========================================
// FAQ ACCORDION
// ==========================================
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('cityInput')?.focus();
    }
    
    // Escape to blur search
    if (e.key === 'Escape') {
        document.getElementById('cityInput')?.blur();
    }
});
