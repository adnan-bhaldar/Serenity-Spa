// Theme Switching
const themeSwitch = document.getElementById('checkbox');
const currentTheme = localStorage.getItem('theme');

// Check if there's a theme stored in localStorage
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeSwitch.checked = true;
    }
}

// Listen for theme switch changes
themeSwitch.addEventListener('change', function(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    // First set display to flex to enable transitions
    if (!navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        // Force a reflow to enable the transition
        navLinks.offsetHeight;
    }
    
    navLinks.classList.toggle('active');
    
    // If we're closing the menu, wait for transition to end before hiding
    if (!navLinks.classList.contains('active')) {
        setTimeout(() => {
            if (!navLinks.classList.contains('active')) {
                navLinks.style.display = 'none';
            }
        }, 300); // Match this with your CSS transition time
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        setTimeout(() => {
            if (!navLinks.classList.contains('active')) {
                navLinks.style.display = 'none';
            }
        }, 300);
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            setTimeout(() => {
                if (!navLinks.classList.contains('active')) {
                    navLinks.style.display = 'none';
                }
            }, 300);
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Scroll Animation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(42, 42, 42, 0.95)' 
            : 'rgba(124, 82, 149, 0.95)';
    } else {
        nav.style.background = 'var(--nav-bg)';
    }
});

// Image Loading Animation
const galleryImages = document.querySelectorAll('.gallery-item img');
galleryImages.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
});
