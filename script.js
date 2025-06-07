// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});

// Dark mode toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Project details modal
function showProjectDetails(project) {
    const projectDetails = {
        chaos: {
            title: "C.H.A.O.S AI Assistant",
            description: "A sophisticated AI assistant that combines both voice and text-based interaction capabilities. Built using Python and various API integrations, this project demonstrates advanced natural language processing and speech recognition capabilities.",
            features: [
                "Voice command recognition",
                "Text-based interaction",
                "API Integration",
                "Natural Language Processing"
            ]
        },
        parkinson: {
            title: "Parkinson Disease Detection",
            description: "An innovative machine learning system designed for early detection of Parkinson's disease. Utilizing advanced algorithms and data visualization techniques, this project helps in identifying potential cases through pattern recognition.",
            features: [
                "Machine Learning Models",
                "Data Visualization",
                "Pattern Recognition",
                "Statistical Analysis"
            ]
        }
    };

    const details = projectDetails[project];
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${details.title}</h2>
            <p>${details.description}</p>
            <h3>Key Features:</h3>
            <ul>
                ${details.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }

        .modal-content {
            background: var(--bg-color);
            color: var(--font-color);
            padding: 2rem;
            border-radius: 10px;
            max-width: 600px;
            width: 90%;
            position: relative;
            animation: slideIn 0.3s ease;
            border: 1px solid var(--border-color);
            box-shadow: 0 10px 30px var(--shadow-color);
        }

        .modal-content h2 {
            color: var(--heading-color);
            margin-bottom: 1rem;
        }

        .modal-content p {
            margin-bottom: 1.5rem;
            line-height: 1.6;
            color: var(--font-color);
        }

        .modal-content ul {
            margin-left: 1.5rem;
            margin-bottom: 1.5rem;
            color: var(--font-color);
        }

        .modal-content li {
            margin-bottom: 0.5rem;
        }

        .modal-content button {
            background: var(--primary-color);
            color: var(--bg-color);
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .modal-content button:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Add scroll reveal animation
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.project-card, .skill-tags span, .education-item');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .project-card, .skill-tags span, .education-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }

    .project-card.active, .skill-tags span.active, .education-item.active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

mobileNavToggle.addEventListener('click', () => {
    mobileNavToggle.classList.toggle('active');
    navbar.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        navbar.querySelector('.nav-links').classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-nav-toggle')) {
        mobileNavToggle.classList.remove('active');
        navbar.querySelector('.nav-links').classList.remove('active');
    }
}); 
