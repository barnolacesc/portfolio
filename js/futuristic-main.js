// Futuristic Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initParticleAnimation();
    initMobileMenu();
    initFormHandling();
    initCursorEffects();
    initTypingEffect();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Smooth scrolling for hero buttons
    const heroButtons = document.querySelectorAll('.primary-button, .secondary-button');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('View My Work')) {
                e.preventDefault();
                document.querySelector('#projects').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (this.textContent.includes('Get In Touch')) {
                e.preventDefault();
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skills-section')) {
                    animateSkillBars();
                }
                
                // Trigger counter animations
                if (entry.target.classList.contains('hero-section')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        observer.observe(heroSection);
    }
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.animationPlayState = 'running';
        }, index * 200);
    });
}

// Animate counters in hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) {
                displayValue += '%';
            } else if (isPlus) {
                displayValue += '+';
            }
            
            counter.textContent = displayValue;
        }, 50);
    });
}

// Enhanced particle animation
function initParticleAnimation() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // Random initial position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation duration
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // Add mouse interaction
        particle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(3)';
            this.style.opacity = '1';
        });
        
        particle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.6';
        });
    });

    // Animate gradient orbs
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach(orb => {
        orb.addEventListener('mouseenter', function() {
            this.style.filter = 'blur(40px)';
            this.style.opacity = '0.6';
        });
        
        orb.addEventListener('mouseleave', function() {
            this.style.filter = 'blur(60px)';
            this.style.opacity = '0.3';
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Form handling
function initFormHandling() {
    const form = document.querySelector('.glass-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 2000);
            }, 2000);
        });

        // Enhanced form field animations
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', function() {
                    group.style.transform = 'translateY(-2px)';
                    group.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.1)';
                });
                
                input.addEventListener('blur', function() {
                    group.style.transform = 'translateY(0)';
                    group.style.boxShadow = 'none';
                });
            }
        });
    }
}

// Custom cursor effects
function initCursorEffects() {
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                line.textContent += text[charIndex];
                charIndex++;
                
                if (charIndex >= text.length) {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, index * 800);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.glass-nav');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Parallax effect for hero elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements .tech-icon');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add CSS for custom cursor
const cursorStyles = `
.custom-cursor {
    position: fixed;
    width: 10px;
    height: 10px;
    background: var(--accent-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: difference;
}

.cursor-follower {
    position: fixed;
    width: 30px;
    height: 30px;
    border: 2px solid var(--accent-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    opacity: 0.5;
}

.cursor-hover {
    transform: scale(2);
}

.cursor-follower.cursor-hover {
    transform: scale(1.5);
    opacity: 0.8;
}

@media (max-width: 768px) {
    .custom-cursor,
    .cursor-follower {
        display: none;
    }
}
`;

// Inject cursor styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations here
}, 16)); // ~60fps

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.classList.add('visible');
        }
    }, 500);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activate special effects
        document.body.style.filter = 'hue-rotate(180deg)';
        
        // Create rainbow particles
        for (let i = 0; i < 50; i++) {
            createRainbowParticle();
        }
        
        setTimeout(() => {
            document.body.style.filter = '';
        }, 5000);
        
        konamiCode = [];
    }
});

function createRainbowParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '10000';
    particle.style.animation = 'rainbow-float 3s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// Add rainbow animation CSS
const rainbowStyles = `
@keyframes rainbow-float {
    0% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateY(-200px) scale(0);
        opacity: 0;
    }
}
`;

const rainbowStyleSheet = document.createElement('style');
rainbowStyleSheet.textContent = rainbowStyles;
document.head.appendChild(rainbowStyleSheet); 