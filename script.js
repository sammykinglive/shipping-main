// Shared functionality across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle - Fixed version
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            
            // Toggle body overflow when menu is open
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const slideDotsContainer = document.querySelector('.slide-dots');
    const slidePrevBtn = document.querySelector('.slide-prev');
    const slideNextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;
    let slideInterval;

    if (heroSlides.length > 0) {
        // Create dots for slides
        heroSlides.forEach((slide, index) => {
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
            
            currentSlide = index % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
            slideDots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1 + heroSlides.length);
        }

        // Initialize slider
        function initSlider() {
            showSlide(0);
            slideInterval = setInterval(nextSlide, 5000);
            
            // Event listeners
            slideNextBtn.addEventListener('click', () => {
                nextSlide();
                resetSlideInterval();
            });
            
            slidePrevBtn.addEventListener('click', () => {
                prevSlide();
                resetSlideInterval();
            });

            const heroSection = document.querySelector('.hero');
            heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
            heroSection.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }

        function resetSlideInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        initSlider();
    }

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    const testimonialPrevBtn = document.querySelector('.testimonial-prev');
    const testimonialNextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    if (testimonials.length > 0) {
        // Create dots for testimonials
        testimonials.forEach((testimonial, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            testimonialDotsContainer.appendChild(dot);
        });

        const testimonialDots = document.querySelectorAll('.testimonial-dot');

        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            currentTestimonial = index % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
            testimonialDots[currentTestimonial].classList.add('active');
        }

        function nextTestimonial() {
            showTestimonial(currentTestimonial + 1);
        }

        function prevTestimonial() {
            showTestimonial(currentTestimonial - 1 + testimonials.length);
        }

        // Initialize testimonial slider
        testimonialNextBtn.addEventListener('click', nextTestimonial);
        testimonialPrevBtn.addEventListener('click', prevTestimonial);
        setInterval(nextTestimonial, 7000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Tracking Form Submission
    const trackingForm = document.getElementById('trackingForm');
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const trackingNumber = document.getElementById('trackingNumber').value.trim();
            
            if (trackingNumber) {
                simulateTrackingResponse(trackingNumber);
            }
        });
    }

    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.stats-grid').forEach(grid => {
            observer.observe(grid);
        });

        function animateStats() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const suffix = stat.textContent.includes('%') ? '%' : '';
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        stat.textContent = Math.floor(count) + suffix;
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target + suffix;
                    }
                };
                
                updateCount();
            });
        }
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name && email && message) {
                alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
                contactForm.reset();
            }
        });
    }

    // Helper functions
    function simulateTrackingResponse(trackingNumber) {
        const trackingResults = document.getElementById('trackingResults');
        if (!trackingResults) return;
        
        // Show loading state
        trackingResults.innerHTML = `
            <div class="tracking-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Searching for shipment ${trackingNumber}...</p>
            </div>
        `;
        
        // Simulate API delay
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
        return `
            <div class="tracking-details">
                <div class="tracking-status">
                    <div class="tracking-id">Tracking #: ${trackingNumber}</div>
                    <div class="status-badge ${status}">
                        ${status.replace('-', ' ')}
                    </div>
                </div>
                <div class="tracking-progress">
                    <div class="progress-steps">
                        <div class="progress-bar" style="width: ${status === 'pending' ? '0%' : status === 'in-transit' ? '50%' : '100%'}"></div>
                        ${generateProgressSteps(status, shippedDate, deliveredDate)}
                    </div>
                </div>
                <div class="tracking-history">
                    <h3>Shipment History</h3>
                    ${generateHistoryItems(status, shippedDate, deliveredDate)}
                </div>
            </div>
        `;
    }

    function generateProgressSteps(status, shippedDate, deliveredDate) {
        return `
            <div class="progress-step">
                <div class="step-icon ${status !== 'pending' ? 'completed' : 'active'}">
                    <i class="fas fa-box"></i>
                </div>
                <div class="step-label ${status !== 'pending' ? 'active' : ''}">Processed</div>
                <div class="step-date">${formatDate(new Date(shippedDate.setDate(shippedDate.getDate() - 1)))}</div>
            </div>
            <div class="progress-step">
                <div class="step-icon ${status === 'in-transit' ? 'active' : status === 'delivered' ? 'completed' : ''}">
                    <i class="fas fa-shipping-fast"></i>
                </div>
                <div class="step-label ${status !== 'pending' ? 'active' : ''}">Shipped</div>
                <div class="step-date">${formatDate(shippedDate)}</div>
            </div>
            <div class="progress-step">
                <div class="step-icon ${status === 'delivered' ? 'completed' : ''}">
                    <i class="fas fa-check"></i>
                </div>
                <div class="step-label ${status === 'delivered' ? 'active' : ''}">Delivered</div>
                <div class="step-date">${status === 'delivered' ? formatDate(deliveredDate) : 'Estimated: ' + formatDate(deliveredDate)}</div>
            </div>
        `;
    }

    function generateHistoryItems(status, shippedDate, deliveredDate) {
        let html = `
            <div class="history-item">
                <div class="history-icon">
                    <i class="fas fa-check"></i>
                </div>
                <div class="history-content">
                    <h4 class="history-title">Order Processed</h4>
                    <div class="history-date">${formatDate(new Date(shippedDate.setDate(shippedDate.getDate() - 1)))}</div>
                    <div class="history-location">New York, USA</div>
                </div>
            </div>
        `;

        if (status !== 'pending') {
            html += `
                <div class="history-item">
                    <div class="history-icon">
                        <i class="fas fa-shipping-fast"></i>
                    </div>
                    <div class="history-content">
                        <h4 class="history-title">Package Shipped</h4>
                        <div class="history-date">${formatDate(shippedDate)}</div>
                        <div class="history-location">New York, USA</div>
                    </div>
                </div>
            `;
        }

        if (status === 'in-transit') {
            html += `
                <div class="history-item">
                    <div class="history-icon">
                        <i class="fas fa-plane"></i>
                    </div>
                    <div class="history-content">
                        <h4 class="history-title">In Transit</h4>
                        <div class="history-date">${formatDate(new Date())}</div>
                        <div class="history-location">In transit to destination</div>
                    </div>
                </div>
            `;
        }

        if (status === 'delivered') {
            html += `
                <div class="history-item">
                    <div class="history-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <div class="history-content">
                        <h4 class="history-title">Delivered</h4>
                        <div class="history-date">${formatDate(deliveredDate)}</div>
                        <div class="history-location">Delivered to recipient</div>
                    </div>
                </div>
            `;
        }

        return html;
    }

    function formatDate(date) {
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
});









// Add this to your existing script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Hero Video Handling
    const heroVideo = document.querySelector('.hero video');
    
    // Check if mobile device and fallback to image if needed
    function handleVideoFallback() {
        if (window.innerWidth <= 768) {
            // On mobile, pause video and rely on CSS fallback
            if (heroVideo) {
                heroVideo.pause();
            }
        } else {
            // On desktop, ensure video plays
            if (heroVideo) {
                heroVideo.play().catch(e => {
                    console.log("Video autoplay prevented:", e);
                    // Show play button or handle accordingly
                });
            }
        }
    }

    // Initial check
    handleVideoFallback();
    
    // Check on resize
    window.addEventListener('resize', handleVideoFallback);

    // Scroll down button functionality
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: window.innerHeight - 80,
                behavior: 'smooth'
            });
        });
    }

    // Rest of your existing JavaScript...
});



// Video handling with fallback
function initHeroVideo() {
    const videoContainer = document.querySelector('.video-container');
    const desktopVideo = document.querySelector('.desktop-video');
    const mobileVideo = document.querySelector('.mobile-video');
    
    // Check if mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const videoToUse = isMobile ? mobileVideo : desktopVideo;
    
    if (videoToUse) {
        // Force mute (required for iOS)
        videoToUse.muted = true;
        
        // Attempt to play
        const playPromise = videoToUse.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // If autoplay fails, show fallback
                videoContainer.classList.add('video-failed');
            });
        }
    }
}

// Initialize on load and if orientation changes
window.addEventListener('load', initHeroVideo);
window.addEventListener('orientationchange', initHeroVideo);