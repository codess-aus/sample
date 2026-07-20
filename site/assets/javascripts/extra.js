/**
 * extra.js — minimal progressive-enhancement JavaScript
 * Handles booking-form client-side validation and status feedback.
 * No frameworks or build tools required.
 */

(function () {
  "use strict";

  /* ---------- Booking form ---------- */

  const form = document.getElementById("booking-form");
  if (!form) return;

  const statusRegion = document.getElementById("form-status");

  /**
   * Show a status message in the accessible live region.
   * @param {string} html   - Inner HTML to display
   * @param {"success"|"error"|""} type
   */
  function showStatus(html, type) {
    statusRegion.innerHTML = html;
    statusRegion.className =
      "form-status" + (type ? " form-status--" + type : "");
  }

  /**
   * Set or clear a validation error for a field.
   * @param {HTMLElement} field
   * @param {string} message - Empty string to clear.
   */
  function setError(field, message) {
    const errorId = field.id + "-error";
    const errorEl = document.getElementById(errorId);
    if (!errorEl) return;

    errorEl.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  /**
   * Validate a single required field.
   * Returns true if valid.
   */
  function validateField(field) {
    if (field.required && !field.value.trim()) {
      const label =
        form.querySelector('label[for="' + field.id + '"]')?.textContent
          .replace("*", "")
          .trim() || "This field";
      setError(field, label + " is required.");
      return false;
    }
    if (field.type === "email" && field.value.trim()) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(field.value.trim())) {
        setError(field, "Please enter a valid email address.");
        return false;
      }
    }
    setError(field, "");
    return true;
  }

  /* Validate on blur for individual fields */
  form.querySelectorAll("input, textarea, select").forEach(function (field) {
    field.addEventListener("blur", function () {
      validateField(field);
    });
  });

  /* Full validation on submit */
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach(function (field) {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      showStatus(
        "Please correct the errors above before submitting.",
        "error"
      );
      // Move focus to the first invalid field
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    /* Attempt to submit via fetch (for Formspree and similar services) */
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        showStatus(
          "<strong>Thank you for your enquiry.</strong> " +
            "We will be in touch within a few business days.",
          "success"
        );
        form.reset();
        statusRegion.focus();
      } else {
        const data = await response.json().catch(() => ({}));
        const msg =
          data.errors?.map((e) => e.message).join(", ") ||
          "Something went wrong. Please try again or email us directly.";
        showStatus(msg, "error");
      }
    } catch (_err) {
      showStatus(
        "Unable to send your enquiry right now. " +
          "Please email <a href='mailto:hello@placeholder.example'>hello@placeholder.example</a> directly.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Enquiry";
    }
  });
})();
