// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Counter Animation for Hero Stats =====
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    counterObserver.observe(stat);
});

// ===== Scroll Reveal Animation =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('[data-aos]').forEach(element => {
    revealObserver.observe(element);
});

// ===== Parallax Effect for Hero Background =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Interactive Phone Mockup =====
const phoneScreen = document.querySelector('.phone-screen');
let currentScreen = 0;

// Simulate screen interactions (optional enhancement)
setInterval(() => {
    // Add subtle animations to the phone mockup
    const exerciseItems = document.querySelectorAll('.exercise-item');
    exerciseItems.forEach((item, index) => {
        setTimeout(() => {
            const check = item.querySelector('.exercise-check');
            if (check && check.textContent === '○') {
                check.textContent = '✓';
                check.style.color = 'var(--success)';
            }
        }, index * 1000);
    });
    
    // Reset after all items are checked
    setTimeout(() => {
        exerciseItems.forEach(item => {
            const check = item.querySelector('.exercise-check');
            if (check && index > 0) {
                check.textContent = '○';
                check.style.color = 'var(--gray)';
            }
        });
    }, 5000);
}, 8000);

// ===== Feature Card Tilt Effect =====
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Animated Progress Bars =====
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transition = 'all 0.5s ease';
                    bar.style.transform = 'scaleY(1)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.5 });

const progressCard = document.querySelector('.progress-card');
if (progressCard) {
    progressObserver.observe(progressCard);
}

// ===== Floating Cards Animation =====
document.querySelectorAll('.floating-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.1) translateY(-10px)';
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.zIndex = '';
    });
});

// ===== Dynamic Time Update in Phone Mockup =====
const updateTime = () => {
    const timeElement = document.querySelector('.preview-time');
    if (timeElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }
};

updateTime();
setInterval(updateTime, 60000); // Update every minute

// ===== Loading Animation for Features =====
document.addEventListener('DOMContentLoaded', () => {
    // Add stagger animation delays to feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animate form mockup
    const formFields = document.querySelectorAll('.form-field');
    formFields.forEach((field, index) => {
        setTimeout(() => {
            field.style.animation = 'shimmer 2s ease-in-out infinite';
        }, index * 200);
    });
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Press ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== Download Button Click Tracking (placeholder) =====
document.querySelectorAll('.download-btn, .btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Add analytics tracking here
        console.log('Download button clicked:', e.target.closest('a').className);
        
        // Add visual feedback
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = e.target.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';
        
        e.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== Intersection Observer Performance Optimization =====
// Disconnect observers when not needed
window.addEventListener('beforeunload', () => {
    counterObserver.disconnect();
    revealObserver.disconnect();
    progressObserver.disconnect();
});

// ===== Easter Egg: Logo Click Animation =====
let logoClickCount = 0;
document.querySelectorAll('.logo-icon').forEach(logo => {
    logo.addEventListener('click', () => {
        logoClickCount++;
        logo.style.animation = 'none';
        setTimeout(() => {
            logo.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
        
        if (logoClickCount === 5) {
            // Secret animation after 5 clicks
            document.body.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);
            logoClickCount = 0;
        }
    });
});

// ===== Preload Images for Smooth Experience =====
const preloadImages = () => {
    // Add any images that need preloading
    const images = [];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// ===== Lazy Loading for Performance =====
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Chart Animation in Phone Mockup =====
const animateChart = () => {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        const randomHeight = Math.floor(Math.random() * 40) + 40; // 40-80%
        setTimeout(() => {
            bar.style.transition = 'height 0.5s ease';
            bar.style.height = randomHeight + '%';
        }, index * 100);
    });
};

// Animate chart when in view
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateChart();
            setInterval(animateChart, 5000); // Update every 5 seconds
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const chartMockup = document.querySelector('.chart-mockup');
if (chartMockup) {
    chartObserver.observe(chartMockup);
}

// ===== Cursor Trail Effect (Subtle) =====
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Only add trail on hero section for performance
    if (e.target.closest('.hero')) {
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// ===== Button Hover Sound Effect (Optional) =====
const playHoverSound = () => {
    // Placeholder for sound effect
    // const audio = new Audio('path/to/hover-sound.mp3');
    // audio.volume = 0.1;
    // audio.play();
};

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        // playHoverSound(); // Uncomment when sound file is available
    });
});

// ===== Performance Monitoring =====
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    });
}

// ===== Scroll Progress Indicator =====
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.position = 'fixed';
    indicator.style.top = '0';
    indicator.style.left = '0';
    indicator.style.height = '3px';
    indicator.style.background = 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)';
    indicator.style.zIndex = '9999';
    indicator.style.transition = 'width 0.1s ease';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        indicator.style.width = scrolled + '%';
    });
};

createScrollIndicator();

// ===== Testimonials Carousel (for future implementation) =====
class TestimonialCarousel {
    constructor(container) {
        this.container = container;
        this.currentIndex = 0;
        this.testimonials = [];
    }
    
    init() {
        // Initialize carousel
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.render();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.render();
    }
    
    render() {
        // Render current testimonial
    }
}

// ===== Console Welcome Message =====
console.log('%cWelcome to Buli! 💪', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cBuilt with ❤️ for fitness enthusiasts', 'font-size: 14px; color: #8b92b0;');
console.log('%cLike what you see? Check out our app!', 'font-size: 14px; color: #8b92b0;');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Buli website loaded successfully!');
    preloadImages();
});

