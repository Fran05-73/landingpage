/* ===================================
   TIENDA DOÑA ELENA - ANIMATIONS
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-animate');
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                    
                    switch(animation) {
                        case 'fade-in-up':
                            element.classList.add('fadeInUp');
                            break;
                        case 'fade-in-down':
                            element.classList.add('fadeInDown');
                            break;
                        case 'fade-in-left':
                            element.classList.add('fadeInLeft');
                            break;
                        case 'fade-in-right':
                            element.classList.add('fadeInRight');
                            break;
                        case 'zoom-in':
                            element.classList.add('zoomIn');
                            break;
                        case 'bounce-in':
                            element.classList.add('bounceIn');
                            break;
                        default:
                            element.classList.add('fadeInUp');
                    }
                    
                    // Unobserve after animation
                    animationObserver.unobserve(element);
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    const heroSection = document.querySelector('.hero-section');
    const heroImages = document.querySelectorAll('.hero-section img, .hero-section .floating-element');
    
    if (heroSection && heroImages.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroTop = heroSection.offsetTop;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrolled < heroTop + heroHeight) {
                const parallaxSpeed = 0.5;
                const parallaxValue = scrolled * parallaxSpeed;
                
                heroImages.forEach((img, index) => {
                    const speed = img.dataset.parallaxSpeed || 1;
                    img.style.transform = `translateY(${parallaxValue * speed}px)`;
                });
            }
        });
    }
    
    // ===================================
    // Floating Animation for Elements
    // ===================================
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        const duration = 3 + (index % 3); // 3-5 seconds
        const delay = index * 0.5;
        
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
    
    // ===================================
    // Typing Effect for Hero Title (Optional)
    // ===================================
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing when element is in viewport
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    typingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        typingObserver.observe(typingElement);
    }
    
    // ===================================
    // Counter Animation with Easing
    // ===================================
    const counters = document.querySelectorAll('[data-counter]');
    
    const easeOutQuart = (t) => {
        return 1 - (--t) * t * t * t;
    };
    
    const animateCounterValue = (element) => {
        const target = parseInt(element.getAttribute('data-counter'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentValue = Math.floor(easedProgress * target);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounterValue(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // ===================================
    // Magnetic Button Effect
    // ===================================
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;
            const strength = Math.min(distance / maxDistance, 1);
            
            const moveX = x * strength * 0.3;
            const moveY = y * strength * 0.3;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // ===================================
    // Stagger Animation for Lists
    // ===================================
    const staggerLists = document.querySelectorAll('.stagger-list');
    
    staggerLists.forEach(list => {
        const items = list.querySelectorAll('.stagger-item');
        
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        });
        
        const listObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    listObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        listObserver.observe(list);
    });
    
    // ===================================
    // Gradient Animation for Backgrounds
    // ===================================
    const gradientElements = document.querySelectorAll('.gradient-animate');
    
    gradientElements.forEach(element => {
        let angle = 0;
        
        setInterval(() => {
            angle = (angle + 1) % 360;
            element.style.background = `linear-gradient(${angle}deg, #1E88E5, #43A047, #FFA726)`;
        }, 50);
    });
    
    // ===================================
    // Progress Bar Animation
    // ===================================
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress') || 0;
                
                setTimeout(() => {
                    bar.style.width = progress + '%';
                    bar.classList.add('progress-animated');
                }, 300);
                
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        progressObserver.observe(bar);
    });
    
    // ===================================
    // Card 3D Tilt Effect
    // ===================================
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // ===================================
    // Scroll Progress Indicator
    // ===================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #1E88E5, #43A047);
        z-index: 9999;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // ===================================
    // Reveal on Scroll
    // ===================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
});

// ===================================
// Add Animation CSS Classes
// ===================================
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* Animation Base Classes */
    [data-animate] {
        opacity: 0;
    }
    
    [data-animate].animated {
        opacity: 1;
    }
    
    /* Fade In Up */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fadeInUp {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    /* Fade In Down */
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fadeInDown {
        animation: fadeInDown 0.8s ease forwards;
    }
    
    /* Fade In Left */
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .fadeInLeft {
        animation: fadeInLeft 0.8s ease forwards;
    }
    
    /* Fade In Right */
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .fadeInRight {
        animation: fadeInRight 0.8s ease forwards;
    }
    
    /* Zoom In */
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .zoomIn {
        animation: zoomIn 0.8s ease forwards;
    }
    
    /* Bounce In */
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .bounceIn {
        animation: bounceIn 0.8s ease forwards;
    }
    
    /* Float Animation */
    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
    }
    
    .floating {
        animation: float 3s ease-in-out infinite;
    }
    
    /* Reveal Class */
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Progress Bar Animation */
    .progress-bar {
        transition: width 1.5s ease-out;
    }
    
    .progress-bar.progress-animated {
        /* Animation handled by JS */
    }
    
    /* Scroll Progress */
    .scroll-progress {
        /* Styles added dynamically */
    }
    
    /* Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(animationStyles);