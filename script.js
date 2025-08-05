// Common Animations for All Pages
document.addEventListener('DOMContentLoaded', function() {
    // Title color animation
    const animatedTitles = document.querySelectorAll('.animated-title');
    const colors = ['#00ff88', '#00ffff', '#ff00ff', '#ffaa00'];
    let currentIndex = 0;

    if(animatedTitles.length > 0) {
        setInterval(() => {
            animatedTitles.forEach(title => {
                title.style.color = colors[currentIndex];
                title.style.textShadow = `0 0 10px ${colors[currentIndex]}`;
            });
            currentIndex = (currentIndex + 1) % colors.length;
        }, 2000);
    }

    // Hover scale animation
    const hoverElements = document.querySelectorAll('.hover-scale');
    hoverElements.forEach(element => {
        element.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// Home Page Specific Animations (to be added in home.html)
function initHomeAnimations() {
    // Profile image upload handling
    const fileInput = document.getElementById('file-input');
    const uploadButton = document.getElementById('upload-button');
    const profileImage = document.querySelector('.profile-image');

    if(fileInput && uploadButton && profileImage) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImage.style.display = 'block';
                    profileImage.src = e.target.result;
                    uploadButton.style.display = 'none';
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Floating animation
    const card = document.querySelector('.card');
    if(card) {
        card.style.animation = 'float 4s ease-in-out infinite';
    }
}

// Contact Page Specific Animations (to be added in contact.html)
function initContactAnimations() {
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will respond shortly.');
            this.reset();
        });
    }
}
// Add to script.js
function openDetail(evt, detailName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabContents.forEach(content => content.classList.remove('active'));
    tabLinks.forEach(link => link.classList.remove('active'));
    
    evt.currentTarget.classList.add('active');
    document.getElementById(detailName).classList.add('active');
}
// Corrected Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            const parent = this.closest('.project-details');
            const tabName = this.dataset.tab;
            
            // Remove active class from all tabs and contents
            parent.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
            parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            parent.querySelector(`#${tabName}`).classList.add('active');
        });
    });
});
// Tab System Controller
document.querySelectorAll('.feature-category h3').forEach(header => {
    header.addEventListener('click', () => {
        // Toggle active class on categories
        document.querySelectorAll('.feature-category').forEach(cat => {
            cat.classList.remove('active');
        });
        header.parentElement.classList.add('active');
    });
});

// Template Preview Handler
document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', function() {
        const templateType = this.classList.contains('calculator') ? 'calculator' : 'tictactoe';
        showTemplatePreview(templateType);
    });
});

function showTemplatePreview(type) {
    // Implementation for template preview modal
}
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Message sent successfully!</p>
            `;
            this.parentElement.appendChild(successMessage);
            this.reset();
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
        document.getElementById('contactForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            
            try {
                const response = await fetch(e.target.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    const success = document.createElement('div');
                    success.className = 'success-message';
                    success.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <p>Message sent successfully!</p>
                    `;
                    e.target.parentElement.appendChild(success);
                    e.target.reset();
                    
                    setTimeout(() => success.remove(), 5000);
                } else {
                    alert('Error sending message. Please try again.');
                }
            } catch (error) {
                alert('Network error. Please check your connection.');
            }
        });