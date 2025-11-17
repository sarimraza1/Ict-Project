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
    service: 'gmail', // You can use other services like 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
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
    res.sendFile(path.join(__dirname, 'firstdraft', 'index.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'firstdraft', 'index.html'));
});

app.get('/planets', (req, res) => {
    res.sendFile(path.join(__dirname, 'firstdraft', 'planets.html'));
});

app.get('/galaxies', (req, res) => {
    res.sendFile(path.join(__dirname, 'firstdraft', 'galaxies.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'firstdraft', 'contact.html'));
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
            to: process.env.EMAIL_USER, // Send to yourself
            subject: `New Astropedia Suggestion from ${email}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366f1;">New Contact Form Submission</h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>From:</strong> ${email}</p>
                        <p><strong>Suggestion:</strong></p>
                        <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #6366f1;">
                            ${suggestion}
                        </p>
                    </div>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                    <p style="color: #6b7280; font-size: 14px;">
                        This message was sent from the Astropedia contact form.
                    </p>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Email sent successfully!'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email. Please try again later.'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
