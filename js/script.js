document.addEventListener('DOMContentLoaded', () => {
    // 🌙 Dark Mode Toggle with Sun/Moon + LocalStorage
    const darkToggle = document.getElementById('darkToggle');
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        const icon = darkToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            const icon = darkToggle.querySelector('i');
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // ⌨️ Rotating Typing Animation for Multiple Roles with Fade-in
    const typedText = document.getElementById('typedText');
    if (typedText) {
        const roles = [
            "Full-Stack Developer",
            "Java Developer",
            "Network Admin",
            "Cloud Enthusiast",
            "Security Analyst",
            "Database & Data Analyst",
            "UI/UX Designer",
            "Problem Solver",
            "Business Analyst",
            "Tech Enthusiast",
            "Innovator",
            "Management & Leadership"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            if (!isDeleting && charIndex < currentRole.length) {
                typedText.textContent += currentRole.charAt(charIndex);
                charIndex++;
                typedText.classList.add('visible');
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                typedText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 50);
            } else {
                if (!isDeleting && charIndex === currentRole.length) {
                    // Pause before deleting
                    setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, 1500);
                } else if (isDeleting && charIndex === 0) { // Move to next role
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    typedText.classList.remove('visible'); // fade out before next role
                    setTimeout(type, 500);
                }
            }
        }

        type();
    }

    // ⬆️ Scroll-to-Top Button
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // 📬 Contact Form Validation + EmailJS + Button Spinner
    const form = document.getElementById('contact-form');
    if (form) {
        const sendBtn = document.getElementById('sendBtn');
        const btnText = sendBtn.querySelector('.btn-text');
        const btnSpinner = sendBtn.querySelector('.btn-spinner');
        const status = document.querySelector('.form-status');

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // Basic validation
            const inputs = form.querySelectorAll('input, textarea');
            let valid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'red';
                    valid = false;
                } else {
                    input.style.borderColor = '#d1d5db';
                }
            });
            if (!valid) return;

            // Show spinner inside button
            btnText.textContent = 'Sending...';
            btnSpinner.style.display = 'inline-block';
            sendBtn.disabled = true;
            if (status) status.textContent = '';

            // EmailJS send
            emailjs.sendForm('service_hqd7ytc', 'template_8le35n8', this, 'jEsOTEHyZsXGMysZW')
                .then(() => {
                    btnText.textContent = 'Send Message';
                    btnSpinner.style.display = 'none';
                    sendBtn.disabled = false;
                    if (status) {
                        status.textContent = '✅ Message sent successfully!';
                        status.style.color = 'green';
                    }
                    this.reset();
                }, (error) => {
                    btnText.textContent = 'Send Message';
                    btnSpinner.style.display = 'none';
                    sendBtn.disabled = false;
                    if (status) {
                        status.textContent = '❌ Failed to send message. Please try again.';
                        status.style.color = 'red';
                    }
                    console.error('EmailJS error:', error);
                });
        });
    }

// 🗂️ Project Filter Tabs
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                card.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
            });
        });
    });


// 🎯 Section Fade-In Transitions
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {threshold: 0.1});
    sections.forEach(section => observer.observe(section));

// 🍔 Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

// 📂 Dropdown Toggles
    document.querySelectorAll('.dropdown-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const dropdown = button.parentElement;
            dropdown.classList.toggle('open');
        });
    });
})
;


document.addEventListener('DOMContentLoaded', () => {
    // 🔹 Auto-slide thumbnails in project cards
    const cardSliders = document.querySelectorAll('.card-slider');
    cardSliders.forEach(slider => {
        const images = slider.querySelectorAll('img');
        let index = 0;

        if (images.length > 0) {
            images[0].classList.add('active');
        }

        setInterval(() => {
            images[index].classList.remove('active');
            index = (index + 1) % images.length;
            images[index].classList.add('active');
        }, 10000); // 10 seconds per slide
    });

    // 🔹 Modal open
    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = "hidden"; // prevent background scroll
            }
        });
    });

    // 🔹 Modal close (via close button)
    document.querySelectorAll('.modal .close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.classList.remove('show');
            document.body.style.overflow = "auto";
        });
    });

    // 🔹 Close modal when clicking outside
    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
            document.body.style.overflow = "auto";
        }
    });

    // 🔹 Manual slider logic inside modals
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slides img');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        let index = 0;

        // Show first image
        if (slides.length > 0) {
            slides[index].classList.add('active');
        }

        const show = i => {
            slides[index].classList.remove('active');
            index = (i + slides.length) % slides.length;
            slides[index].classList.add('active');
        };

        prevBtn.addEventListener('click', e => {
            e.stopPropagation();
            e.preventDefault();
            show(index - 1);
        });

        nextBtn.addEventListener('click', e => {
            e.stopPropagation();
            e.preventDefault();
            show(index + 1);
        });
    });
});



document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    emailjs.sendForm('service_hqd7ytc', 'template_8le35n8', this, 'jEsOTEHyZsXGMysZW').then(() => {
        document.querySelector('.form-status').textContent = '✅ Message sent successfully!';
        document.querySelector('.form-status').style.color = 'green';
        this.reset();
    }, (error) => {
        document.querySelector('.form-status').textContent = '❌ Failed to send message. Please try again.';
        document.querySelector('.form-status').style.color = 'red';
        console.error('EmailJS error:', error);
    });
});