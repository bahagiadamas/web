import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

export default function useScrollReveal(selector = ".popup", trigger) {
  useEffect(() => {
    const sr = ScrollReveal();

    const elements = document.querySelectorAll(selector);

    sr.reveal(".popup-int", {
      scale: 0.8,
      opacity: 0,
      duration: 500,
      easing: "ease-in-out",
      reset: true,
      interval: 100,
    });

    elements.forEach((el) => {
      let revealConfig = {
        scale: 0.8,
        opacity: 0,
        duration: 500,
        easing: "ease-in-out",
        reset: true,
      };

      if (el.classList.contains("popup-left")) {
        revealConfig.origin = "left";
        revealConfig.distance = "40px";
      } else if (el.classList.contains("popup-right")) {
        revealConfig.origin = "right";
        revealConfig.distance = "40px";
      } else if (el.classList.contains("popup-up")) {
        revealConfig.origin = "bottom";
        revealConfig.distance = "40px";
      } else if (el.classList.contains("popup-down")) {
        revealConfig.origin = "top";
        revealConfig.distance = "40px";
      } else if (el.classList.contains("popup-fade")) {
        revealConfig = {
          opacity: 0,
          duration: 1200,
          reset: false,
        };
      }

      sr.reveal(el, revealConfig);
    });

    return () => {
      elements.forEach((el) => sr.clean(el));
    };
  }, [selector, trigger]);
}
