// Global function to create and display the popup
function showPopup(message) {
  const popup = document.createElement("div");
  popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
    text-align: center;
  `;

  const messageText = document.createElement("p");
  messageText.textContent = message;
  messageText.style.marginBottom = "20px";

  const closeButton = document.createElement("button");
  closeButton.textContent = "OK";
  closeButton.className = "btn btn-primary";
  closeButton.onclick = () => popup.remove();

  popup.appendChild(messageText);
  popup.appendChild(closeButton);
  document.body.appendChild(popup);
}

// Menu Mobile
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
      // Optional: Add a class to the body to prevent scrolling when menu is open
      document.body.classList.toggle("no-scroll");
    });
  }
});

// ----------------------------------- //
// Quote Calculation Logic
// ----------------------------------- //
document.addEventListener("DOMContentLoaded", () => {
  // Quotation Form
  const quoteForm = document.getElementById("quote-form");
  if (quoteForm) {
    const courseCheckboxes = quoteForm.querySelectorAll('input[name="course"]');
    const subtotalEl = document.getElementById("subtotal");
    const discountEl = document.getElementById("discount");
    const vatEl = document.getElementById("vat");
    const totalEl = document.getElementById("total");
    const calculateBtn = document.getElementById("calculate-btn");
    const quoteSummary = document.querySelector(".quote-summary");
    const requestBtn = document.getElementById("request-btn");

    // Hide quote summary initially
    if (quoteSummary) {
      quoteSummary.style.display = "none";
    }

    const calculateTotal = () => {
      let subtotal = 0;
      let selectedCoursesCount = 0;

      courseCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          subtotal += parseFloat(checkbox.value);
          selectedCoursesCount++;
        }
      });

      let discountRate = 0;
      if (selectedCoursesCount === 2) {
        discountRate = 0.05; // 5%
      } else if (selectedCoursesCount === 3) {
        discountRate = 0.1; // 10%
      } else if (selectedCoursesCount > 3) {
        discountRate = 0.15; // 15%
      }

      const discountAmount = subtotal * discountRate;
      const subtotalAfterDiscount = subtotal - discountAmount;
      const vatAmount = subtotalAfterDiscount * 0.15; // 15% VAT
      const totalAmount = subtotalAfterDiscount + vatAmount;

      // Show quote summary
      if (quoteSummary) {
        quoteSummary.style.display = "block";
      }

      subtotalEl.textContent = `R${subtotal.toFixed(2)}`;
      discountEl.textContent = `R${discountAmount.toFixed(2)}`;
      vatEl.textContent = `R${vatAmount.toFixed(2)}`;
      totalEl.textContent = `R${totalAmount.toFixed(2)}`;
    };

    // Add click event to calculate button
    if (calculateBtn) {
      calculateBtn.addEventListener("click", calculateTotal);
    }

    // Add event for Request Quote button
    requestBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (quoteForm.checkValidity()) {
        showPopup(
          "Your quote request has been sent successfully! We will contact you with more information."
        );
        quoteForm.reset();
        quoteSummary.style.display = "none";
      } else {
        showPopup("Please fill in all required fields.");
      }
    });
  }

  // Manage general contact form
  const contactForm = document.getElementById("general-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (contactForm.checkValidity()) {
        showPopup("Your message has been sent successfully!");
        contactForm.reset();
      } else {
        showPopup("Please fill in all required fields.");
      }
    });
  }
});
