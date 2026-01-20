// js/modal.js
export function initModal() {
  const modal = document.querySelector("#modal");
  if (!modal) return;

  const backdrop = modal.querySelector(".modal__overlay");  const closeBtn = modal.querySelector("[data-modal-close]");
  const img = modal.querySelector(".modal__img");
  const cap = modal.querySelector(".modal__cap");

  let lastFocus = null;

  const lockScroll = (lock) => {
    document.documentElement.classList.toggle("is-modal-open", lock);
    document.body.classList.toggle("is-modal-open", lock);
  };

  const open = ({ src, alt = "", caption = "" } = {}) => {
    lastFocus = document.activeElement;

    if (img && src) {
      img.src = src;
      img.alt = alt || "";
    }

    if (cap) {
      cap.textContent = caption || alt || "";
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    lockScroll(true);

    // фокус на кнопку закрытия (или модалку)
    (closeBtn || modal).focus?.();
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    lockScroll(false);

    // чистим картинку (чтобы не грузилась, когда закрыто)
    if (img) img.src = "";

    // возвращаем фокус туда, где был
    lastFocus?.focus?.();
  };

  // Открытие по data-modal-open
  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-modal-open]");
    if (!opener) return;

    // сейчас поддержим только image
    const type = opener.dataset.modalOpen;
    if (type !== "image") return;

    const src = opener.dataset.src;
    const alt = opener.dataset.alt || "";

    // подпись: сначала data-cap, иначе figcaption рядом, иначе alt
    const figure = opener.closest("figure");
    const figCap = figure?.querySelector("figcaption")?.textContent?.trim() || "";
    const caption = opener.dataset.cap || figCap || alt;

    open({ src, alt, caption });
  });

// Закрытие: крестик + оверлей (и вообще любой элемент с data-modal-close)
modal.addEventListener("click", (e) => {
  if (e.target.closest("[data-modal-close]")) close();
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("is-open")) return;
  if (e.key === "Escape") {
    e.preventDefault();
    close();
  }
});
}