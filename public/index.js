(() => {
  // src/js/modules/coreModule.js
  var coreModule = () => {
    document.querySelectorAll(".core-module").forEach((root) => {
      root.dataset.coreModuleReady = "true";
    });
  };
  var coreModule_default = coreModule;

  // src/js/modules/internalModule.js
  var internalModule = () => {
    document.querySelectorAll(".internal-module").forEach((root) => {
      root.dataset.internalModuleReady = "true";
    });
  };
  var internalModule_default = internalModule;

  // src/js/modules/siteHeader.js
  var siteHeader = () => {
    document.querySelectorAll(".site-header").forEach((root) => {
      if (root.dataset.siteHeaderReady === "true") return;
      root.dataset.siteHeaderReady = "true";
      const toggle = root.querySelector(".site-header__toggle");
      const panel = root.querySelector(".site-header__panel");
      if (!toggle || !panel) return;
      const labelOpen = root.dataset.menuOpen || "Open menu";
      const labelClose = root.dataset.menuClose || "Close menu";
      const setOpen = (open) => {
        root.classList.toggle("site-header--open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? labelClose : labelOpen);
      };
      toggle.addEventListener("click", () => {
        setOpen(!root.classList.contains("site-header--open"));
      });
      root.querySelectorAll(".site-header__link, .site-header__cta, .site-header__lang-btn").forEach((link) => {
        link.addEventListener("click", () => setOpen(false));
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
      });
    });
  };
  var siteHeader_default = siteHeader;

  // src/js/modules/projectsSlider.js
  var projectsSlider = () => {
    if (typeof window.Swiper === "undefined") return;
    document.querySelectorAll(".projects-slider").forEach((root) => {
      if (root.dataset.projectsSliderReady === "true") return;
      root.dataset.projectsSliderReady = "true";
      const el = root.querySelector(".projects-slider__swiper");
      const prev = root.querySelector(".projects-slider__nav--prev");
      const next = root.querySelector(".projects-slider__nav--next");
      const pagination = root.querySelector(".projects-slider__pagination");
      if (!el) return;
      new window.Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: false,
        watchOverflow: true,
        pagination: pagination ? {
          el: pagination,
          clickable: true
        } : void 0,
        navigation: {
          prevEl: prev,
          nextEl: next
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          960: {
            slidesPerView: 3,
            spaceBetween: 24
          }
        }
      });
    });
  };
  var projectsSlider_default = projectsSlider;

  // src/js/modules/faq.js
  var faq = () => {
    document.querySelectorAll(".faq").forEach((root) => {
      if (root.dataset.faqReady === "true") return;
      root.dataset.faqReady = "true";
      const items = Array.from(root.querySelectorAll(".faq__item"));
      items.forEach((item) => {
        const trigger = item.querySelector(".faq__trigger");
        const panel = item.querySelector(".faq__panel");
        if (!trigger || !panel) return;
        trigger.addEventListener("click", () => {
          const isOpen = item.classList.contains("faq__item--open");
          items.forEach((other) => {
            const otherTrigger = other.querySelector(".faq__trigger");
            const otherPanel = other.querySelector(".faq__panel");
            other.classList.remove("faq__item--open");
            if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
            if (otherPanel) otherPanel.hidden = true;
          });
          if (!isOpen) {
            item.classList.add("faq__item--open");
            trigger.setAttribute("aria-expanded", "true");
            panel.hidden = false;
          }
        });
      });
    });
  };
  var faq_default = faq;

  // src/js/modules/scrollReveal.js
  var scrollReveal = () => {
    const targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("reveal--visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("reveal--pending");
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -32px 0px"
      }
    );
    targets.forEach((el) => {
      el.classList.add("reveal--pending");
      observer.observe(el);
    });
  };
  var scrollReveal_default = scrollReveal;

  // src/js/index.js
  var initComponents = () => {
    coreModule_default();
    internalModule_default();
    siteHeader_default();
    projectsSlider_default();
    faq_default();
    scrollReveal_default();
  };
  document.addEventListener("DOMContentLoaded", initComponents);
})();
//# sourceMappingURL=index.js.map
