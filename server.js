const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API endpoint to handle contact form submission
app.post('/api/contact', async (req, res) => {
    console.log('Contact form submission received:', req.body);

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
            message: 'Suggestion must be at least 10 characters long'
        });
    }

    try {
        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Astropedia Suggestion from ${email}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${email}</p>
                <p><strong>Suggestion:</strong></p>
                <p>${suggestion}</p>
                <hr>
                <p><small>Team: ${process.env.EMAIL_TEAM || 'N/A'}</small></p>
            `
        });

        console.log('Email sent successfully');

        return res.status(200).json({
            success: true,
            message: 'Thank you for your suggestion! We will review it soon.'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to send your suggestion. Please try again later.',
            error: process.env.NODE_ENV === 'production' ? undefined : error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Export for Vercel serverless
module.exports = app;

// Only start server in development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
