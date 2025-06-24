// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    const slidesToShow = window.innerWidth > 768 ? 3 : 1;
    
    // Auto-play settings
    let autoplayInterval;
    const autoplayDelay = 5000;
    
    // Clone slides for seamless infinite scroll
    function cloneSlides() {
        // Clone first few slides and append to end
        for (let i = 0; i < slidesToShow; i++) {
            const clone = slides[i].cloneNode(true);
            clone.classList.add('clone');
            track.appendChild(clone);
        }
        
        // Clone last few slides and prepend to beginning
        for (let i = totalSlides - slidesToShow; i < totalSlides; i++) {
            const clone = slides[i].cloneNode(true);
            clone.classList.add('clone');
            track.insertBefore(clone, track.firstChild);
        }
    }
    
    // Set initial slide width and position
    function setSlideWidth() {
        const slideWidth = 100 / slidesToShow;
        const allSlides = Array.from(track.children);
        
        allSlides.forEach(slide => {
            slide.style.minWidth = `${slideWidth}%`;
        });
        
        // Start at the first real slide (after cloned slides)
        currentSlide = slidesToShow;
        moveToSlideInstant(currentSlide);
    }
    
    // Move to specific slide with animation
    function moveToSlide(targetIndex) {
        const slideWidth = 100 / slidesToShow;
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${targetIndex * slideWidth}%)`;
        currentSlide = targetIndex;
        updateIndicators();
    }
    
    // Move to specific slide without animation
    function moveToSlideInstant(targetIndex) {
        const slideWidth = 100 / slidesToShow;
        track.style.transition = 'none';
        track.style.transform = `translateX(-${targetIndex * slideWidth}%)`;
        currentSlide = targetIndex;
        updateIndicators();
    }
    
    // Update indicator dots
    function updateIndicators() {
        const realSlideIndex = (currentSlide - slidesToShow) % totalSlides;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === realSlideIndex);
        });
    }
    
    // Next slide function
    function nextSlide() {
        const maxSlide = totalSlides + slidesToShow;
        moveToSlide(currentSlide + 1);
        
        // If we're at the end, instantly jump to the beginning
        if (currentSlide >= maxSlide) {
            setTimeout(() => {
                moveToSlideInstant(slidesToShow);
            }, 500); // Wait for transition to complete
        }
    }
    
    // Previous slide function
    function prevSlide() {
        moveToSlide(currentSlide - 1);
        
        // If we're at the beginning, instantly jump to the end
        if (currentSlide < slidesToShow) {
            setTimeout(() => {
                moveToSlideInstant(totalSlides + slidesToShow - 1);
            }, 500); // Wait for transition to complete
        }
    }
    
    // Start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }
    
    // Stop autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Event listeners
    nextButton.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });
    
    prevButton.addEventListener('click', () => {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });
    
    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoplay();
            moveToSlide(index + slidesToShow);
            startAutoplay();
        });
    });
    
    // Pause autoplay on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        stopAutoplay();
        // Remove clones
        const clones = track.querySelectorAll('.clone');
        clones.forEach(clone => clone.remove());
        
        // Recalculate slidesToShow
        const newSlidesToShow = window.innerWidth > 768 ? 3 : 1;
        if (newSlidesToShow !== slidesToShow) {
            location.reload(); // Simple solution for resize
        } else {
            cloneSlides();
            setSlideWidth();
            startAutoplay();
        }
    });
    
    // Initialize
    cloneSlides();
    setSlideWidth();
    startAutoplay();
});

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize scroll animations
window.addEventListener('load', function() {
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Handle scroll events
    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Check on load
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // You can adjust these parameters to control scroll speed
                const scrollOptions = {
                    behavior: 'smooth', 
                    block: 'start',      
                    inline: 'nearest'
                };
                
                // Scroll to the target element
                targetElement.scrollIntoView(scrollOptions);
            }
        });
    });
});

// Timeline animation on scroll
function handleTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const itemVisible = 200;
        
        if (itemTop < window.innerHeight - itemVisible) {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 200);
        }
    });
}

// Update your existing handleScrollAnimations function to include timeline
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
    
    // Add timeline animations
    handleTimelineAnimations();
}

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when overlay is clicked
    navOverlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
});

// Add this to your JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Add index attributes to menu items for staggered animation
    const menuItems = document.querySelectorAll('.nav-menu li');
    menuItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
});

