import { initMenu } from "./menu.js";
import { initSliders } from "./slider.js";
import { initModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initSliders();
  initModal();
});