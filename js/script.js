/* ==========================================
   STICKY HEADER
========================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("active");
    menuToggle.classList.toggle("active");

});


/* ==========================================
   CLOSE MENU AFTER CLICK
========================================== */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");
        menuToggle.classList.remove("active");

    });

});


/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    links.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            window.scrollTo({

                top: target.offsetTop - 80,

                behavior: "smooth"

            });

        }

    });

});


/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters = document.querySelectorAll(".stat h3");

let counterStarted = false;

function runCounter() {

    counters.forEach(counter => {

        const text = counter.innerText;

        const target = parseInt(text.replace(/\D/g, ""));

        const suffix = text.replace(/[0-9]/g, "");

        let count = 0;

        const speed = target / 60;

        function update() {

            count += speed;

            if (count < target) {

                counter.innerText = Math.ceil(count) + suffix;

                requestAnimationFrame(update);

            } else {

                counter.innerText = target + suffix;

            }

        }

        update();

    });

}

window.addEventListener("scroll", () => {

    const heroStats = document.querySelector(".hero-stats");

    if (!heroStats) return;

    const top = heroStats.getBoundingClientRect().top;

    if (top < window.innerHeight - 100 && !counterStarted) {

        counterStarted = true;

        runCounter();

    }

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealItems = document.querySelectorAll(

".hero-content, .hero-image, .service-card, .about-content, .about-image"

);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.2

});

revealItems.forEach(item => {

    item.classList.add("hidden");

    observer.observe(item);

});


/* ==========================================
   PARALLAX FLOAT
========================================== */

const cards = document.querySelectorAll(".floating-card");

window.addEventListener("mousemove", e => {

    const x = (e.clientX / window.innerWidth - 0.5) * 20;

    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    cards.forEach((card, index) => {

        const depth = (index + 1) * 5;

        card.style.transform =
            `translate(${x / depth}px, ${y / depth}px)`;

    });

});


/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        circle.style.width = circle.style.height = diameter + "px";

        circle.style.left =

            e.clientX - this.offsetLeft - diameter / 2 + "px";

        circle.style.top =

            e.clientY - this.offsetTop - diameter / 2 + "px";

        circle.classList.add("ripple");

        const ripple = this.querySelector(".ripple");

        if (ripple) ripple.remove();

        this.appendChild(circle);

    });

});


/* ==========================================
   PRELOADER (OPTIONAL)
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* ==========================================
   BACK TO TOP
========================================== */

const backTop = document.querySelector(".back-to-top");

if (backTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    });

    backTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ===========================================
   CONTACT FORM
=========================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const submitBtn = contactForm.querySelector("button[type='submit']");
    const statusBox = contactForm.querySelector(".form-status");

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        statusBox.innerHTML = "";
        statusBox.className = "form-status";

        // Form Data

        const formData = new FormData(contactForm);

        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const phone = formData.get("phone").trim();
        const subject = formData.get("subject").trim();
        const message = formData.get("message").trim();

        // Validation

        if (name.length < 2) {

            showError("Please enter your name.");

            return;

        }

        if (!validateEmail(email)) {

            showError("Please enter a valid email address.");

            return;

        }

        if (subject.length < 3) {

            showError("Please enter a subject.");

            return;

        }

        if (message.length < 10) {

            showError("Message must be at least 10 characters.");

            return;

        }

        // Loading

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";

        try {

            const response = await fetch(contactForm.action, {

                method: "POST",

                body: formData

            });

            const result = await response.text();

            if (result.trim() === "success") {

                showSuccess(
                    "✅ Thank you! Your message has been sent successfully."
                );

                contactForm.reset();

            } else {

                showError(result);

            }

        } catch (err) {

            showError(
                "Something went wrong. Please try again later."
            );

        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = "Send Message";

    });

}


/* ===========================================
   EMAIL VALIDATION
=========================================== */

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/* ===========================================
   SUCCESS MESSAGE
=========================================== */

function showSuccess(message) {

    const status = document.querySelector(".form-status");

    status.innerHTML = message;

    status.style.color = "#16a34a";

}


/* ===========================================
   ERROR MESSAGE
=========================================== */

function showError(message) {

    const status = document.querySelector(".form-status");

    status.innerHTML = message;

    status.style.color = "#dc2626";

}


/* ===========================================
   INPUT FOCUS EFFECT
=========================================== */

const fields = document.querySelectorAll(

    ".contact-form input, .contact-form textarea"

);

fields.forEach(field => {

    field.addEventListener("focus", () => {

        field.parentElement.classList.add("active");

    });

    field.addEventListener("blur", () => {

        field.parentElement.classList.remove("active");

    });

});


/* ===========================================
   CHARACTER COUNTER
=========================================== */

const textarea = document.querySelector(

    ".contact-form textarea"

);

if (textarea) {

    const counter = document.createElement("small");

    counter.className = "char-counter";

    counter.innerHTML = "0 / 1000";

    textarea.parentElement.appendChild(counter);

    textarea.addEventListener("input", () => {

        counter.innerHTML =
            textarea.value.length + " / 1000";

    });

}


/* ===========================================
   AUTO HIDE MESSAGE
=========================================== */

document.addEventListener("submit", () => {

    setTimeout(() => {

        const status = document.querySelector(".form-status");

        if (status) {

            status.innerHTML = "";

        }

    }, 5000);

});



// Fade In Animation

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.2
});

document.querySelectorAll(".about-content,.about-image,.service-card")
.forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});
