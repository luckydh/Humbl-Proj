import { useEffect } from "react";
import { BackButtonEvent } from "@ionic/core";

type Callback = (processNextHandler?: () => void) => void;

export function useHardwareBackButton(callback?: Callback, priority = 1) {
  useEffect(() => {
    if (!callback) {
      return;
    }

    const handle = (event: Event) => {
      const ionEvent = event as BackButtonEvent;
      ionEvent.detail.register(priority, (processNextHandler) => {
        callback(processNextHandler);
      });
    };

    document.addEventListener("ionBackButton", handle);
    return () => {
      document.removeEventListener("ionBackButton", handle);
    };
  }, [callback, priority]);
}
