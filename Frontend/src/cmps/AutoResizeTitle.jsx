import { useEffect, useRef } from "react";

export function AutoResizeTitle({ children, onClick }) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parentWidth = el.parentElement.offsetWidth;
    let fontSize = parseInt(window.getComputedStyle(el).fontSize);

    while (el.scrollWidth > parentWidth && fontSize > 30) {
      fontSize--;
      el.style.fontSize = fontSize + "px";
    }
  }, [children]);

  return (
    <h1 ref={ref} onClick={onClick}>
      {children}
    </h1>
  );
}