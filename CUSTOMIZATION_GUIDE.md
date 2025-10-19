# Buli Website Customization Guide

Easy guide to customize your Buli marketing website without breaking anything.

## 🎨 Changing Colors

### Primary Color Scheme
Edit in `styles.css` at the top (line 8-17):

```css
:root {
    /* Change these for your brand colors */
    --primary: #667eea;        /* Main purple - buttons, gradients */
    --primary-dark: #5568d3;   /* Hover states */
    --secondary: #764ba2;      /* Secondary purple */
    --accent: #f093fb;         /* Pink accent */
    --success: #43e97b;        /* Green for success states */
    --warning: #fee140;        /* Yellow for warnings */
    --danger: #f5576c;         /* Red for errors */
}
```

### Popular Color Schemes

**Blue Tech:**
```css
--primary: #4F46E5;
--secondary: #0EA5E9;
--accent: #06B6D4;
```

**Green Fitness:**
```css
--primary: #10B981;
--secondary: #059669;
--accent: #34D399;
```

**Orange Energy:**
```css
--primary: #F97316;
--secondary: #EA580C;
--accent: #FB923C;
```

**Red Power:**
```css
--primary: #EF4444;
--secondary: #DC2626;
--accent: #F87171;
```

---

## 📝 Updating Text Content

### Hero Section
In `index.html`, find (around line 35):

```html
<h1 class="hero-title">
    <span class="title-line">Transform Your</span>
    <span class="title-line highlight">Gym Training</span>
    <span class="title-line">With AI</span>
</h1>
```

**Change to:**
```html
<h1 class="hero-title">
    <span class="title-line">Your Custom</span>
    <span class="title-line highlight">Main Headline</span>
    <span class="title-line">Goes Here</span>
</h1>
```

### Hero Subtitle
Find (around line 43):
```html
<p class="hero-subtitle">
    Buli creates personalized workout plans that adapt to you...
</p>
```

Replace with your own description (keep it under 200 characters for best results).

### Statistics
Find (around line 53):
```html
<div class="stat-number" data-target="150">0</div>
<div class="stat-label">+ Exercises</div>
```

**Change `data-target` value** to update the animated number.

---

## 🔧 Adding/Removing Features

### Add a New Feature Card
In `index.html`, copy this template and add it to the features grid (around line 135):

```html
<div class="feature-card" data-aos="fade-up" data-aos-delay="600">
    <div class="feature-icon">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="url(#gradient7)"/>
            <!-- Your SVG path here -->
            <defs>
                <linearGradient id="gradient7" x1="0" y1="0" x2="48" y2="48">
                    <stop stop-color="#4facfe"/>
                    <stop offset="1" stop-color="#00f2fe"/>
                </linearGradient>
            </defs>
        </svg>
    </div>
    <h3 class="feature-title">Your Feature Name</h3>
    <p class="feature-description">
        Your feature description goes here.
    </p>
</div>
```

**Important:** Increment the `data-aos-delay` by 100 for each new card (600, 700, 800, etc.)

### Remove a Feature
Simply delete the entire `<div class="feature-card">...</div>` block.

---

## 📱 Customizing Phone Mockup

### Change App Preview Content
In `index.html`, find the phone mockup section (around line 100):

**Workout Card:**
```html
<div class="workout-card">
    <div class="workout-header">
        <span class="workout-name">Chest & Triceps</span>
        <span class="workout-duration">45 min</span>
    </div>
    <!-- Add or remove exercise items here -->
</div>
```

**Add Exercise:**
```html
<div class="exercise-item">
    <div class="exercise-icon">🏋️</div>
    <div class="exercise-details">
        <div class="exercise-name">Exercise Name</div>
        <div class="exercise-sets">3 sets × 8-10 reps</div>
    </div>
    <div class="exercise-check">○</div>
</div>
```

---

## 🎯 Modifying How It Works Steps

### Edit Step Content
Find the steps section (around line 225):

```html
<div class="step" data-aos="fade-right">
    <div class="step-number">01</div>
    <div class="step-content">
        <h3 class="step-title">Your Step Title</h3>
        <p class="step-description">
            Your step description...
        </p>
        <div class="step-features">
            <span class="tag">Feature 1</span>
            <span class="tag">Feature 2</span>
        </div>
    </div>
    <!-- Visual mockup stays the same -->
</div>
```

### Change Step Order
- Step 1: `data-aos="fade-right"`
- Step 2: `data-aos="fade-left"` + add class `reverse`
- Step 3: `data-aos="fade-right"`

---

## 🎨 Animation Customization

### Adjust Animation Speed
In `styles.css`, find the animation definitions:

```css
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}
```

**Make it slower:** Change `translateY(-20px)` to `translateY(-10px)`  
**Make it faster:** Reduce the animation duration in elements using it

### Disable Specific Animations
In `script.js`, comment out or remove:

**Disable Counter Animation:**
```javascript
// Comment out lines 35-55 (counter animation code)
```

**Disable Scroll Reveal:**
```javascript
// Comment out lines 58-68 (reveal observer code)
```

**Disable Parallax:**
```javascript
// Comment out lines 71-79 (parallax effect code)
```

---

## 🖼️ Adding Images

### Add Logo Image
Replace the emoji logo with an image:

In `index.html`, find (around line 18):
```html
<div class="logo-icon">💪</div>
```

**Replace with:**
```html
<img src="logo.png" alt="Buli Logo" style="width: 32px; height: 32px;">
```

### Add Background Image
In `styles.css`, modify the hero background:

```css
.hero-background {
    background: url('path/to/image.jpg') center/cover no-repeat;
}
```

### Add Feature Icons
Replace SVG icons with custom images:

```html
<div class="feature-icon">
    <img src="path/to/icon.png" alt="Feature" style="width: 48px;">
</div>
```

---

## 🔗 Updating Links

### Download Buttons
Find in `index.html` (around line 495):

```html
<a href="#" class="download-btn apple">
```

**Replace `#` with:**
- App Store: `https://apps.apple.com/app/your-app-id`
- Google Play: `https://play.google.com/store/apps/details?id=your.package.name`

### Social Media Links
Find in footer (around line 540):

```html
<a href="#">Twitter</a>
<a href="#">Instagram</a>
<a href="#">Facebook</a>
```

Replace `#` with your actual social media URLs.

### Navigation Links
All `<a href="#section-id">` links use smooth scrolling. To add new sections:

1. Create section with `id="your-section"`
2. Add nav link: `<a href="#your-section" class="nav-link">Section Name</a>`

---

## 📐 Layout Adjustments

### Change Container Width
In `styles.css` (line 27):

```css
:root {
    --container-width: 1200px;  /* Change this value */
}
```

**Wider layout:** 1400px  
**Narrower layout:** 1000px

### Adjust Section Spacing
In `styles.css` (line 28):

```css
:root {
    --section-padding: 120px;  /* Change this value */
}
```

**More space:** 150px  
**Less space:** 80px

### Grid Columns
For features grid (3 columns by default):

```css
.features-grid {
    grid-template-columns: repeat(3, 1fr);  /* Change 3 to 2 or 4 */
}
```

---

## 🎭 Adding New Sections

### Section Template
Add anywhere in `index.html` between existing sections:

```html
<section id="your-section" class="your-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Section Title</h2>
            <p class="section-subtitle">Section subtitle</p>
        </div>
        <div class="your-content">
            <!-- Your content here -->
        </div>
    </div>
</section>
```

### Add Corresponding CSS
In `styles.css`:

```css
.your-section {
    padding: var(--section-padding) 0;
    background: var(--white);
}

.your-content {
    /* Your custom styles */
}
```

---

## 🌐 Multi-Language Support

### Add Language Switcher
In `index.html`, add to navbar (after nav-menu):

```html
<select id="language-select" onchange="changeLanguage(this.value)">
    <option value="en">English</option>
    <option value="fi">Finnish</option>
    <option value="sv">Swedish</option>
</select>
```

In `script.js`, add:

```javascript
const translations = {
    en: {
        heroTitle: "Transform Your Gym Training With AI",
        // ... more translations
    },
    fi: {
        heroTitle: "Muuta Salitreeniäsi Tekoälyllä",
        // ... more translations
    }
};

function changeLanguage(lang) {
    // Update text content based on selected language
    document.querySelector('.hero-title').innerHTML = translations[lang].heroTitle;
}
```

---

## 🎨 Typography

### Change Fonts
Add Google Fonts in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">
```

In `styles.css`:
```css
:root {
    --font-sans: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Adjust Font Sizes
In `styles.css`, change:

```css
.hero-title { font-size: 64px; }      /* Main headline */
.section-title { font-size: 48px; }   /* Section titles */
.feature-title { font-size: 22px; }   /* Feature headings */
```

---

## 🔧 Common Issues

### Feature Cards Not Tilting on Hover
Check if this code exists in `script.js` (around line 103).

### Animations Not Working
1. Ensure `script.js` is linked correctly
2. Check browser console for errors
3. Test in different browsers

### Mobile Menu Not Opening
Verify hamburger button event listener in `script.js` (line 10).

### Smooth Scroll Not Working
Check smooth scroll code in `script.js` (line 24).

---

## 📱 Mobile Customization

### Adjust Mobile Breakpoints
In `styles.css` (bottom of file):

```css
@media (max-width: 768px) {
    /* Tablet/Mobile styles */
}

@media (max-width: 480px) {
    /* Small mobile styles */
}
```

### Mobile-Specific Font Sizes
```css
@media (max-width: 768px) {
    .hero-title {
        font-size: 36px;  /* Smaller on mobile */
    }
}
```

---

## 🎯 Quick Wins

1. **Change primary color** → Instant brand refresh
2. **Update hero text** → Custom messaging
3. **Replace statistics** → Show your metrics
4. **Update download links** → Make buttons functional
5. **Add your logo** → Professional branding

---

## 🆘 Need Help?

- **CSS not applying?** Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
- **JavaScript errors?** Open browser console (F12) to see errors
- **Layout broken?** Undo recent changes and test incrementally
- **Can't find something?** Use Cmd+F / Ctrl+F to search files

---

**Happy customizing! 💪**

Remember: Make small changes, test frequently, and keep backups of working versions.

