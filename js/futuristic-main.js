// Futuristic Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Remove no-js class to enable JavaScript features
        document.body.classList.remove('no-js');
        
        // Initialize all functionality with error handling
        initSmoothScrolling();
        initScrollAnimations();
        initParticleAnimation();
        initMobileMenu();
        initFormHandling();
        // initCursorEffects();  // Removed for performance optimization
        initTypingEffect();
        initThemeToggle();
        
        console.log('Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
        // Graceful degradation - show content without animations
        document.body.classList.add('no-js');
    }
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    try {
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!navLinks.length) {
            console.warn('No navigation links found');
            return;
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                try {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // Check if smooth scroll is supported
                        if ('scrollBehavior' in document.documentElement.style) {
                            targetSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        } else {
                            // Fallback for browsers without smooth scroll
                            targetSection.scrollIntoView();
                        }
                    } else {
                        console.warn(`Target section not found: ${targetId}`);
                    }
                } catch (error) {
                    console.error('Error in smooth scrolling:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }

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
    try {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported, falling back to basic animations');
            // Fallback: just add visible class to all elements
            const sections = document.querySelectorAll('.section, .hero-section');
            sections.forEach(section => section.classList.add('visible'));
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            try {
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
            } catch (error) {
                console.error('Error in intersection observer callback:', error);
            }
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
    } catch (error) {
        console.error('Error initializing scroll animations:', error);
    }
}

// Animate skill bars
function animateSkillBars() {
    try {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        if (!skillBars.length) {
            console.warn('No skill bars found for animation');
            return;
        }
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                try {
                    bar.style.animationPlayState = 'running';
                } catch (error) {
                    console.error(`Error animating skill bar ${index}:`, error);
                }
            }, index * 200);
        });
    } catch (error) {
        console.error('Error in animateSkillBars:', error);
    }
}

// Animate counters in hero stats
function animateCounters() {
    try {
        const counters = document.querySelectorAll('.stat-number');
        
        if (!counters.length) {
            console.warn('No stat counters found for animation');
            return;
        }
        
        counters.forEach(counter => {
            try {
                const target = counter.textContent;
                const isPercentage = target.includes('%');
                const isPlus = target.includes('+');
                const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
                
                if (isNaN(numericValue)) {
                    console.warn('Invalid numeric value in counter:', target);
                    return;
                }
                
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    try {
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
                    } catch (error) {
                        console.error('Error in counter animation timer:', error);
                        clearInterval(timer);
                    }
                }, 50);
            } catch (error) {
                console.error('Error setting up counter animation:', error);
            }
        });
    } catch (error) {
        console.error('Error in animateCounters:', error);
    }
}

// Enhanced particle animation
function initParticleAnimation() {
    try {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            console.log('Reduced motion preferred, skipping particle animations');
            return;
        }

        const particles = document.querySelectorAll('.particle');
        
        if (particles.length) {
            particles.forEach((particle, index) => {
                try {
                    // Random initial position
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';
                    
                    // Random animation duration
                    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
                    particle.style.animationDelay = Math.random() * 2 + 's';
                    
                    // Add mouse interaction with error handling
                    particle.addEventListener('mouseenter', function() {
                        try {
                            this.style.transform = 'scale(3)';
                            this.style.opacity = '1';
                        } catch (error) {
                            console.error('Error in particle mouseenter:', error);
                        }
                    });
                    
                    particle.addEventListener('mouseleave', function() {
                        try {
                            this.style.transform = 'scale(1)';
                            this.style.opacity = '0.6';
                        } catch (error) {
                            console.error('Error in particle mouseleave:', error);
                        }
                    });
                } catch (error) {
                    console.error(`Error setting up particle ${index}:`, error);
                }
            });
        }

        // Animate gradient orbs
        const orbs = document.querySelectorAll('.orb');
        if (orbs.length) {
            orbs.forEach(orb => {
                try {
                    orb.addEventListener('mouseenter', function() {
                        try {
                            this.style.filter = 'blur(40px)';
                            this.style.opacity = '0.6';
                        } catch (error) {
                            console.error('Error in orb mouseenter:', error);
                        }
                    });
                    
                    orb.addEventListener('mouseleave', function() {
                        try {
                            this.style.filter = 'blur(60px)';
                            this.style.opacity = '0.3';
                        } catch (error) {
                            console.error('Error in orb mouseleave:', error);
                        }
                    });
                } catch (error) {
                    console.error('Error setting up orb interaction:', error);
                }
            });
        }
    } catch (error) {
        console.error('Error in initParticleAnimation:', error);
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Form handling with improved validation and error handling
function initFormHandling() {
    try {
        const form = document.querySelector('.glass-form');
        
        if (!form) {
            console.warn('Contact form not found');
            return;
        }
        
        form.addEventListener('submit', function(e) {
            try {
                e.preventDefault();
                
                const submitButton = this.querySelector('.submit-button');
                if (!submitButton) {
                    console.error('Submit button not found');
                    return;
                }
                
                const originalText = submitButton.innerHTML;
                
                // Basic form validation
                const requiredFields = this.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        setTimeout(() => field.classList.remove('error'), 3000);
                    }
                });
                
                if (!isValid) {
                    submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please fill all fields';
                    submitButton.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.style.background = '';
                    }, 2000);
                    return;
                }
                
                // Show loading state
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission (replace with actual form handling)
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
            } catch (error) {
                console.error('Error in form submission:', error);
                const submitButton = this.querySelector('.submit-button');
                if (submitButton) {
                    submitButton.innerHTML = '<i class="fas fa-times"></i> Error occurred';
                    submitButton.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                    setTimeout(() => {
                        submitButton.innerHTML = 'Send Message';
                        submitButton.disabled = false;
                        submitButton.style.background = '';
                    }, 2000);
                }
            }
        });

        // Enhanced form field animations with error handling
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            try {
                const input = group.querySelector('input, textarea');
                const label = group.querySelector('label');
                
                if (input && label) {
                    input.addEventListener('focus', function() {
                        try {
                            group.style.transform = 'translateY(-2px)';
                            group.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.1)';
                            this.classList.remove('error');
                        } catch (error) {
                            console.error('Error in input focus handler:', error);
                        }
                    });
                    
                    input.addEventListener('blur', function() {
                        try {
                            group.style.transform = 'translateY(0)';
                            group.style.boxShadow = 'none';
                        } catch (error) {
                            console.error('Error in input blur handler:', error);
                        }
                    });
                    
                    // Real-time validation feedback
                    input.addEventListener('input', function() {
                        try {
                            if (this.hasAttribute('required') && this.value.trim()) {
                                this.classList.remove('error');
                                this.classList.add('valid');
                            } else {
                                this.classList.remove('valid');
                            }
                        } catch (error) {
                            console.error('Error in input validation:', error);
                        }
                    });
                }
            } catch (error) {
                console.error('Error setting up form field animations:', error);
            }
        });
    } catch (error) {
        console.error('Error initializing form handling:', error);
    }
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

// Optimized navbar scroll effect with throttling
let navbarScrollTicking = false;

function updateNavbarOnScroll() {
    try {
        const navbar = document.querySelector('.glass-nav');
        if (!navbar) return;
        
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    } catch (error) {
        console.error('Error updating navbar on scroll:', error);
    }
}

window.addEventListener('scroll', function() {
    if (!navbarScrollTicking) {
        requestAnimationFrame(updateNavbarOnScroll);
        navbarScrollTicking = true;
        setTimeout(() => {
            navbarScrollTicking = false;
        }, 16); // ~60fps
    }
}, { passive: true });

// Optimized parallax effect with throttling
let parallaxScrollTicking = false;

function updateParallaxOnScroll() {
    try {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements .tech-icon');
        
        if (parallaxElements.length === 0) return;
        
        parallaxElements.forEach((element, index) => {
            try {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            } catch (error) {
                console.error(`Error updating parallax element ${index}:`, error);
            }
        });
    } catch (error) {
        console.error('Error in parallax scroll handler:', error);
    }
}

window.addEventListener('scroll', function() {
    if (!parallaxScrollTicking) {
        requestAnimationFrame(updateParallaxOnScroll);
        parallaxScrollTicking = true;
        setTimeout(() => {
            parallaxScrollTicking = false;
        }, 16); // ~60fps
    }
}, { passive: true });

// Add CSS for custom cursor
// const cursorStyles = `
// .custom-cursor {
//     position: fixed;
//     width: 10px;
//     height: 10px;
//     background: var(--accent-primary);
//     border-radius: 50%;
//     pointer-events: none;
//     z-index: 9999;
//     transition: transform 0.1s ease;
//     mix-blend-mode: difference;
// }

// .cursor-follower {
//     position: fixed;
//     width: 30px;
//     height: 30px;
//     border: 2px solid var(--accent-primary);
//     border-radius: 50%;
//     pointer-events: none;
//     z-index: 9998;
//     opacity: 0.5;
// }

// .cursor-hover {
//     transform: scale(2);
// }

// .cursor-follower.cursor-hover {
//     transform: scale(1.5);
//     opacity: 0.8;
// }

// @media (max-width: 768px) {
//     .custom-cursor,
//     .cursor-follower {
//         display: none;
//     }
// }
// `;

// Inject cursor styles
// const styleSheet = document.createElement('style');
// styleSheet.textContent = cursorStyles;
// document.head.appendChild(styleSheet);

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

// Modern throttling using requestAnimationFrame
let generalScrollTicking = false;

function handleGeneralScroll() {
    try {
        // Additional scroll-based animations can be added here
        // This is kept as a placeholder for future scroll animations
    } catch (error) {
        console.error('Error in general scroll handler:', error);
    }
}

window.addEventListener('scroll', function() {
    if (!generalScrollTicking) {
        requestAnimationFrame(handleGeneralScroll);
        generalScrollTicking = true;
        setTimeout(() => {
            generalScrollTicking = false;
        }, 16);
    }
}, { passive: true });

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

// Theme toggle functionality
function initThemeToggle() {
    try {
        const toggle = document.querySelector('.theme-toggle');
        
        if (!toggle) {
            console.warn('Theme toggle button not found');
            return;
        }
        
        const body = document.body;
        
        toggle.addEventListener('click', function() {
            try {
                body.classList.toggle('light');
                const icon = this.querySelector('i');
                
                if (icon) {
                    icon.classList.toggle('fa-moon');
                    icon.classList.toggle('fa-sun');
                }
                
                // Store theme preference
                const isLight = body.classList.contains('light');
                localStorage.setItem('theme-preference', isLight ? 'light' : 'dark');
            } catch (error) {
                console.error('Error toggling theme:', error);
            }
        });
        
        // Apply saved theme preference on load
        try {
            const savedTheme = localStorage.getItem('theme-preference');
            if (savedTheme === 'light') {
                body.classList.add('light');
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            }
        } catch (error) {
            console.warn('Could not load theme preference from localStorage:', error);
        }
    } catch (error) {
        console.error('Error initializing theme toggle:', error);
    }
} 