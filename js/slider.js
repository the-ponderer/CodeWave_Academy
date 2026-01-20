// js/slider.js
export function initSliders() {
  document.querySelectorAll("[data-slider]").forEach((root) => {
    const viewport = root.querySelector(".vibe-slider__viewport");
    const track = root.querySelector(".vibe-slider__track");
    const slides = Array.from(root.querySelectorAll(".vibe-slide"));
    const prevBtn = root.querySelector("[data-prev]");
    const nextBtn = root.querySelector("[data-next]");
    const dotsWrap = root.querySelector("[data-dots]");

    if (!viewport || !track || slides.length === 0) return;

    let dots = [];
    let perPage = 1; // сколько карточек видно на экране
    let step = 0;    // шаг одного слайда
    let pageStep = 0; // шаг одной "страницы" = perPage * step

    const getGap = () => parseFloat(getComputedStyle(track).gap) || 0;

    const calc = () => {
      const w = slides[0].getBoundingClientRect().width;
      const gap = getGap();
      step = w + gap;

      // сколько карточек помещается в viewport (мобила = 1, десктоп = 2/3...)
      perPage = Math.max(1, Math.floor((viewport.clientWidth + gap) / step));
      pageStep = perPage * step;
    };

    const buildDots = () => {
      if (!dotsWrap) return;

      dotsWrap.innerHTML = "";
      dots = [];

      const pages = Math.ceil(slides.length / perPage);

      for (let p = 0; p < pages; p++) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "vibe-slider__dot";
        b.setAttribute("aria-label", `Go to page ${p + 1}`);

        b.addEventListener("click", () => {
          viewport.scrollTo({ left: p * pageStep, behavior: "smooth" });
        });

        dotsWrap.appendChild(b);
        dots.push(b);
      }
    };

    const setActiveDot = () => {
      if (!dots.length) return;

      // активная точка = ближайшая "страница"
      const idx = Math.round(viewport.scrollLeft / pageStep);
      dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    };

    const scrollByPage = (dir) => {
      viewport.scrollBy({ left: dir * pageStep, behavior: "smooth" });
    };

    const init = () => {
      calc();
      buildDots();
      setActiveDot();
    };

    prevBtn?.addEventListener("click", () => scrollByPage(-1));
    nextBtn?.addEventListener("click", () => scrollByPage(1));

    viewport.addEventListener("scroll", () => {
      clearTimeout(viewport._t);
      viewport._t = setTimeout(setActiveDot, 60);
    });

    window.addEventListener("resize", () => {
      clearTimeout(window._sliderResizeT);
      window._sliderResizeT = setTimeout(init, 120);
    });

    init();
  });
}