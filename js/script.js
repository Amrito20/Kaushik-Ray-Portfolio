document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen Animation
    const loadingScreen = document.getElementById('loading-screen');
    
    function hideLoadingScreen() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                startMainAnimations();
            }, 800);
        }, 2000);
    }

    // Create Floating Particles
    function createFloatingParticles() {
        const particlesContainer = document.getElementById('particles-container');
        const particleCount = 30; // Reduced for better performance
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            
            // Random colors for particles
            const colors = ['#3498db', '#9b59b6', '#e91e63', '#27ae60'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }
    }

    // Cursor Follower
    function initCursorFollower() {
        const cursorFollower = document.querySelector('.cursor-follower');
        if (!cursorFollower) return;
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorFollower.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursorFollower.style.opacity = '0';
        });

        function animateCursor() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX - 10 + 'px';
            cursorFollower.style.top = followerY - 10 + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Enhanced cursor on hover
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .nav-menu a');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'scale(2)';
                cursorFollower.style.background = '#e91e63';
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.background = '#3498db';
            });
        });
    }

    // Typewriter Effect
    function initTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;
        
        const words = typewriterElement.dataset.words.split(',');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
        } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        typeEffect();
    }

    // Skill Level Animations
    function animateSkillLevels() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const level = item.dataset.level;
            const skillBar = item.querySelector('.skill-level');
            
            if (skillBar) {
                setTimeout(() => {
                    skillBar.style.setProperty('--skill-width', level + '%');
                    // Use CSS custom property for animation
                    skillBar.style.background = `linear-gradient(to right, #3498db ${level}%, rgba(52, 152, 219, 0.2) ${level}%)`;
                }, Math.random() * 1000);
            }
        });
    }

    // Intersection Observer for Reveal Animations
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('.section-reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Animate skill levels when skills section is revealed
                    if (entry.target.id === 'skills') {
                        setTimeout(animateSkillLevels, 500);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Simplified Navigation
    function initNavigation() {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 20;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                navMenu.classList.remove('active');
            });
        });

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            });
        }
    }

    // Image Modal Functionality
    function initImageModal() {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        const captionText = document.getElementById('caption');
        const closeModal = document.getElementsByClassName('modal-close')[0];
        const clickableImages = document.querySelectorAll('.clickable-image img, .project-image img');

        if (modal && modalImg && captionText) {
            clickableImages.forEach(img => {
                img.addEventListener('click', function() {
                    modal.style.display = 'block';
                    modalImg.src = this.src;
                    captionText.innerHTML = this.alt;
                });
            });

            // Close modal when clicking X
            if (closeModal) {
                closeModal.addEventListener('click', function() {
                    modal.style.display = 'none';
                });
            }

            // Close modal when clicking outside image
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        }
    }

    // Initialize image modal
    initImageModal();

    // Prevent scrolling issues with mobile navigation
    window.addEventListener('resize', () => {
        const navMenu = document.querySelector('.nav-menu');
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('active');
        }
    });

    // Enhanced Theme Switcher with Hero Background Fix
    function initThemeSwitcher() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    const body = document.body;
        const hero = document.getElementById('hero');

        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark-mode') {
            body.classList.add('dark-mode');
            updateHeroBackground(true);
        } else {
            updateHeroBackground(false);
        }

        if (themeSwitcher) {
    themeSwitcher.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
                const isDark = body.classList.contains('dark-mode');
                
                // Update hero background immediately
                updateHeroBackground(isDark);
                
                // Add visual feedback
                themeSwitcher.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    themeSwitcher.style.transform = 'scale(1)';
                }, 150);
                
                // Save preference
                if (isDark) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.removeItem('theme');
        }
    });
        }

        function updateHeroBackground(isDark) {
            if (hero) {
                if (isDark) {
                    hero.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
                } else {
                    hero.style.background = 'linear-gradient(135deg, #87CEEB 0%, #4facfe 100%)';
                }
            }
        }
    }

    // Enhanced Scroll to Top
    function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-to-top-btn');

        if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
                
                // Add rocket launch effect
                scrollTopBtn.style.transform = 'translateY(-100vh) rotate(360deg)';
                scrollTopBtn.style.transition = 'transform 0.8s ease-in';
                
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
                
                setTimeout(() => {
                    scrollTopBtn.style.transform = 'translateY(0) rotate(0deg)';
                    scrollTopBtn.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                }, 1000);
            });
        }
    }

    // Enhanced Project Cards
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add tilt effect
                card.style.transform = 'translateY(-20px) rotateY(5deg) rotateX(2deg)';
                card.style.boxShadow = '0 25px 50px rgba(52, 152, 219, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateY(0deg) rotateX(0deg)';
                card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            });
            
            // Add click ripple effect
            card.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                const rect = card.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(52, 152, 219, 0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                card.style.position = 'relative';
                card.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // Enhanced Granim with Sky Blue for 10 seconds
    function initGranim() {
        const granimInstance = new Granim({
            element: '#granim-canvas',
            direction: 'diagonal',
            isPausedWhenNotInView: true,
            states: {
                "default-state": {
                    gradients: [
                        // Sky blue gradient for first 10 seconds
                        ['#87CEEB', '#4facfe'],
                        ['#87CEEB', '#4facfe'],
                        ['#87CEEB', '#4facfe'],
                        // Then transition to other colors
                        ['#667eea', '#764ba2'],
                        ['#f093fb', '#f5576c'],
                        ['#4facfe', '#00f2fe'],
                        ['#43e97b', '#38f9d7']
                    ],
                    transitionSpeed: 10000 // 10 seconds for sky blue, then faster
                }
            }
        });
        
        // After 10 seconds, change to faster transitions
        setTimeout(() => {
            granimInstance.changeState("fast-state");
        }, 10000);
        
        // Add fast state with quicker transitions
        granimInstance.addState("fast-state", {
            gradients: [
                ['#667eea', '#764ba2'],
                ['#f093fb', '#f5576c'],
                ['#4facfe', '#00f2fe'],
                ['#43e97b', '#38f9d7'],
                ['#fa709a', '#fee140'],
                ['#a8edea', '#fed6e3']
            ],
            transitionSpeed: 4000
        });
        
        return granimInstance;
    }

    // Social Links Animation
    function initSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 0.1}s`;
            
            link.addEventListener('mouseenter', () => {
                socialLinks.forEach((otherLink, otherIndex) => {
                    if (otherIndex !== index) {
                        otherLink.style.opacity = '0.5';
                        otherLink.style.transform = 'scale(0.8)';
                    }
                });
            });
            
            link.addEventListener('mouseleave', () => {
                socialLinks.forEach(otherLink => {
                    otherLink.style.opacity = '1';
                    otherLink.style.transform = 'scale(1)';
                });
            });
        });
    }

    // Add CSS for ripple animation
    function addRippleAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add mobile menu HTML if not present
    function addMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        if (navContainer && !document.querySelector('.mobile-menu-toggle')) {
            const mobileToggle = document.createElement('div');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            navContainer.appendChild(mobileToggle);
        }
    }

    // Mobile Menu Functionality
    function initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
            
            // Close menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    // Main initialization function
    function startMainAnimations() {
        createFloatingParticles();
        initCursorFollower();
        initTypewriter();
        initRevealAnimations();
        initNavigation();
        initThemeSwitcher();
        initScrollToTop();
        initProjectCards();
        initGranim();
        initSocialLinks();
        addRippleAnimation();
        initImageModal();
        
        // Confetti easter egg
        let clickCount = 0;
        document.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 10) {
                createConfetti();
                clickCount = 0;
            }
        });
        
        // Request animation frame for smooth animations
        function requestTick() {
            requestAnimationFrame(updateAnimations);
        }
        
        function updateAnimations() {
            // Smooth scrolling indicator
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollPercentage = scrollY / (documentHeight - windowHeight);
                
                scrollIndicator.style.transform = `translateX(-50%) translateY(${scrollPercentage * 20}px)`;
            }
            
            requestTick();
        }
        
        requestTick();
    }

    // Scroll-down arrow enhancement
    const scrollDownArrow = document.querySelector('.scroll-down-arrow');
    if (scrollDownArrow) {
        scrollDownArrow.addEventListener('click', (e) => {
            e.preventDefault();
            const navbarSection = document.getElementById('navbar');
            if (navbarSection) {
                navbarSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Performance optimization
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    function updateAnimations() {
        // Update any frame-based animations here
        ticking = false;
    }

    // Initialize everything
    hideLoadingScreen();

    // Add some easter eggs
    let clickCount = 0;
    document.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 10) {
            // Easter egg: Confetti effect after 10 clicks
            createConfetti();
            clickCount = 0; // Reset counter
        }
    });

    function createConfetti() {
        const colors = ['#3498db', '#9b59b6', '#e91e63', '#27ae60', '#f39c12', '#e74c3c'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                z-index: 10000;
                border-radius: 50%;
                animation: confetti-fall 3s linear forwards;
                pointer-events: none;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
        
        // Add confetti animation if not already added
        if (!document.querySelector('#confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confetti-fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}); 