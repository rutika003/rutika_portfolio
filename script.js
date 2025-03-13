document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");
    const greeting = document.getElementById("greeting");
    const progressBars = document.querySelectorAll(".progress");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    
    if (menuIcon && navbar) {
        menuIcon.addEventListener("click", function () {
            navbar.classList.toggle("active");
        });
    }

    function updateGreeting() {
        const hour = new Date().getHours();
        let message = "";

        if (hour >= 5 && hour < 12) {
            message = "Good Morning 🌞";
        } else if (hour >= 12 && hour < 18) {
            message = "Good Afternoon ☀️";
        } else if (hour >= 18 && hour < 22) {
            message = "Good Evening 🌆";
        } else {
            message = "Good Night 🌙";
        }        

        greeting.textContent = message;

        greeting.style.animation = "none";
        setTimeout(() => {
            greeting.style.animation = "fadeSlideIn 1.5s ease-out forwards";
        }, 10);
    }

    updateGreeting();
    progressBars.forEach((bar) => {
        let width = bar.style.width;
        bar.style.width = "0"; // Start from 0

        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("light-mode");

        if (body.classList.contains("light-mode")) {
            themeToggle.textContent = "🌙"; 
            localStorage.setItem("theme", "light");
        } else {
            themeToggle.textContent = "☀️"; 
            localStorage.setItem("theme", "dark");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const submitBtn = document.getElementById("submitBtn");

    const inputs = [nameInput, emailInput, phoneInput, subjectInput, messageInput];

    function validateInput(input, regex, minLength, errorMsg) {
        const value = input.value.trim();
        let errorMessage = input.nextElementSibling;

        // Ensure error message span exists
        if (!errorMessage || !errorMessage.classList.contains("error-message")) {
            errorMessage = document.createElement("span");
            errorMessage.classList.add("error-message");
            input.parentNode.appendChild(errorMessage);
        }

        if (value.length < minLength || (regex && !regex.test(value))) {
            errorMessage.textContent = errorMsg;
            input.style.border = "2px solid red";
            return false;
        } else {
            errorMessage.textContent = "";
            input.style.border = "2px solid green";
            return true;
        }
    }

    function validateForm() {
        const isValidName = validateInput(nameInput, /^[a-zA-Z ]+$/, 3, "Name must be at least 3 letters.");
        const isValidEmail = validateInput(emailInput, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 1, "Enter a valid email.");
        const isValidPhone = validateInput(phoneInput, /^[0-9]{10}$/, 10, "Phone number must be exactly 10 digits.");
        const isValidSubject = validateInput(subjectInput, /^[a-zA-Z0-9 ]+$/, 3, "Subject must be at least 3 characters.");
        const isValidMessage = validateInput(messageInput, null, 20, "Message must be at least 20 characters.");

        submitBtn.disabled = !(isValidName && isValidEmail && isValidPhone && isValidSubject && isValidMessage);
    }

    // Attach validation to all inputs
    inputs.forEach(input => input.addEventListener("input", validateForm));

    form.addEventListener("submit", function (event) {
        validateForm();
        if (submitBtn.disabled) {
            event.preventDefault(); // Prevent form submission if validation fails
        } else {
            alert("Form submitted successfully!");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("Vrfe_vDchmCpWbsEc"); // Replace with your Public Key

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // Sending data to EmailJS
        emailjs.send("service_oix272p", "template_j2ke458", {
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        }).then(response => {
            alert("Message sent successfully!");
            form.reset();
        }).catch(error => {
            alert("Failed to send message: " + JSON.stringify(error));
        });
    });
});
