// Created by Microsoft CoPilot for Judah's Portfolio publication 2026

/* ============================================================
   SHARED FORM LOGIC FOR PET PANTRY FORMS
   ------------------------------------------------------------
   This file contains all the reusable logic that BOTH forms
   (donation.html and volunteer.html) will use.

   The goal: one brain, one system, one place to maintain logic.
   Each HTML page will load this file + its own small initializer.
   ============================================================ */


/* ------------------------------------------------------------
   FUNCTION: attachFormBehaviour(formElement)
   ------------------------------------------------------------
   This function receives a <form> element from the HTML page.
   It then attaches:
   - basic validation
   - a fake "successful submission" message (for now)
   - future FormSpree compatibility

   Each page will call this function with its own form.
   ------------------------------------------------------------ */
function attachFormBehaviour(formElement) {

    // This prevents the form from actually refreshing the page.
    formElement.addEventListener("submit", function(event) {
        event.preventDefault(); // stops default browser behaviour

        // Run validation before pretending to submit
        const isValid = validateForm(formElement);

        if (!isValid) {
            showMessage("Please fill in all required fields.", "error");
            return;
        }

        // Eventually, this is where FormSpree will go.
        // For now, we simulate a successful submission.
        showMessage("Your form has been successfully submitted!", "success");

        // Reset the form visually
        formElement.reset();
    });
}

/* ------------------------------------------------------------
   FUNCTION: validateForm(formElement)
   ------------------------------------------------------------
   This is a simple validation system:
   - It checks every <input> inside the form.
   - If any input is empty, it marks it red and returns false.
   - If all inputs have content, it returns true.

   You can expand this later (email format, phone format, etc.)
   ------------------------------------------------------------ */
function validateForm(formElement) {
    let allGood = true;

    const inputs = formElement.querySelectorAll("input");

    inputs.forEach(input => {
        // Remove old error styling
        input.classList.remove("error");

        // If empty, mark it and fail validation
        if (input.value.trim() === "") {
            input.classList.add("error");
            allGood = false;
        }
    });

    return allGood;
}

/* ------------------------------------------------------------
   FUNCTION: showMessage(text, type)
   ------------------------------------------------------------
   Creates a floating message box at the top of the page.

   type = "success" or "error"
   You can style these in CSS however you want.
   ------------------------------------------------------------ */
function showMessage(text, type) {
    const box = document.createElement("div");
    box.className = `form-message ${type}`;
    box.textContent = text;

    document.body.appendChild(box);

    // Remove message after 3 seconds
    setTimeout(() => {
        box.remove();
    }, 3000);
}

/* ============================================================
   SHARED FORM LOGIC — NOW WITH FIELD-LEVEL VALIDATION
   ------------------------------------------------------------
   This file handles:
   - inline validation (per field)
   - submit validation
   - success/error messages
   - future FormSpree compatibility
   ============================================================ */


/* ------------------------------------------------------------
   attachFormBehaviour(formElement)
   ------------------------------------------------------------ */
function attachFormBehaviour(formElement) {

    // Attach real-time validation to each input
    const inputs = formElement.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("input", () => validateSingleField(input));
    });

    // Handle form submission
    formElement.addEventListener("submit", function(event) {
        event.preventDefault();

        const isValid = validateForm(formElement);

        if (!isValid) {
            showMessage("Please correct the highlighted fields.", "error");
            return;
        }

        showMessage("Your form has been successfully submitted!", "success");
        formElement.reset();

        // Clear validation messages after reset
        inputs.forEach(input => clearFieldMessage(input));
    });
}


/* ------------------------------------------------------------
   validateForm(formElement)
   ------------------------------------------------------------
   Runs validation on ALL fields.
   ------------------------------------------------------------ */
function validateForm(formElement) {
    let allGood = true;

    const inputs = formElement.querySelectorAll("input");
    inputs.forEach(input => {
        const fieldGood = validateSingleField(input);
        if (!fieldGood) allGood = false;
    });

    return allGood;
}


/* ------------------------------------------------------------
   validateSingleField(input)
   ------------------------------------------------------------
   Validates ONE field at a time.
   - Checks if empty
   - Checks email format (if type=email)
   - Checks phone format (if type=tel or number)
   - Shows inline message under the field
   ------------------------------------------------------------ */
function validateSingleField(input) {
    const value = input.value.trim();
    let message = "";

    // Required field check
    if (value === "") {
        message = "This field is required.";
    }

    // Email format check
    if (input.type === "email" && value !== "") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            message = "Please enter a valid email address.";
        }
    }

    // Phone number check (simple)
    if ((input.type === "tel" || input.type === "number") && value !== "") {
        const phonePattern = /^[0-9\-+\s()]{7,}$/;
        if (!phonePattern.test(value)) {
            message = "Please enter a valid phone number.";
        }
    }

    // Apply visual + message feedback
    if (message !== "") {
        input.classList.add("error");
        showFieldMessage(input, message);
        return false;
    } else {
        input.classList.remove("error");
        clearFieldMessage(input);
        return true;
    }
}


/* ------------------------------------------------------------
   showFieldMessage(input, message)
   ------------------------------------------------------------
   Places a small message directly under the field.
   ------------------------------------------------------------ */
function showFieldMessage(input, message) {
    clearFieldMessage(input); // remove old message

    const msg = document.createElement("div");
    msg.className = "field-message";
    msg.textContent = message;

    input.insertAdjacentElement("afterend", msg);
}


/* ------------------------------------------------------------
   clearFieldMessage(input)
   ------------------------------------------------------------
   Removes the inline message under a field.
   ------------------------------------------------------------ */
function clearFieldMessage(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("field-message")) {
        next.remove();
    }
}


/* ------------------------------------------------------------
   showMessage(text, type)
   ------------------------------------------------------------
   Floating top-of-page message.
   ------------------------------------------------------------ */
function showMessage(text, type) {
    const box = document.createElement("div");
    box.className = `form-message ${type}`;
    box.textContent = text;

    document.body.appendChild(box);

    setTimeout(() => box.remove(), 3000);
}