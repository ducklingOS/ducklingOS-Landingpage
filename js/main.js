/**
 * DucklingOS - Main JavaScript
 * Handles common functionality across all pages
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initBackToTop();
    initAnimations();
    initParticles();
});

/**
 * Header scroll effect
 */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarClose = document.querySelector('.sidebar-close');
    const navLinks = document.querySelectorAll('.sidebar-nav a, .nav-link');

    if (!menuToggle || !sidebar) return;

    // Open menu
    menuToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close menu - overlay click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu - close button
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu - link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (sidebar.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    });

    function closeMobileMenu() {
        sidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

/**
 * Back to top button
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Scroll animations
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in');
    
    if (!animatedElements.length) return;

    // Trigger animations when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.visibility = 'visible';
                if (entry.target.classList.contains('fade-in-up')) {
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
        if (el.classList.contains('fade-in-up')) {
            el.style.transform = 'translateY(30px)';
        }
        observer.observe(el);
    });
}

/**
 * Floating particles for welcome page
 */
function initParticles() {
    const particlesContainer = document.querySelector('.welcome-particles');
    if (!particlesContainer) return;

    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'welcome-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Set active navigation link based on scroll position
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-nav a');
    
    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Initialize scroll spy after a short delay to ensure all elements are loaded
setTimeout(initScrollSpy, 500);

/**
 * Animate numbers/counters
 */
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

/**
 * Parallax effect for background elements
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (!parallaxElements.length) return;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallaxSpeed || 0.5;
            const offset = scrollPosition * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    });
}

// Initialize parallax
initParallax();

/**
 * Tab functionality
 */
function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs');
    
    tabContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.tab-button');
        const tabContents = container.querySelectorAll('.tab-content');
        
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                if (tabContents[index]) {
                    tabContents[index].classList.add('active');
                }
            });
        });
    });
}

// Initialize tabs
initTabs();

/**
 * Accordion functionality
 */
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const trigger = accordion.querySelector('.accordion-trigger');
        const content = accordion.querySelector('.accordion-content');
        
        if (!trigger || !content) return;

        trigger.addEventListener('click', () => {
            const isOpen = accordion.classList.contains('open');
            
            // Close all other accordions in the same container
            const parentContainer = accordion.closest('.accordion-container');
            if (parentContainer) {
                const allAccordions = parentContainer.querySelectorAll('.accordion');
                allAccordions.forEach(acc => {
                    acc.classList.remove('open');
                    const accContent = acc.querySelector('.accordion-content');
                    if (accContent) {
                        accContent.style.maxHeight = null;
                    }
                });
            }
            
            // Toggle current accordion
            if (!isOpen) {
                accordion.classList.add('open');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                accordion.classList.remove('open');
                content.style.maxHeight = null;
            }
        });
    });
}

// Initialize accordions
initAccordions();

/**
 * Tooltip functionality
 */
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        element.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.top = rect.bottom + window.scrollY + 10 + 'px';
            tooltip.style.left = rect.left + window.scrollX + 'px';
            
            // Center tooltip
            tooltip.style.transform = `translateX(-50%)`;
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

// Initialize tooltips
initTooltips();

/**
 * Console welcome message
 */
console.log('%c🦆 DucklingOS %c🦆', 'color: #fdd835; font-size: 24px; font-weight: bold;', 'color: #fdd835; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to DucklingOS - A modern, open-source operating system', 'color: #b0b0b0; font-size: 14px;');
console.log('%cGitHub: https://github.com/DucklingOS', 'color: #00bcd4; font-size: 12px;');
