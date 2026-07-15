// Created by Microsoft CoPilot for Judah's Portfolio publication 2026

/* ============================================================
   DONATION PAGE INITIALIZER
   ------------------------------------------------------------
   This file ONLY connects the donation.html form to the shared
   logic in forms.js. Keeping this separate helps your brain
   see clearly what belongs to which page.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function() {
    const donationForm = document.querySelector("form");

    // Connect this specific form to the shared behaviour
    attachFormBehaviour(donationForm);
});