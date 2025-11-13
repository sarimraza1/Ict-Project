# 🌌 Astropedia - Explore the Universe

**ICT Project 25K | Section: BAI-1C**

A modern, fast, and interactive web application for exploring our solar system and beyond using real NASA imagery.

---

## 👥 Team Members
- **Sarim Raza** - Lead Developer
- **Taher Mustansir** - Developer
- **Baray Bhai** - Developer

---

## 📋 Project Overview

Astropedia is a clean, responsive web application that provides an immersive experience exploring planets and galaxies. Built with vanilla JavaScript and powered by NASA's public API, it offers high-quality space imagery without requiring any authentication or API keys.

### ✨ Key Features

- 🪐 **8 Planets** - Complete information on all solar system planets with official NASA images
- 🌌 **5 Galaxies** - Explore Milky Way, Andromeda, Whirlpool, Sombrero, and Triangulum
- 🚀 **NASA API Integration** - Uses official NASA Image IDs for consistent, high-quality images
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast & Lightweight** - Under 300 lines of CSS, no dependencies
- 🎨 **Modern Design** - Animated starfield backgrounds and smooth transitions
- ♿ **Accessible** - Keyboard navigation support (ESC to close modals)

---

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, CSS Variables, Animations)
- **Vanilla JavaScript (ES6+)** - Async/await, Fetch API, DOM manipulation

### API
- **NASA Images and Video Library API**
  - Endpoint: `https://images-api.nasa.gov/`
  - **No API key required** - Public access
  - Using specific NASA Image IDs for consistency

---

## 📁 Project Structure

```
Ict-Project/
├── firstdraft/
│   ├── index.html       # Landing page with hero section
│   ├── planets.html     # 8 planets with NASA images & facts
│   ├── galaxies.html    # 5 galaxies with NASA images & facts
│   └── style.css        # Complete styles (294 lines)
└── README.md            # Project documentation
```

---

## 🚀 Setup & Installation

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### Installation Steps

1. **Download the project**
   ```bash
   git clone <repository-url>
   cd Ict-Project/firstdraft
   ```

2. **Open in browser**
   - Double-click `index.html`, or
   - Right-click `index.html` → Open with → Browser

3. **That's it!** No npm install, no dependencies, no configuration needed.

---

## 🎯 How It Works

### NASA API Integration

Instead of searching NASA's library (which returns random results), we use **specific NASA Image IDs** to fetch exact, consistent images:

```javascript
// OLD METHOD (Random results - NOT USED)
const url = `https://images-api.nasa.gov/search?q=Mars&media_type=image`;

// NEW METHOD (Specific IDs - CURRENT APPROACH)
const nasaId = 'PIA00407'; // Official Mars image ID
const url = `https://images-api.nasa.gov/asset/${nasaId}`;
const response = await fetch(url);
const data = await response.json();
const image = data.collection.items[0].href; // Always same high-quality image
```

### Image IDs Used

**Planets:**
- Mercury: `PIA15190` - MESSENGER spacecraft
- Venus: `PIA00271` - Magellan radar map
- Earth: `PIA00728` - Blue Marble
- Mars: `PIA00407` - Viking orbiter composite
- Jupiter: `PIA00343` - Voyager portrait
- Saturn: `PIA01364` - Voyager with rings
- Uranus: `PIA18182` - Voyager 2
- Neptune: `PIA01492` - Voyager 2

**Galaxies:**
- Milky Way: `GSFC_20171208_Archive_e000393`
- Andromeda: `PIA23128` - Hubble composite
- Whirlpool: `PIA16695` - Hubble Space Telescope
- Sombrero: `PIA04675` - Hubble/Spitzer
- Triangulum: `PIA23122` - Hubble wide-field

---

## 🎨 Features Breakdown

### 1. Animated Backgrounds
- **Twinkling starfield** - CSS animations for realistic star twinkling
- **Nebula effect** - Radial gradients with blur for depth

### 2. Interactive Cards
- **Hover effects** - Smooth scale and shadow transitions
- **Click to expand** - Opens modal with full details
- **Lazy loading** - Images load on demand

### 3. Modal System
- **Full information** - Complete description and facts
- **High-res images** - 360px height in modal view
- **Keyboard support** - Press ESC to close
- **Click outside** - Close modal by clicking overlay
- **Smooth animations** - Slide-up effect on open

### 4. Responsive Design
- **Mobile-first** - Optimized for small screens
- **Breakpoint: 768px** - Adjusts layout for tablets/mobile
- **Touch-friendly** - Large click targets for mobile users

---

## 📊 Performance Metrics

- **CSS Size:** 294 lines (compact and efficient)
- **Total Page Weight:** ~50KB (excluding NASA images)
- **Load Time:** <1 second (on average connection)
- **No Dependencies:** Zero external libraries
- **Browser Support:** All modern browsers (Chrome 90+, Firefox 88+, Safari 14+)

---

## 🎓 Educational Value

This project demonstrates:
- ✅ **API Integration** - Fetching and displaying external data
- ✅ **Async JavaScript** - Promises, async/await patterns
- ✅ **DOM Manipulation** - Dynamic content generation
- ✅ **CSS Grid & Flexbox** - Modern layout techniques
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Animation** - CSS keyframes and transitions
- ✅ **Error Handling** - Try-catch blocks for API failures
- ✅ **Clean Code** - Readable, maintainable structure

---

## 🔮 Future Enhancements

- [ ] Add more celestial objects (moons, asteroids, comets)
- [ ] Search functionality
- [ ] Filter by object type
- [ ] Dark/light theme toggle
- [ ] Share buttons for social media
- [ ] Favorite/bookmark system (localStorage)
- [ ] Comparison tool (side-by-side planets)
- [ ] Quiz/trivia section

---

## 📝 Code Quality

- **HTML:** Semantic, accessible markup
- **CSS:** BEM-inspired naming, CSS variables for theming
- **JavaScript:** ES6+, modular functions, error handling
- **Comments:** Clear inline documentation
- **Performance:** Optimized animations, minimal repaints

---

## 🐛 Known Issues

- None currently! Report issues via team members.

---

## 📄 License

This project is created for educational purposes as part of ICT Project 25K.

---

## 🙏 Credits & Acknowledgments

- **Images:** [NASA Images and Video Library](https://images.nasa.gov/)
- **Design Inspiration:** Modern space-themed UIs
- **Fonts:** System fonts for fast loading
- **Icons:** Unicode emoji for lightweight graphics

---

## 📞 Contact

For questions or feedback, contact any team member:
- Sarim Raza
- Taher Mustansir
- Baray Bhai

---

## 🎉 Project Stats

- **Lines of Code:** ~750 total (HTML + CSS + JS)
- **Files:** 4 (3 HTML + 1 CSS)
- **Development Time:** [Add your timeframe]
- **Technologies:** 3 (HTML5, CSS3, JavaScript ES6+)

---

**© 2024 Astropedia | ICT Project BATCH 25K - BAI-1C**

*"Explore the universe, one click at a time"* 🌠
