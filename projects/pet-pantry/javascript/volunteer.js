// Created by Microsoft CoPilot for Judah's Portfolio publication 2026

/* ============================================================
   VOLUNTEER PAGE INITIALIZER
   ------------------------------------------------------------
   This file ONLY connects the volunteer.html form to the shared
   logic in forms.js. Same pattern as donation.js.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function() {
    const volunteerForm = document.querySelector("form");

    // Connect this specific form to the shared behaviour
    attachFormBehaviour(volunteerForm);
});