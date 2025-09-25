// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Improved Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                // Use smooth scrolling
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                // Update URL without triggering scroll
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Handle direct navigation via URL hash
    function handleHashNavigation() {
        const hash = window.location.hash;
        if (hash) {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                setTimeout(() => {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 70;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }
    
    // Call on load and hash change
    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    function updateNavbar() {
        if (!navbar) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(19, 52, 59, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(19, 52, 59, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Call once to set initial state
    
    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPos = window.scrollY + 120; // Increased offset for better accuracy
        
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Add active class styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--color-teal-300) !important;
        }
        .nav-link.active:after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
    
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                highlightNavigation();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    highlightNavigation(); // Call once to set initial state
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Initialize back to top button styles
        backToTopBtn.style.transition = 'all 0.3s ease';
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        
        // Show/hide back to top button based on scroll position
        function updateBackToTop() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        }
        
        window.addEventListener('scroll', updateBackToTop);
        updateBackToTop();
    }
    
    // Animated Counter for Skills
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkills() {
        skillLevels.forEach(skill => {
            const skillRect = skill.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (skillRect.top < windowHeight * 0.8 && skillRect.bottom > 0) {
                skill.style.transform = 'scale(1)';
                skill.style.opacity = '1';
            }
        });
    }
    
    // Initialize skill levels
    skillLevels.forEach(skill => {
        skill.style.transform = 'scale(0.9)';
        skill.style.opacity = '0.8';
        skill.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Call once to set initial state
    
    // Enhanced Card Hover Effects
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Tech Tags Animation
    const techTags = document.querySelectorAll('.tech-tag');
    
    // Add fadeInUp animation CSS
    const fadeInUpStyle = document.createElement('style');
    fadeInUpStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .tech-tag {
            opacity: 0;
            animation: fadeInUp 0.6s ease forwards;
        }
    `;
    document.head.appendChild(fadeInUpStyle);
    
    techTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-card {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-card.animate-in {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Observe sections for scroll animations
    sections.forEach((section, index) => {
        if (section.id !== 'home') { // Skip hero section
            section.classList.add('animate-section');
            observer.observe(section);
        }
    });
    
    // Observe project cards with staggered animation
    const projectCards = document.querySelectorAll('.project-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = Array.from(projectCards).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        card.classList.add('animate-card');
        cardObserver.observe(card);
    });
    
    // Contact items enhancement
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                // Add click effect
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
    
    // Prevent flash of unstyled content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Reveal page after everything is loaded
    function revealPage() {
        document.body.style.opacity = '1';
    }
    
    if (document.readyState === 'complete') {
        revealPage();
    } else {
        window.addEventListener('load', revealPage);
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    });
    
    // Accessibility improvements
    navLinks.forEach(link => {
        link.addEventListener('focus', function() {
            if (window.innerWidth <= 768 && navMenu && !navMenu.classList.contains('active')) {
                navMenu.classList.add('active');
                if (navToggle) navToggle.classList.add('active');
            }
        });
        
        // Add proper ARIA labels
        const href = link.getAttribute('href');
        const sectionName = href.replace('#', '').charAt(0).toUpperCase() + href.slice(2);
        link.setAttribute('aria-label', `Navigate to ${sectionName} section`);
    });
    
    // Add skip to main content link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    console.log('Portfolio website loaded successfully with enhanced navigation!');
});