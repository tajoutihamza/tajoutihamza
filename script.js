// Configuration
const CONFIG = {
    typing: {
        speed: {
            type: 100,
            delete: 50,
            pauseBeforeDelete: 2000,
            pauseBeforeType: 500
        },
        headlines: [
            "DevOps Engineer",
            "Tech Innovator",
            "Problem Solver",
            "Cloud Enthusiast",
            "Google Cloud Certified - Associate Cloud Engineer"
        ]
    },
    selectors: {
        darkModeToggle: '#darkModeToggle',
        headline: '#typed-headline',
        contactForm: '#contact form'
    },
    classes: {
        dark: 'dark',
        moonIcon: 'fa-moon',
        sunIcon: 'fa-sun'
    },
    storage: {
        darkMode: 'darkMode'
    }
};

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.init();
});

class PortfolioApp {
    constructor() {
        // Initialize properties
        this.darkModeToggle = document.querySelector(CONFIG.selectors.darkModeToggle);
        this.headlineElement = document.querySelector(CONFIG.selectors.headline);
        this.htmlElement = document.documentElement;
        
        // Bind methods
        this.handleDarkModeToggle = this.handleDarkModeToggle.bind(this);
    }

    init() {
        this.initDarkMode();
        this.initTypingEffect();
        this.initContactForm();
    }

    // Dark Mode functionality
    initDarkMode() {
        const isDarkMode = localStorage.getItem(CONFIG.storage.darkMode) === 'true';
        this.updateDarkMode(isDarkMode);
        
        this.darkModeToggle?.addEventListener('click', this.handleDarkModeToggle);
    }

    handleDarkModeToggle() {
        const isDark = !this.htmlElement.classList.contains(CONFIG.classes.dark);
        this.updateDarkMode(isDark);
        localStorage.setItem(CONFIG.storage.darkMode, isDark);
    }

    updateDarkMode(isDark) {
        this.htmlElement.classList.toggle(CONFIG.classes.dark, isDark);
        const icon = this.darkModeToggle?.querySelector('i');
        if (icon) {
            icon.classList.toggle(CONFIG.classes.sunIcon, isDark);
            icon.classList.toggle(CONFIG.classes.moonIcon, !isDark);
        }
    }

    // Typing effect
    initTypingEffect() {
        if (!this.headlineElement) return;

        let currentHeadline = 0;
        let currentChar = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = CONFIG.typing.headlines[currentHeadline];
            const shouldDelete = isDeleting ? currentChar - 1 : currentChar + 1;
            const displayText = currentText.substring(0, shouldDelete);
            
            this.headlineElement.textContent = displayText;
            currentChar = shouldDelete;

            let timeout = isDeleting ? CONFIG.typing.speed.delete : CONFIG.typing.speed.type;

            if (!isDeleting && displayText === currentText) {
                timeout = CONFIG.typing.speed.pauseBeforeDelete;
                isDeleting = true;
            } else if (isDeleting && displayText === '') {
                isDeleting = false;
                currentHeadline = (currentHeadline + 1) % CONFIG.typing.headlines.length;
                timeout = CONFIG.typing.speed.pauseBeforeType;
                currentChar = 0;
            }

            // Use requestAnimationFrame for smoother animations
            const timeoutId = setTimeout(() => {
                requestAnimationFrame(type);
            }, timeout);

            // Cleanup on page visibility change
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    clearTimeout(timeoutId);
                }
            });
        };

        requestAnimationFrame(type);
    }

    // Contact form functionality
    initContactForm() {
        const contactForm = document.querySelector(CONFIG.selectors.contactForm);
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelector('input[type="text"]').value;
            const message = contactForm.querySelector('textarea').value;

            // Basic validation
            if (!email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            if (!this.isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Create mailto link
            const mailtoLink = `mailto:hamza.taoujouti@esprit.tn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;
            
            // Open default mail client
            window.location.href = mailtoLink;

            // Clear form
            contactForm.reset();
        });
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
