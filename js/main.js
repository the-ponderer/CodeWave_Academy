import { initMenu } from "./menu.js";
import { initSliders } from "./slider.js";
import { initModal } from "./modal.js";
import { initContactForm } from "./form.js";


document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initSliders();
  initModal();
  initContactForm();
});