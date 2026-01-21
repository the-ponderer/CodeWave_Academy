// js/modal.js
export function initModal() {
  const modal = document.querySelector("#modal");
  if (!modal) return;

  const overlay = modal.querySelector(".modal__overlay");
  const closeBtn = modal.querySelector("[data-modal-close]");

  const modeImage = modal.querySelector(".modal__mode--image");
  const modeMap = modal.querySelector(".modal__mode--map");
  const modeNotice = modal.querySelector(".modal__mode--notice");

  const img = modal.querySelector(".modal__img");
  const cap = modal.querySelector(".modal__cap");
  const mapWrap = modal.querySelector(".modal__map");

  let lastFocus = null;

  const lockScroll = (lock) => {
    document.documentElement.classList.toggle("is-modal-open", lock);
    document.body.classList.toggle("is-modal-open", lock);
  };

const hideAllModes = () => {
  modal.querySelectorAll(".modal__mode").forEach((el) => {
    el.hidden = true;
  });
};
  

  const open = ({ type = "image", src = "", alt = "", caption = "", mapSrc = "" } = {}) => {
    lastFocus = document.activeElement;

    hideAllModes();

    if (type === "image") {
      if (modeImage) modeImage.hidden = false;

      if (img) {
        img.src = src || "";
        img.alt = alt || "";
      }
      if (cap) cap.textContent = caption || alt || "";
    }

    if (type === "map") {
      if (modeMap) modeMap.hidden = false;

      const finalSrc = mapSrc || "https://www.google.com/maps?q=Vancouver%2C%20BC&output=embed";
      if (mapWrap) {
        mapWrap.innerHTML = `
          <iframe
            src="${finalSrc}"
            width="100%"
            height="100%"
            style="border:0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen>
          </iframe>
        `;
      }
    }

    if (type === "notice") {
      if (modeNotice) modeNotice.hidden = false;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    lockScroll(true);

    (closeBtn || modal).focus?.();
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    lockScroll(false);

    // чистим всё, чтобы не оставалось хвостов
    if (img) img.src = "";
    if (cap) cap.textContent = "";
    if (mapWrap) mapWrap.innerHTML = "";

    hideAllModes();

    lastFocus?.focus?.();
  };

  // Открытие по клику на элементы с data-modal-open
  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-modal-open]");
    if (!opener) return;

    const type = opener.dataset.modalOpen;

    if (type === "image") {
      const src = opener.dataset.src || "";
      const alt = opener.dataset.alt || "";

      const figure = opener.closest("figure");
      const figCap = figure?.querySelector("figcaption")?.textContent?.trim() || "";
      const caption = opener.dataset.cap || figCap || alt;

      open({ type: "image", src, alt, caption });
    }

    if (type === "map") {
      const mapSrc = opener.dataset.mapSrc || "";
      open({ type: "map", mapSrc });
    }

    if (type === "notice") {
      open({ type: "notice" });
    }
  });

  // Закрытие: крестик / оверлей / любая кнопка с data-modal-close
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-modal-close]")) close();
  });

  // Открытие программно (из формы, например)
  document.addEventListener("modal:open", (e) => {
    const type = e.detail?.type;
    if (!type) return;

    if (type === "notice") open({ type: "notice" });
    if (type === "map") open({ type: "map", mapSrc: e.detail?.mapSrc || "" });
    if (type === "image") open({ type: "image", src: e.detail?.src, alt: e.detail?.alt, caption: e.detail?.caption });
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  });
}