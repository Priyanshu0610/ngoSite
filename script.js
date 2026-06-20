document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       PRELOADER
       ========================================= */
    const preloader = document.getElementById('preloader');
    
    // Fallback in case load takes too long
    setTimeout(() => {
        if(preloader) preloader.classList.add('hide');
    }, 3000);

    window.addEventListener('load', () => {
        if(preloader) {
            // Slight delay so the animation can be seen
            setTimeout(() => {
                preloader.classList.add('hide');
            }, 1200);
        }
    });

    /* =========================================
       CUSTOM CURSOR
       ========================================= */
    const cursor = document.getElementById('custom-cursor');
    
    // Check if device supports hover (ignore on mobile/touch)
    if (window.matchMedia("(any-hover: hover)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect to interactive elements
        const interactives = document.querySelectorAll('a, button, .hover-grow');
        
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    /* =========================================
       NAVBAR SCROLL EFFECT
       ========================================= */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            
            // Toggle hamburger to X (simple animation via CSS or just state)
            const bars = mobileToggle.querySelectorAll('.bar');
            if (mobileNav.classList.contains('active')) {
                bars[0].style.transform = 'translateY(7px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const bars = mobileToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    /* =========================================
       INTERSECTION OBSERVER FOR REVEALS
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* =========================================
       NUMBER COUNTER ANIMATION (IMPACT SECTION)
       ========================================= */
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                statNumbers.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.innerText = Math.ceil(current).toLocaleString() + "+";
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.innerText = target.toLocaleString() + "+";
                        }
                    };
                    
                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    const impactSection = document.querySelector('.impact');
    if (impactSection) {
        countObserver.observe(impactSection);
    }
});
