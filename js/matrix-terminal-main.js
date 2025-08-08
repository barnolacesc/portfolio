// Matrix Terminal Portfolio - Revolutionary JavaScript
// Creating a cyberpunk DevOps experience with cutting-edge web technologies

class MatrixTerminalPortfolio {
    constructor() {
        this.isLoaded = false;
        this.matrixColumns = [];
        this.cursorTrails = [];
        this.typewriterTexts = [];
        this.commands = [];
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    async init() {
        try {
            console.log('🚀 Initializing Matrix Terminal Portfolio...');
            
            // Boot sequence
            await this.bootSequence();
            
            // Initialize all systems
            this.createMatrixRain();
            this.initCyberCursor();
            this.initTypewriterEffects();
            this.initTerminalCommands();
            this.initHolographicCards();
            this.init3DFloatingElements();
            this.initScrollEffects();
            this.initAudioEffects();
            
            // Optimize performance for GitHub Pages
            this.optimizePerformance();
            
            console.log('✅ Matrix Terminal Portfolio fully loaded!');
            this.isLoaded = true;
            
        } catch (error) {
            console.error('❌ Error initializing portfolio:', error);
        }
    }

    // Boot sequence animation
    async bootSequence() {
        return new Promise((resolve) => {
            const loader = document.querySelector('.terminal-loader');
            const bootText = document.querySelector('.boot-text');
            const progressBar = document.querySelector('.boot-progress-bar');
            
            const bootMessages = [
                '> Initializing Matrix Terminal...',
                '> Loading DevOps modules...',
                '> Connecting to the mainframe...',
                '> Establishing secure connection...',
                '> Loading user interface...',
                '> System ready. Welcome to the Matrix.'
            ];
            
            let messageIndex = 0;
            const messageInterval = setInterval(() => {
                if (messageIndex < bootMessages.length) {
                    bootText.textContent = bootMessages[messageIndex];
                    messageIndex++;
                } else {
                    clearInterval(messageInterval);
                    setTimeout(() => {
                        loader.classList.add('loaded');
                        resolve();
                    }, 1000);
                }
            }, 500);
        });
    }

    // Create Matrix-style code rain
    createMatrixRain() {
        const container = document.querySelector('.matrix-rain-container');
        if (!container) return;

        // Optimize for performance - reduce columns on smaller screens and slower devices
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const columnWidth = 20;
        let numColumns = Math.floor(window.innerWidth / columnWidth);
        
        // Performance optimization: reduce columns based on device capability
        if (window.innerWidth < 768) {
            numColumns = Math.min(numColumns, 25); // Limit mobile columns
        } else if (navigator.hardwareConcurrency < 4) {
            numColumns = Math.min(numColumns, 40); // Limit for slower devices
        } else {
            numColumns = Math.min(numColumns, 60); // Cap for all devices
        }

        for (let i = 0; i < numColumns; i++) {
            this.createMatrixColumn(container, i * columnWidth, characters);
        }
    }

    createMatrixColumn(container, x, characters) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = x + 'px';
        
        // Generate random characters
        const length = Math.floor(Math.random() * 20) + 10;
        let text = '';
        for (let i = 0; i < length; i++) {
            text += characters[Math.floor(Math.random() * characters.length)];
        }
        column.textContent = text;
        
        // Random animation speed and delay
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        column.style.animationDuration = duration + 's';
        column.style.animationDelay = delay + 's';
        
        container.appendChild(column);
        this.matrixColumns.push(column);

        // Recreate column when animation completes
        setTimeout(() => {
            column.remove();
            this.createMatrixColumn(container, x, characters);
        }, (duration + delay) * 1000);
    }

    // Initialize cyber cursor with trails
    initCyberCursor() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursor = document.createElement('div');
        cursor.className = 'cyber-cursor';
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX - 10 + 'px';
            cursor.style.top = mouseY - 10 + 'px';
            
            // Create trail effect
            this.createCursorTrail(mouseX, mouseY);
        });

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .holo-card, .nav-command');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'var(--cyber-neon-pink)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'var(--cyber-neon-cyan)';
            });
        });
    }

    createCursorTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cyber-cursor-trail';
        trail.style.left = x - 3 + 'px';
        trail.style.top = y - 3 + 'px';
        document.body.appendChild(trail);

        requestAnimationFrame(() => {
            trail.style.opacity = '0.8';
        });

        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => trail.remove(), 300);
        }, 100);
    }

    // Initialize typewriter effects
    initTypewriterEffects() {
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        
        typewriterElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            element.classList.add('typewriter');
            
            setTimeout(() => {
                this.typeWriterAnimation(element, text);
            }, index * 1000);
        });
    }

    typeWriterAnimation(element, text, speed = 50) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                element.classList.remove('typewriter');
            }
        }, speed);
    }

    // Initialize terminal commands
    initTerminalCommands() {
        const terminalInputs = document.querySelectorAll('.terminal-input');
        
        terminalInputs.forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.executeCommand(input.value);
                    input.value = '';
                }
            });
        });

        // Simulate live terminal commands
        this.simulateTerminalActivity();
    }

    executeCommand(command) {
        const output = document.querySelector('.terminal-output');
        if (!output) return;

        const commands = {
            'help': () => 'Available commands: about, skills, projects, contact, clear',
            'about': () => 'DevOps Engineer & Cloud CyberSec Specialist with 5+ years experience',
            'skills': () => 'Kubernetes, Docker, AWS, Terraform, Jenkins, Python, Go',
            'projects': () => 'Infrastructure automation, CI/CD pipelines, Security implementations',
            'contact': () => 'Email: contact@francescbarnola.com | LinkedIn: /in/fbarnola',
            'clear': () => { output.innerHTML = ''; return ''; },
            'whoami': () => 'francesc.barnola',
            'pwd': () => '/home/francesc/portfolio',
            'ls': () => 'about.md  skills.json  projects/  contact.txt'
        };

        const result = commands[command.toLowerCase()] || (() => `Command not found: ${command}`);
        const response = result();
        
        if (response) {
            const line = document.createElement('div');
            line.innerHTML = `<span class="terminal-prompt">$</span> ${command}<br><span class="terminal-response">${response}</span>`;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
        }
    }

    simulateTerminalActivity() {
        const activities = [
            'kubectl get pods',
            'docker ps',
            'terraform plan',
            'git status',
            'npm run build',
            'pytest tests/',
            'ansible-playbook deploy.yml'
        ];

        setInterval(() => {
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            const output = document.querySelector('.live-terminal-output');
            if (output) {
                const line = document.createElement('div');
                line.innerHTML = `<span class="terminal-prompt">$</span> ${randomActivity}`;
                line.style.opacity = '0';
                output.appendChild(line);
                
                requestAnimationFrame(() => {
                    line.style.opacity = '1';
                });

                // Remove old lines to prevent overflow
                if (output.children.length > 10) {
                    output.removeChild(output.firstChild);
                }
            }
        }, 3000);
    }

    // Initialize holographic card effects
    initHolographicCards() {
        const cards = document.querySelectorAll('.holo-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // Initialize 3D floating elements
    init3DFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-3d');
        
        floatingElements.forEach((element, index) => {
            // Random delay for more organic movement
            element.style.animationDelay = (index * 0.5) + 's';
            
            // Add random rotation on hover
            element.addEventListener('mouseenter', () => {
                const randomRotation = Math.random() * 360;
                element.style.transform += ` rotateZ(${randomRotation}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = element.style.transform.replace(/ rotateZ\([^)]+\)/, '');
            });
        });
    }

    // Initialize scroll effects
    initScrollEffects() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations based on class
                    if (entry.target.classList.contains('glitch-trigger')) {
                        this.triggerGlitchEffect(entry.target);
                    }
                    
                    if (entry.target.classList.contains('typewriter-trigger')) {
                        const text = entry.target.dataset.text || entry.target.textContent;
                        entry.target.textContent = '';
                        this.typeWriterAnimation(entry.target, text);
                    }
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    triggerGlitchEffect(element) {
        element.dataset.text = element.textContent;
        element.classList.add('glitch');
        
        setTimeout(() => {
            element.classList.remove('glitch');
        }, 2000);
    }

    // Initialize audio effects (optional)
    initAudioEffects() {
        // Subtle sci-fi sound effects for interactions
        const sounds = {
            hover: () => this.playTone(800, 0.1, 0.05),
            click: () => this.playTone(1000, 0.1, 0.1),
            type: () => this.playTone(600, 0.05, 0.02)
        };

        // Add sound to interactive elements
        document.querySelectorAll('.nav-command').forEach(element => {
            element.addEventListener('mouseenter', sounds.hover);
            element.addEventListener('click', sounds.click);
        });
    }

    playTone(frequency, duration, volume = 0.1) {
        if (!window.AudioContext && !window.webkitAudioContext) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    // Utility method to add terminal command functionality to any element
    addTerminalBehavior(element, command) {
        element.addEventListener('click', () => {
            this.executeCommand(command);
        });
    }

    // Performance optimization - enhanced for GitHub Pages
    optimizePerformance() {
        // Detect low-performance devices and apply optimizations
        const isLowPerformance = 
            navigator.hardwareConcurrency < 4 || 
            window.innerWidth < 768 ||
            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
        if (isLowPerformance) {
            document.body.classList.add('low-performance');
            console.log('🔧 Low-performance mode activated for better GitHub Pages compatibility');
        }

        // Pause resource-intensive animations when tab is not active
        document.addEventListener('visibilitychange', () => {
            const matrixColumns = document.querySelectorAll('.matrix-column');
            const meshGradient = document.querySelector('.mesh-gradient-bg');
            const floating3D = document.querySelectorAll('.floating-3d');
            
            if (document.hidden) {
                // Pause animations when tab is hidden
                matrixColumns.forEach(column => {
                    column.style.animationPlayState = 'paused';
                });
                if (meshGradient) meshGradient.style.animationPlayState = 'paused';
                floating3D.forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            } else {
                // Resume animations when tab is visible
                matrixColumns.forEach(column => {
                    column.style.animationPlayState = 'running';
                });
                if (meshGradient) meshGradient.style.animationPlayState = 'running';
                floating3D.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }
        });

        // Reduce matrix rain frequency on slower connections
        if (navigator.connection && navigator.connection.effectiveType) {
            const connectionType = navigator.connection.effectiveType;
            if (connectionType === 'slow-2g' || connectionType === '2g' || connectionType === '3g') {
                document.body.classList.add('slow-connection');
                console.log('🌐 Slow connection detected, optimizing animations');
            }
        }
    }
}

// Initialize the Matrix Terminal Portfolio
const portfolio = new MatrixTerminalPortfolio();

// Export for global access
window.MatrixPortfolio = portfolio;

// Terminal command shortcuts
window.terminal = {
    execute: (cmd) => portfolio.executeCommand(cmd),
    typewriter: (element, text) => portfolio.typeWriterAnimation(element, text),
    glitch: (element) => portfolio.triggerGlitchEffect(element)
};

// Easter eggs and special commands
document.addEventListener('keydown', (e) => {
    // Konami code: ↑↑↓↓←→←→BA
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    window.konamiSequence = window.konamiSequence || [];
    window.konamiSequence.push(e.keyCode);
    
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence.shift();
    }
    
    if (window.konamiSequence.join(',') === konamiCode.join(',')) {
        // Activate Matrix mode
        document.body.classList.add('matrix-overdrive');
        portfolio.executeCommand('matrix-mode-activated');
        window.konamiSequence = [];
    }
});

console.log(`
🌟 Matrix Terminal Portfolio Loaded 🌟
Available terminal commands:
- help, about, skills, projects, contact
- whoami, pwd, ls, clear
- Try typing in any terminal input!

Easter egg: Try the Konami code! ↑↑↓↓←→←→BA
`);