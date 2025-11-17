const nodemailer = require('nodemailer');

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Serverless function handler
module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

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
        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

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

        return res.status(200).json({
            success: true,
            message: 'Thank you for your suggestion! We will review it soon.'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to send your suggestion. Please try again later.'
        });
    }
};