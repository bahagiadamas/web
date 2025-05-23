// hooks/useScaler.js
import { useEffect, useRef } from "react";

export default function useScaler(customStyles = {}) {
  const targetRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
    const targetElement = targetRef.current;
    const childElement = childRef.current;

    const originalChildTransform = childElement
      ? window.getComputedStyle(childElement).transform
      : null;

    const scaleBackground = () => {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const scaleFactor = 1 + scrollY / 2000;
        const maxScale = 1.5;
        const currentScale = Math.min(scaleFactor, maxScale);
        const blurRadius = Math.max(2, Math.min(scrollY / 40, 8));

        if (targetElement) {
          targetElement.style.transform = `scale(${currentScale})`;
          targetElement.style.transformOrigin = "center center";
          targetElement.style.setProperty(
            "--backdrop-blur-radius",
            `${blurRadius}px`
          );
        }

        if (childElement) {
          const invertScale = 1 / currentScale;

          let baseTransform =
            originalChildTransform && originalChildTransform !== "none"
              ? originalChildTransform
              : "";

          if (customStyles.transform) {
            baseTransform = customStyles.transform;
          }

          const finalTransform = `${baseTransform} scale(${invertScale})`;
          childElement.style.transform = finalTransform;
          childElement.style.transformOrigin = "center center";

          Object.keys(customStyles).forEach((prop) => {
            if (prop !== "transform") {
              childElement.style[prop] = customStyles[prop];
            }
          });
        }
      });
    };

    scaleBackground();
    window.addEventListener("scroll", scaleBackground);

    return () => window.removeEventListener("scroll", scaleBackground);
  }, [customStyles]);

  return { targetRef, childRef };
}
