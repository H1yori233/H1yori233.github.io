"use client";

import { useEffect, useRef } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const finePointer = window.matchMedia(FINE_POINTER);
    const reducedMotion = window.matchMedia(REDUCED_MOTION);
    let enabled = false;

    const syncAvailability = () => {
      enabled = finePointer.matches && !reducedMotion.matches;
      document.body.classList.toggle("custom-cursor-active", enabled);

      if (!enabled) {
        cursor.dataset.visible = "false";
        cursor.dataset.state = "default";
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!enabled || event.pointerType === "touch") return;

      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.dataset.visible = "true";

      const target = event.target;
      if (!(target instanceof Element)) {
        cursor.dataset.state = "default";
        return;
      }

      const isNative = target.closest(
        '[data-cursor="native"], input, textarea, select, [contenteditable="true"]'
      );
      const isInteractive = target.closest(
        'a, button, [role="button"], [data-cursor="interactive"]'
      );

      cursor.dataset.state = isNative
        ? "native"
        : isInteractive
          ? "interactive"
          : "default";
    };

    const hideCursor = () => {
      cursor.dataset.visible = "false";
    };

    syncAvailability();
    finePointer.addEventListener("change", syncAvailability);
    reducedMotion.addEventListener("change", syncAvailability);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", hideCursor);
    document.documentElement.addEventListener("pointerleave", hideCursor);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      finePointer.removeEventListener("change", syncAvailability);
      reducedMotion.removeEventListener("change", syncAvailability);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", hideCursor);
      document.documentElement.removeEventListener("pointerleave", hideCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      data-state="default"
      data-visible="false"
      aria-hidden="true"
    >
      <span className="custom-cursor__ring" />
      <span className="custom-cursor__dot" />
    </div>
  );
}
