const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    mobileNav.classList.toggle("open", isOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      mobileNav.classList.remove("open");
    });
  });
}

document.querySelectorAll("[data-image-fallback]").forEach((image) => {
  const fallback = document.getElementById(image.dataset.imageFallback);
  if (!fallback) return;

  const showFallback = () => {
    image.hidden = true;
    fallback.hidden = false;
  };

  image.addEventListener("error", showFallback);
  image.addEventListener("load", () => {
    image.hidden = false;
    fallback.hidden = true;
  });
  fallback.hidden = true;
  if (image.complete && image.naturalWidth === 0) showFallback();
  if (image.complete && image.naturalWidth > 0) fallback.hidden = true;
});

const enquiryForm = document.querySelector("#enquiryForm");
const formNote = document.querySelector("#formNote");

if (enquiryForm && formNote) {
  const mobileInput = enquiryForm.elements.namedItem("mobile");
  mobileInput.addEventListener("input", () => mobileInput.setCustomValidity(""));

  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const mobileDigits = mobileInput.value.replace(/\D/g, "");
    mobileInput.setCustomValidity(
      mobileDigits.length >= 8 && mobileDigits.length <= 15
        ? ""
        : "Enter a valid phone number with 8 to 15 digits."
    );
    if (!enquiryForm.reportValidity()) return;

    const formData = new FormData(enquiryForm);
    const message = [
      "Hello Bhagwan S. Kumawat,",
      "",
      "I am interested in your financial services.",
      "",
      `Name: ${formData.get("name")}`,
      `Mobile: ${formData.get("mobile")}`,
      `Email: ${formData.get("email") || "Not provided"}`,
      `Service Interested In: ${formData.get("service")}`,
      `Requirement: ${formData.get("requirement") || "Not provided"}`,
      `Message: ${formData.get("message") || "Not provided"}`,
      "",
      "Please contact me regarding my enquiry.",
      "",
      "Thank you."
    ].join("\n");

    const whatsappUrl = new URL("https://wa.me/918141913180");
    whatsappUrl.searchParams.set("text", message);
    const whatsappWindow = window.open(whatsappUrl.toString(), "_blank", "noopener,noreferrer");

    if (whatsappWindow) {
      formNote.textContent = "Your enquiry is ready in WhatsApp. Please review and send it to complete your enquiry.";
    } else {
      formNote.textContent = "WhatsApp could not be opened. Please allow pop-ups or contact Bhagwan directly at 81419 13180.";
    }
  });
}

const currentYear = document.querySelector("#currentYear");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
