// js/menu.js
export function initMenu() {
  const burger = document.querySelector("#burger");
  const nav = document.querySelector("#site-nav");
  const header = document.querySelector(".site-header");

  if (!burger || !nav || !header) return;

  const OPEN_CLASS = "is-menu-open";

  const openMenu = () => {
    header.classList.add(OPEN_CLASS);
    burger.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    header.classList.remove(OPEN_CLASS);
    burger.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    header.classList.contains(OPEN_CLASS) ? closeMenu() : openMenu();
  };

  // toggle по бургеру
  burger.addEventListener("click", toggleMenu);

  // закрыть по Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // закрыть по клику на ссылку + плавный скролл
  nav.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    e.preventDefault();
    const id = link.getAttribute("href");
    const target = document.querySelector(id);

    closeMenu();

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // закрыть при клике вне меню (когда открыто)
  document.addEventListener("click", (e) => {
    if (!header.classList.contains(OPEN_CLASS)) return;
    const clickedInside = header.contains(e.target);
    if (!clickedInside) closeMenu();
  });
}