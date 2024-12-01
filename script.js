// Typing effect for headline
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initFlipCards();

    const headlines = [
        "DevOps Engineer",
        "Tech Innovator",
        "Problem Solver",
        "Cloud Enthusiast",
        "Google Cloud Certified - Associate Cloud Engineer"
    ];
    const headlineElement = document.getElementById('typed-headline');
    let currentHeadline = 0;
    let currentChar = 0;
    let isDeleting = false;

    function type() {
        const fullHeadline = headlines[currentHeadline];
        let displayText;

        if (isDeleting) {
            displayText = fullHeadline.substring(0, currentChar - 1);
            currentChar--;
        } else {
            displayText = fullHeadline.substring(0, currentChar + 1);
            currentChar++;
        }

        headlineElement.textContent = displayText;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && displayText === fullHeadline) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && displayText === '') {
            isDeleting = false;
            currentHeadline = (currentHeadline + 1) % headlines.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
});

// Dark mode functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial dark mode state
    if (isDarkMode) {
        htmlElement.classList.add('dark');
        darkModeToggle.querySelector('i').classList.remove('fa-moon');
        darkModeToggle.querySelector('i').classList.add('fa-sun');
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
        
        // Toggle icon
        const icon = darkModeToggle.querySelector('i');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Initialize flip cards
function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            const inner = card.querySelector('.flip-card-inner');
            inner.style.transform = inner.style.transform === 'rotateY(180deg)' 
                ? 'rotateY(0deg)' 
                : 'rotateY(180deg)';
        });
    });
}
