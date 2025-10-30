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
      let total = 0;
      let selectedCoursesCount = 0;

      // Calculate initial total from selected courses
      courseCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          total += parseFloat(checkbox.value);
          selectedCoursesCount++;
        }
      });

      // Calculate VAT amount (15% of total)
      const vatAmount = total * 0.15;

      // Calculate subtotal (total - VAT)
      const subtotal = total - vatAmount;

      // Calculate discount based on number of courses
      let discountAmount = 0;
      if (selectedCoursesCount >= 2) {
        if (selectedCoursesCount === 2) {
          discountAmount = total * 0.05; // 5% of total
        } else if (selectedCoursesCount === 3) {
          discountAmount = total * 0.1; // 10% of total
        } else if (selectedCoursesCount > 3) {
          discountAmount = total * 0.15; // 15% of total
        }
      }

      // Calculate final total after discount
      const finalTotal = total - discountAmount;

      // Show quote summary
      if (quoteSummary) {
        quoteSummary.style.display = "block";
      }

      // Update display values
      subtotalEl.textContent = `R${subtotal.toFixed(2)}`;
      discountEl.textContent = `R${discountAmount.toFixed(2)}`;
      vatEl.textContent = `R${vatAmount.toFixed(2)}`;
      totalEl.textContent = `R${finalTotal.toFixed(2)}`; // Now showing total after discount
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
