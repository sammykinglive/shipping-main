// ========== MAIN INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // ---------- MOBILE MENU ----------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
            if (nav.classList.contains('active')) {
                body.classList.add('menu-open');
                body.style.overflow = 'hidden';
            } else {
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        });
        
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                body.classList.remove('menu-open');
                body.style.overflow = '';
            });
        });
        
        document.addEventListener('click', function(event) {
            if (nav.classList.contains('active') && 
                !nav.contains(event.target) && 
                !mobileMenuBtn.contains(event.target)) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        });
        
        nav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // ---------- HEADER SCROLL EFFECT ----------
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ---------- HERO SLIDER (if slides exist) ----------
    const heroSlides = document.querySelectorAll('.hero-slide');
    const slideDotsContainer = document.querySelector('.slide-dots');
    const slidePrevBtn = document.querySelector('.slide-prev');
    const slideNextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;
    let slideInterval;
    
    if (heroSlides.length > 0 && slideDotsContainer) {
        // Create dots
        heroSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slide-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            slideDotsContainer.appendChild(dot);
        });
        
        const slideDots = document.querySelectorAll('.slide-dot');
        
        function showSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            slideDots.forEach(dot => dot.classList.remove('active'));
            currentSlide = (index + heroSlides.length) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
            slideDots[currentSlide].classList.add('active');
        }
        
        function nextSlide() { showSlide(currentSlide + 1); }
        function prevSlide() { showSlide(currentSlide - 1); }
        function goToSlide(index) { showSlide(index); resetSlideInterval(); }
        
        function resetSlideInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        if (slideNextBtn && slidePrevBtn) {
            slideNextBtn.addEventListener('click', () => { nextSlide(); resetSlideInterval(); });
            slidePrevBtn.addEventListener('click', () => { prevSlide(); resetSlideInterval(); });
        }
        
        showSlide(0);
        slideInterval = setInterval(nextSlide, 5000);
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
            heroSection.addEventListener('mouseleave', () => { slideInterval = setInterval(nextSlide, 5000); });
        }
    }
    
    // ---------- TESTIMONIALS SLIDER (if exists) ----------
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    const testimonialPrevBtn = document.querySelector('.testimonial-prev');
    const testimonialNextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    if (testimonials.length > 0 && testimonialDotsContainer) {
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            testimonialDotsContainer.appendChild(dot);
        });
        
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        
        function showTestimonial(index) {
            testimonials.forEach(t => t.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            currentTestimonial = (index + testimonials.length) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
            testimonialDots[currentTestimonial].classList.add('active');
        }
        
        function nextTestimonial() { showTestimonial(currentTestimonial + 1); }
        function prevTestimonial() { showTestimonial(currentTestimonial - 1); }
        function goToTestimonial(index) { showTestimonial(index); }
        
        if (testimonialNextBtn && testimonialPrevBtn) {
            testimonialNextBtn.addEventListener('click', nextTestimonial);
            testimonialPrevBtn.addEventListener('click', prevTestimonial);
        }
        
        showTestimonial(0);
        setInterval(nextTestimonial, 7000);
    }
    
    // ---------- SMOOTH SCROLLING for anchor links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (mobileMenuBtn) {
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                    body.classList.remove('menu-open');
                    body.style.overflow = '';
                }
            }
        });
    });
    
    // ---------- STATS COUNTER (with decimal support) ----------
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        let animated = false;
        function animateStats() {
            if (animated) return;
            animated = true;
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-count'));
                const isFloat = (target % 1 !== 0);
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        stat.textContent = isFloat ? count.toFixed(1) : Math.floor(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target;
                    }
                };
                updateCount();
            });
        }
        
        // Use IntersectionObserver on each stat-item or the parent grid
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        document.querySelectorAll('.stat-item, .stats-grid').forEach(el => observer.observe(el));
    }
    
    // ---------- CONTACT FORM ----------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            if (name && email && message) {
                alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // ---------- TRACKING FORM (if exists on tracking page) ----------
    const trackingForm = document.getElementById('trackingForm');
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const trackingNumber = document.getElementById('trackingNumber')?.value.trim();
            if (trackingNumber) {
                simulateTrackingResponse(trackingNumber);
            } else {
                alert('Please enter a tracking number.');
            }
        });
    }
    
    // Helper functions for tracking simulation
    function simulateTrackingResponse(trackingNumber) {
        const trackingResults = document.getElementById('trackingResults');
        if (!trackingResults) return;
        trackingResults.innerHTML = `<div class="tracking-loading"><i class="fas fa-spinner fa-spin"></i><p>Searching for shipment ${trackingNumber}...</p></div>`;
        setTimeout(() => {
            const statuses = ['pending', 'in-transit', 'delivered'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const today = new Date();
            const deliveredDate = new Date(today);
            deliveredDate.setDate(today.getDate() + Math.floor(Math.random() * 5) + 1);
            const shippedDate = new Date(today);
            shippedDate.setDate(today.getDate() - Math.floor(Math.random() * 3) - 1);
            trackingResults.innerHTML = generateTrackingHTML(trackingNumber, randomStatus, shippedDate, deliveredDate);
        }, 1500);
    }
    
    function generateTrackingHTML(trackingNumber, status, shippedDate, deliveredDate) {
        return `<div class="tracking-details">
            <div class="tracking-status">
                <div class="tracking-id">Tracking #: ${trackingNumber}</div>
                <div class="status-badge ${status}">${status.replace('-', ' ')}</div>
            </div>
            <div class="tracking-progress">
                <div class="progress-steps">
                    <div class="progress-bar" style="width: ${status === 'pending' ? '0%' : status === 'in-transit' ? '50%' : '100%'}"></div>
                    ${generateProgressSteps(status, shippedDate, deliveredDate)}
                </div>
            </div>
            <div class="tracking-history"><h3>Shipment History</h3>${generateHistoryItems(status, shippedDate, deliveredDate)}</div>
        </div>`;
    }
    
    function generateProgressSteps(status, shippedDate, deliveredDate) {
        const processedDate = new Date(shippedDate);
        processedDate.setDate(shippedDate.getDate() - 1);
        return `<div class="progress-step">
            <div class="step-icon ${status !== 'pending' ? 'completed' : 'active'}"><i class="fas fa-box"></i></div>
            <div class="step-label ${status !== 'pending' ? 'active' : ''}">Processed</div>
            <div class="step-date">${formatDate(processedDate)}</div>
        </div>
        <div class="progress-step">
            <div class="step-icon ${status === 'in-transit' ? 'active' : status === 'delivered' ? 'completed' : ''}"><i class="fas fa-shipping-fast"></i></div>
            <div class="step-label ${status !== 'pending' ? 'active' : ''}">Shipped</div>
            <div class="step-date">${formatDate(shippedDate)}</div>
        </div>
        <div class="progress-step">
            <div class="step-icon ${status === 'delivered' ? 'completed' : ''}"><i class="fas fa-check"></i></div>
            <div class="step-label ${status === 'delivered' ? 'active' : ''}">Delivered</div>
            <div class="step-date">${status === 'delivered' ? formatDate(deliveredDate) : 'Estimated: ' + formatDate(deliveredDate)}</div>
        </div>`;
    }
    
    function generateHistoryItems(status, shippedDate, deliveredDate) {
        const processedDate = new Date(shippedDate);
        processedDate.setDate(shippedDate.getDate() - 1);
        let html = `<div class="history-item"><div class="history-icon"><i class="fas fa-check"></i></div>
            <div class="history-content"><h4 class="history-title">Order Processed</h4>
            <div class="history-date">${formatDate(processedDate)}</div><div class="history-location">New York, USA</div></div></div>`;
        if (status !== 'pending') {
            html += `<div class="history-item"><div class="history-icon"><i class="fas fa-shipping-fast"></i></div>
                <div class="history-content"><h4 class="history-title">Package Shipped</h4>
                <div class="history-date">${formatDate(shippedDate)}</div><div class="history-location">New York, USA</div></div></div>`;
        }
        if (status === 'in-transit') {
            html += `<div class="history-item"><div class="history-icon"><i class="fas fa-plane"></i></div>
                <div class="history-content"><h4 class="history-title">In Transit</h4>
                <div class="history-date">${formatDate(new Date())}</div><div class="history-location">In transit to destination</div></div></div>`;
        }
        if (status === 'delivered') {
            html += `<div class="history-item"><div class="history-icon"><i class="fas fa-home"></i></div>
                <div class="history-content"><h4 class="history-title">Delivered</h4>
                <div class="history-date">${formatDate(deliveredDate)}</div><div class="history-location">Delivered to recipient</div></div></div>`;
        }
        return html;
    }
    
    function formatDate(date) {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    
    // ---------- SCROLL DOWN BUTTON (Hero) ----------
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' });
        });
    }
    
    // ---------- VIDEO HANDLING (unified) ----------
    const heroVideo = document.querySelector('.hero video');
    if (heroVideo) {
        function attemptPlay() {
            heroVideo.play().catch(() => {
                // autoplay blocked – do nothing
            });
        }
        // Force muted for autoplay policies
        heroVideo.muted = true;
        attemptPlay();
        // Also try on user interaction
        const playOnInteraction = () => {
            if (heroVideo.paused) attemptPlay();
            document.body.removeEventListener('touchstart', playOnInteraction);
            document.body.removeEventListener('click', playOnInteraction);
        };
        document.body.addEventListener('touchstart', playOnInteraction, { once: true });
        document.body.addEventListener('click', playOnInteraction, { once: true });
    }
});