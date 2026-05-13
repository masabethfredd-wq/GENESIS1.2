/* ═══════════════════════════════════════════════════
   U.E. Cascada Génesis — Interactive Scripts
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Preloader ──────────────────────────────────
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initRevealAnimations();
            animateCounters();
            initIntelligenceNetwork();
        }, 2500); // Longer for cinematic effect
    });

    // Fallback: hide preloader after 4s max
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initRevealAnimations();
            animateCounters();
            initIntelligenceNetwork();
        }
    }, 4000);

    // ── Navigation ─────────────────────────────────
    const nav = document.getElementById('nav');
    const navBurger = document.getElementById('navBurger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navBurger.addEventListener('click', () => {
        navBurger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
        link.addEventListener('click', () => {
            navBurger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.pageYOffset + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ── Smooth scroll for anchor links ─────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── Reveal on scroll ───────────────────────────
    function initRevealAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
            observer.observe(el);
        });
    }

    // ── Counter animation ──────────────────────────
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    const duration = 3000; // Slower animation (3 seconds)
                    const start = performance.now();

                    function updateCounter(timestamp) {
                        const progress = Math.min((timestamp - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 4); // Smoother quintic ease-out
                        el.textContent = Math.floor(eased * target);
                        if (progress < 1) requestAnimationFrame(updateCounter);
                        else el.textContent = target;
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // ── Intelligence Network ───────────────────────
    function initIntelligenceNetwork() {
        const nodes = document.querySelectorAll('.neural-node');
        const intelligenceCard = document.getElementById('intelligenceCard');
        const cardTitle = document.getElementById('cardTitle');
        const cardDesc = document.getElementById('cardDesc');
        const cardIcon = document.getElementById('cardIcon');
        const centralPlaceholder = document.querySelector('.central-info-placeholder');
        const connectionsContainer = document.getElementById('neuralConnections');
        const particlesContainer = document.getElementById('neuralParticles');

        const intelligenceData = {
            'ling': {
                title: 'Inteligencia Lingüística',
                desc: 'Desarrollamos la capacidad de usar el lenguaje de manera efectiva, fomentando la lectura, escritura y comunicación oral.',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>'
            },
            'log': {
                title: 'Inteligencia Lógico-Matemática',
                desc: 'Potenciamos el pensamiento lógico, resolución de problemas y comprensión de patrones matemáticos.',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            },
            'esp': {
                title: 'Inteligencia Espacial',
                desc: 'Fomentamos la visualización, orientación espacial y creatividad visual en artes y diseño.',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'
            },
            'kin': {
                title: 'Inteligencia Kinestésica',
                desc: 'Desarrollamos la coordinación motriz, expresión corporal y aprendizaje a través del movimiento.',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>'
            },
            'mus': {
                title: 'Inteligencia Musical',
                desc: 'Estimulamos la sensibilidad rítmica, apreciación musical y expresión artística sonora.',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>'
            },
            'inter': {
                title: 'Inteligencia Interpersonal',
                desc: 'Fomentamos las habilidades sociales, empatía y capacidad de trabajar en equipo.',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
            },
            'intra': {
                title: 'Inteligencia Intrapersonal',
                desc: 'Desarrollamos la autoconciencia, autorregulación emocional y pensamiento reflexivo.',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
            },
            'nat': {
                title: 'Inteligencia Naturalista',
                desc: 'Promovemos la conexión con la naturaleza, observación científica y conciencia ambiental.',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l9 4.9V17l-9 5-9-5V6.9L12 2z"></path></svg>'
            }
        };

        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        function activateNode(node) {
            const intelligence = node.dataset.intelligence;
            const data = intelligenceData[intelligence];

            if (!data) return;

            // Fade effect for text
            cardTitle.style.opacity = 0;
            cardDesc.style.opacity = 0;
            cardIcon.style.opacity = 0;

            setTimeout(() => {
                cardTitle.textContent = data.title;
                cardDesc.textContent = data.desc;
                cardIcon.innerHTML = data.icon;
                
                cardTitle.style.opacity = 1;
                cardDesc.style.opacity = 1;
                cardIcon.style.opacity = 1;
            }, 200);

            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            
            intelligenceCard.classList.add('active');
            intelligenceCard.classList.add('visible');
            if (centralPlaceholder) centralPlaceholder.classList.add('hidden');
        }

        function deactivateNetwork() {
            if (!isTouchDevice) {
                nodes.forEach(n => n.classList.remove('active'));
                intelligenceCard.classList.remove('active');
                intelligenceCard.classList.remove('visible');
                if (centralPlaceholder) centralPlaceholder.classList.remove('hidden');
            }
        }

        nodes.forEach(node => {
            if (!isTouchDevice) {
                node.addEventListener('mouseenter', () => activateNode(node));
            }

            node.addEventListener('click', (e) => {
                e.stopPropagation();
                activateNode(node);
            });
        });

        if (!isTouchDevice) {
            const networkArea = document.querySelector('.neural-network');
            if (networkArea) {
                networkArea.addEventListener('mouseleave', deactivateNetwork);
            }
        }

        // Click outside to close on mobile
        document.addEventListener('click', (e) => {
            if (isTouchDevice && !e.target.closest('.neural-node') && !e.target.closest('.intelligence-card-premium')) {
                nodes.forEach(n => n.classList.remove('active'));
                intelligenceCard.classList.remove('visible');
                if (centralPlaceholder) centralPlaceholder.classList.remove('hidden');
            }
        });

        // Dynamic SVG Connections
        function createConnections() {
            if (!connectionsContainer) return;
            connectionsContainer.innerHTML = '';
            
            const centerX = 500;
            const centerY = 500;
            const rx = 520;
            const ry = 280;

            nodes.forEach((node, i) => {
                const angle = (i * 45) * (Math.PI / 180);
                const x = centerX + rx * Math.cos(angle);
                const y = centerY + ry * Math.sin(angle);

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', centerX);
                line.setAttribute('y1', centerY);
                line.setAttribute('x2', x);
                line.setAttribute('y2', y);
                line.setAttribute('stroke', 'url(#lineGrad)');
                line.setAttribute('stroke-width', '1');
                line.setAttribute('class', 'neural-line');
                connectionsContainer.appendChild(line);
            });
        }

        // Neural Particles
        function createParticles() {
            if (!particlesContainer) return;
            for (let i = 0; i < 20; i++) {
                const p = document.createElement('div');
                p.className = 'neural-particle';
                p.style.left = Math.random() * 100 + '%';
                p.style.top = Math.random() * 100 + '%';
                p.style.animationDelay = Math.random() * 5 + 's';
                p.style.opacity = Math.random() * 0.5;
                particlesContainer.appendChild(p);
            }
        }

        createConnections();
        createParticles();
    }

    // ── Smooth section transitions ─────────────────
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    // ── Dynamic year in footer ─────────────────────
    const yearSpan = document.querySelector('.footer-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // ── Keyboard navigation ────────────────────────
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            navBurger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
