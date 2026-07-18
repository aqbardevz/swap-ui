"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches `onOutsideClick` for pointerdown events outside the returned ref's
 * element. Unlike an onBlur+contains check, this only reacts to genuine
 * outside clicks, so clicking non-focusable content inside (text, labels,
 * padding) never closes the element by accident.
 */
export function useClickOutside<T extends HTMLElement>(onOutsideClick: () => void) {
  const ref = useRef<T>(null);
  const callbackRef = useRef(onOutsideClick);
  callbackRef.current = onOutsideClick;

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return ref;
}
