import React from "react";
import ContentLoader from "react-content-loader";
import cx from "classnames";
import "./styles.scss";

type Props = { className?: string };

export const CheckBoxCardContainerSkeleton: React.FC<Props> = ({ children, className }) => (
  <div
    className={cx("flex items-center rounded-lg px-4 checkbox-card-container-skeleton", className)}
    data-testid="checkboxcard-skeleton">
    <ContentLoader
      className="flex-grow"
      speed={2}
      width="100%"
      height="100%"
      backgroundColor="#80DAFE80"
      uniqueKey="checkboxcard-skeleton"
      foregroundColor="#80DAFE">
      <rect y="15" height="30" width="30" rx="4" ry="4" />
      <rect y="15" x="41" height="10" width="70" rx="4" ry="4" />
      <rect y="35" x="41" height="10" width="70" rx="4" ry="4" />
      <rect y="25" x={children ? "70%" : "80%"} height="10" width="20%" rx="4" ry="4" />
    </ContentLoader>
    {children}
  </div>
);
