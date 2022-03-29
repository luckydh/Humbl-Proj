import React, { useState, useLayoutEffect, useEffect } from "react";
import cx from "classnames";
import { Transition } from "@headlessui/react";

export interface WarningModalProps {
  /** @description default value  */
  show: boolean;
  /** @description N ms to wait before hiding the toast  */
  duration?: number;
  title: React.ReactNode;
  message: React.ReactNode;
  ariaLabel?: string;
  onDismiss?: () => void;
  /** Fixed for long pages (home) where centered position doesn't work properly.  */
  variant?: "fixed" | "default";
}

export const WarningModal = ({
  show = false,
  duration = 2_000,
  title,
  message,
  onDismiss,
  ariaLabel,
  variant = "default",
}: WarningModalProps) => {
  const [appear, setAppear] = useState<boolean>(show);

  useEffect(() => {
    setAppear(show);
  }, [show]);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      setAppear(false);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [duration, show, onDismiss]);

  return (
    <Transition aria-label={ariaLabel} show={appear} afterLeave={onDismiss}>
      <Transition.Child
        appear
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <div className="h-full w-full fixed top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-center items-center bg-black bg-opacity-40">
          <Transition.Child
            appear
            enter="transition-transform origin-bottom duration-200"
            enterFrom="-translate-y-1.5"
            enterTo="translate-y-0"
            leave="transition-transform duration-200"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-1.5">
            <section
              className={cx("origin-bottom bg-white text-gray-700 mx-6 rounded-xl py-5 px-10", {
                "ml-auto absolute -translate-x-1/2 -translate-y-1/2 top-[45vh]": variant === "fixed",
              })}
              aria-label={ariaLabel}>
              <header className="flex justify-center items-center mb-2">
                <h3>{title}</h3>
              </header>
              <div>
                <p className="tracking-tight text-center">{message}</p>
              </div>
            </section>
          </Transition.Child>
        </div>
      </Transition.Child>
    </Transition>
  );
};
