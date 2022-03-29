import { useKeyboardState } from "@ionic/react-hooks/keyboard";
import { isPlatform } from "@ionic/react";
import React, { FC, useState, useRef, useLayoutEffect } from "react";
import { useEvent } from "react-use";

type FocusableInputElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const KEYBOARD_OPENING_TIME = 500;

const isIOS = isPlatform("ios") || isPlatform("iphone") || isPlatform("ipad");

function isKeyboardRequiring(tagName: string) {
  const tag = tagName.toLowerCase();

  return tag === "input" || tag === "textarea" || tag === "select";
}

async function useKeyboardAwareness<E extends HTMLElement>() {
  const { keyboardHeight } = useKeyboardState();
  const ref = useRef<E>(null);
  const timeoutRef = useRef<number>();
  const [inputPosition, setInputPosition] = useState({ top: 0, bottom: 0 });

  const scrollBy = (top: number) => {
    ref.current!.scrollBy({
      top,
      left: 0,
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    if (ref.current && typeof keyboardHeight !== "undefined") {
      const { top: scrollViewTop, bottom: scrollViewBottom } = ref.current.getBoundingClientRect();
      const isOverflown = inputPosition.top < scrollViewTop || inputPosition.bottom > scrollViewBottom - keyboardHeight;

      if (isOverflown && keyboardHeight > 0) {
        clearTimeout(timeoutRef.current);
        const top = inputPosition.top - keyboardHeight;

        timeoutRef.current = window.setTimeout(() => {
          scrollBy(top);
        }, KEYBOARD_OPENING_TIME);
      }

      if (isIOS) {
        ref.current.style.paddingBottom = `${keyboardHeight}px`;
        ref.current.style.transitionDuration = `${KEYBOARD_OPENING_TIME}ms`;
        ref.current.style.transitionProperty = "padding-bottom";
      }
    }
  }, [keyboardHeight, inputPosition]);

  useEvent(
    "focus",
    (evt) => {
      const target = evt?.target as FocusableInputElements;
      const { tagName } = target;

      if (isKeyboardRequiring(tagName)) {
        requestAnimationFrame(() => {
          if (ref.current && target) {
            const { bottom, top } = target.getBoundingClientRect();
            setInputPosition({ bottom, top });
          }
        });
      }
    },
    ref.current,
    true
  );

  return ref;
}

/** View that takes up remaining vertical space and is scrollable */
export const KeyboardAwareView: FC = ({ children }) => {
  // The result of this is a promise. This does not adhere to the expected type but still seems functional.
  // TODO: Fix the type or usage here to remove this ugly casting and avoid red squigglies
  const ref = useKeyboardAwareness<HTMLDivElement>() as unknown as React.RefObject<HTMLDivElement>;

  return (
    <div ref={ref} id="keyboardAwareView" className="flex flex-col flex-1 overflow-y-auto ease-in-out">
      {children}
    </div>
  );
};
