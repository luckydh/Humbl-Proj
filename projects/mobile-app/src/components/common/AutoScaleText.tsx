import React, { useState, useRef, useLayoutEffect } from "react";

export const AutoScaleText: React.FC = ({ children }) => {
  const [scale, setScale] = useState<number>(1);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    const parent = node?.parentNode as HTMLElement;

    const availableWidth = parent?.offsetWidth ?? 1;
    const actualWidth = node?.offsetWidth ?? 1;
    const actualScale = availableWidth / actualWidth;

    // Return early for scales are equal
    if (scale === actualScale) return;

    const isAvailableSpace: boolean = actualScale >= 1 && scale < 1;

    if (actualScale < 1) {
      setScale(actualScale);
    } else if (isAvailableSpace) {
      setScale(1);
    }
  }, [scale, children]);

  return (
    <div ref={ref} className="inline-block origin-left align-bottom" style={{ transform: `scale(${scale})` }}>
      {children}
    </div>
  );
};
