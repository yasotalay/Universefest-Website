document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Navigation
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Eğer link dış bir HTML dosyasına ise (örn: Mini Fest sayfası), default davranışı koru.
            if (this.getAttribute('href').startsWith('http') || this.getAttribute('href').endsWith('.html')) {
                return;
            }

            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // '#' karakterini kaldır
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Special handling for Hakkımızda link to bypass hero section
                if (targetId === 'hakkimizda') {
                    const hero = document.querySelector('.hero');
                    const nav = document.querySelector('nav');
                    const heroHeight = hero ? hero.offsetHeight : 0;
                    const navHeight = nav ? nav.offsetHeight : 80;

                    // Scroll to about section minus nav height to ensure it's fully visible
                    const scrollPosition = targetElement.offsetTop - navHeight - 20; // Extra 20px for better spacing

                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                } else {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }

            // Mobil menü açıksa kapat
            const navLinks = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    });

    // Header Scroll Effect
    const nav = document.querySelector('nav');
    if (nav) { // Nav elementi varsa çalıştır
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Burger Menu Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksChildren = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');

        navLinksChildren.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });


    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.section-title, .program-card, .speaker-card, .gallery-grid img').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero background and fade out on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            // Parallax effect
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;

            // Fade out effect when scrolling
            const heroHeight = hero.offsetHeight;
            const fadeStart = heroHeight * 0.3; // Start fading when 30% of hero is scrolled
            const fadeEnd = heroHeight * 0.8; // Complete fade when 80% of hero is scrolled

            if (scrolled > fadeStart) {
                const fadeProgress = Math.min((scrolled - fadeStart) / (fadeEnd - fadeStart), 1);
                hero.style.opacity = 1 - fadeProgress;
            } else {
                hero.style.opacity = 1;
            }
        }
    });

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});