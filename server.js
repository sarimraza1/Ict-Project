const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('static'));

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000
});

// Test email configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

// GET routes for serving HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/planets', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'planets.html'));
});

app.get('/galaxies', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'galaxies.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'contact.html'));
});

// API endpoint to handle contact form submission
app.post('/api/contact', async (req, res) => {
    const { email, suggestion } = req.body;

    // Validate email
    if (!email || !isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
        });
    }

    // Validate suggestion
    if (!suggestion || suggestion.trim().length < 10) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a suggestion with at least 10 characters'
        });
    }

    try {
        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Astropedia - Thank You for Your Feedback! 🌌',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .header {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            padding: 30px;
                            text-align: center;
                            border-radius: 10px 10px 0 0;
                        }
                        .content {
                            background: #f9f9f9;
                            padding: 30px;
                            border-radius: 0 0 10px 10px;
                        }
                        .greeting {
                            font-size: 24px;
                            margin-bottom: 20px;
                        }
                        .message {
                            background: white;
                            padding: 20px;
                            border-left: 4px solid #667eea;
                            margin: 20px 0;
                            border-radius: 5px;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 30px;
                            color: #666;
                            font-size: 14px;
                        }
                        .emoji {
                            font-size: 48px;
                            margin: 20px 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="emoji">🌌✨🚀</div>
                        <h1>Welcome to Astropedia!</h1>
                    </div>
                    <div class="content">
                        <p class="greeting">Dear Space Explorer,</p>
                        
                        <p>Thank you for reaching out to us! We're thrilled to have you as part of the Astropedia community.</p>
                        
                        <div class="message">
                            <strong>Your suggestion:</strong>
                            <p>${suggestion}</p>
                        </div>
                        
                        <p>We truly appreciate you taking the time to share your thoughts with us. Your feedback helps us improve and create a better experience for all space enthusiasts.</p>
                        
                        <p>Our team will carefully review your suggestion and consider it as we continue to expand our cosmic database. We're committed to making Astropedia the best resource for exploring the wonders of the universe!</p>
                        
                        <p>Feel free to reach out anytime you have more ideas, questions, or just want to share your passion for astronomy.</p>
                        
                        <p><strong>Keep exploring the cosmos!</strong> 🌟</p>
                        
                        <p>Best regards,<br>
                        <strong>The Astropedia Team</strong><br>
                        ICT Project - BAI-1C</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message from Astropedia</p>
                        <p>&copy; 2025 Astropedia | Exploring the Universe Together</p>
                    </div>
                </body>
                </html>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send success response
        res.json({
            success: true,
            message: 'Thank you! Your message has been received and a confirmation email has been sent.'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'There was an error processing your request. Please try again later.'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
