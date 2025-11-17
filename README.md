# 🌌 Astropedia - Explore the Universe

> Deployed URL: `https://ict-project-25-ye8i3.sevalla.app/`

**ICT Project 25K | Section: BAI-1C**

A modern, interactive web application for exploring our solar system and beyond with local image assets and a contact form powered by Node.js backend.

---

## 👥 Team Members
- **Sarim Raza** - Lead Developer
- **Taher Mustansir** - Developer (on vacations)
- **Baray Bhai** - Developer (probably gambling)

---

## 📋 Project Overview

Astropedia is a clean, responsive web application that provides an immersive experience exploring planets and galaxies. Built with vanilla JavaScript and featuring a Node.js/Express backend for contact form functionality with email notifications.

### ✨ Key Features

- 🪐 **9 Celestial Bodies** - All 8 planets + the Sun with detailed information and local images
- 🌌 **5 Galaxies** - Explore Milky Way, Andromeda, Whirlpool, Sombrero, and Triangulum
- 📧 **Contact Form** - Backend-powered contact form with email notifications via Nodemailer
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast & Lightweight** - Clean CSS, minimal dependencies
- 🎨 **Modern Design** - Animated starfield backgrounds, shooting stars, asteroids, and smooth transitions
- ♿ **Accessible** - Keyboard navigation support (ESC to close modals)
- 🖼️ **Local Images** - All space images stored locally for fast, reliable loading

---

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, CSS Variables, Keyframe Animations)
- **Vanilla JavaScript (ES6+)** - DOM manipulation, form validation, Fetch API

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web server framework
- **Nodemailer** - Email sending functionality
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

---

## 📁 Project Structure

```
Ict-Project/
├── static/
│   ├── index.html       # Landing page with hero section and animated effects
│   ├── planets.html     # 9 celestial bodies (8 planets + Sun) with facts
│   ├── galaxies.html    # 5 galaxies with detailed information
│   ├── contact.html     # Contact form page
│   ├── style.css        # Complete styles with animations
│   ├── script.js        # Contact form validation & API submission
│   └── images/          # All space images (14 PNG files)
│       ├── mercury.png
│       ├── venus.png
│       ├── earth.png
│       ├── mars.png
│       ├── jupiter.png
│       ├── saturn.png
│       ├── uranus.png
│       ├── neptune.png
│       ├── sun.png
│       ├── milkyway.png
│       ├── andromeda.png
│       ├── whirlpool.png
│       ├── sombrero.png
│       └── trainglum.png
├── server.js            # Express server with API endpoints and email handling
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables (not tracked in git)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A Gmail account (for email notifications) or other SMTP service

### Installation Steps

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd Ict-Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the project root:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3000
   ```

   **Important for Gmail users:**
   - You need to use an **App Password**, not your regular Gmail password
   - Enable 2-Factor Authentication on your Gmail account
   - Generate an App Password: [Google Account > Security > App Passwords](https://myaccount.google.com/apppasswords)
   - Use the 16-character app password in the `.env` file

4. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🎯 How It Works

### Frontend Pages

#### 1. Home Page (`index.html`)
- Hero section with gradient text
- Animated shooting stars and asteroids
- Feature cards highlighting key sections
- Navigation to Planets and Galaxies pages

#### 2. Astro Gang (`planets.html`)
- Displays 9 celestial bodies in a grid layout
- Each card shows planet name, image, and brief description
- Click any card to open modal with detailed facts:
  - Age
  - Diameter
  - Year length
  - Number of moons (for planets)
  - Temperature (for Sun)

**Planets included:** Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Sun

#### 3. Galaxies (`galaxies.html`)
- Displays 5 galaxies in a grid layout
- Each card shows galaxy name, image, and description
- Click to view detailed facts:
  - Galaxy type
  - Diameter
  - Number of stars
  - Distance from Earth / Age

**Galaxies included:** Milky Way, Andromeda, Whirlpool, Sombrero, Triangulum

#### 4. Contact Page (`contact.html`)
- Email validation (proper format check)
- Suggestion text area (minimum 10 characters)
- Real-time validation feedback
- Success message on submission
- Error handling for network issues

### Backend API

#### Server Endpoints

**Static File Serving:**
- All files in `static/` folder are served automatically
- CSS, JS, images, and HTML files accessible via HTTP

**API Endpoint:**
```
POST /api/contact
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "suggestion": "Your feedback here..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

**Features:**
- Email validation (regex-based)
- Input sanitization
- Email notification to site owner
- Confirmation email to user
- Error handling for SMTP issues

---

## 🎨 Design Features

### CSS Animations

1. **Starfield Background**
   - Twinkling stars using CSS animations
   - Multiple star layers for depth effect

2. **Shooting Stars**
   - Three animated shooting stars
   - Different trajectories and timing
   - Smooth fade-in/fade-out effects

3. **Asteroids**
   - Floating asteroids with rotation
   - Random positioning and animation delays

4. **Card Hover Effects**
   - Scale transformation
   - Box-shadow glow
   - Smooth transitions

5. **Modal Animations**
   - Slide-up entrance effect
   - Fade-in overlay
   - Keyboard accessible (ESC to close)

### Responsive Design

**Breakpoint: 768px**
- Single column layout on mobile
- Adjusted font sizes
- Touch-friendly buttons
- Optimized image sizes
- Simplified navigation

---

## 📊 Performance Metrics

- **Total Dependencies:** 4 (Express, Nodemailer, CORS, dotenv)
- **Dev Dependencies:** 1 (Nodemon)
- **Static Assets:** 14 images + CSS + JS
- **No external API calls** - All data is local
- **Fast load time** - Static files served by Express
- **Browser Support:** All modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

---

## 📧 Email Configuration

### Gmail Setup (Recommended)

1. Enable 2-Factor Authentication
2. Generate App Password
3. Add to `.env` file:
   ```env
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASS=your-16-char-app-password
   ```

### Alternative SMTP Services

You can use other email services by modifying `server.js`:

**Outlook/Hotmail:**
```javascript
const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

**Custom SMTP:**
```javascript
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

---

## 🎓 Educational Value

This project demonstrates:
- ✅ **Full-Stack Development** - Frontend + Backend integration
- ✅ **RESTful API** - POST endpoint with JSON responses
- ✅ **Form Validation** - Client-side and server-side validation
- ✅ **Email Integration** - SMTP with Nodemailer
- ✅ **Environment Variables** - Secure credential management
- ✅ **DOM Manipulation** - Dynamic content generation
- ✅ **CSS Animations** - Keyframe animations and transitions
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Error Handling** - User-friendly error messages
- ✅ **ES6+ JavaScript** - Modern syntax and patterns

---

## 🐛 Troubleshooting

### Server won't start
- **Check Node.js version:** `node --version` (should be v14+)
- **Reinstall dependencies:** `rm -rf node_modules && npm install`
- **Check port availability:** Change `PORT` in `.env` if 3000 is in use

### Email not sending
- **Verify credentials:** Check `.env` file has correct email/password
- **Gmail users:** Must use App Password, not regular password
- **Check console:** Look for error messages in terminal
- **Test connection:** Server logs "Server is ready to send emails" on successful config

### Images not loading
- **Check file paths:** All images should be in `static/images/`
- **Verify filenames:** Match exactly (case-sensitive)
- **Browser console:** Check for 404 errors

### Contact form not working
- **Server running:** Ensure `npm start` is active
- **Check URL:** Form submits to `http://localhost:3000/api/contact`
- **CORS issues:** Server has CORS enabled for all origins
- **Browser console:** Look for JavaScript errors

---

## 🔒 Security Notes

- **Never commit `.env` file** - Already in `.gitignore`
- **Use environment variables** - For all sensitive data
- **App Passwords** - More secure than regular passwords
- **Input validation** - Both client and server-side
- **No SQL injection risk** - No database used
- **HTTPS recommended** - For production deployment

---

## 🚀 Deployment

### Deploying to Production

1. **Choose a hosting platform:**
   - Heroku
   - Vercel
   - Railway
   - DigitalOcean
   - AWS

2. **Set environment variables** on hosting platform

3. **Update email credentials** for production

4. **Consider using transactional email service:**
   - SendGrid
   - Mailgun
   - AWS SES
   - More reliable than Gmail for production

---

## 📝 Future Enhancements

Potential features to add:
- [ ] Database integration for storing messages
- [ ] Admin panel to view submissions
- [ ] More galaxies and planets
- [ ] Search functionality
- [ ] Dark/Light mode toggle
- [ ] Language translations
- [ ] Social media sharing
- [ ] Quiz or interactive learning section

---

## 📄 License

ISC License - Free to use and modify for educational purposes.

---

## 🙏 Acknowledgments

- Team members for their contributions (even while on vacation or gambling 😄)
- Space images are for educational purposes
- Built with ❤️ for ICT Project BAI-1C

---

## 📞 Contact

For questions or suggestions, use the contact form on the website or reach out to the team members.

**Happy Space Exploring! 🚀🌟**
