import React from "react";
import { IntersectionOptions, useInView } from "react-intersection-observer";
import cx from "classnames";

interface IntersectionDetectorProps extends IntersectionOptions {
  animate?: boolean;
  zIndex?: number;
}

export const IntersectionDetector: React.FC<IntersectionDetectorProps> = ({
  animate = false,
  children,
  initialInView = true,
  threshold = 0.5,
  zIndex,
}) => {
  const [ref, inView] = useInView({ initialInView, threshold });

  return (
    <>
      <div className="intersection__detector__container" ref={ref} />
      <div
        style={{ zIndex }}
        className={cx("intersection__detector__container_fade_in absolute visible duration-300 opacity-0", {
          "opacity-100": !inView,
          "pointer-events-none": inView,
          "transition-opacity": animate,
        })}>
        {children}
      </div>
    </>
  );
};
