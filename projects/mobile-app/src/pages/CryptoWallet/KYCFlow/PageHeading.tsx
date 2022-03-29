import React from "react";

interface PageHeadingProps {
  title: React.ReactNode;
  description: React.ReactNode;
  ariaLabel?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title, description, ariaLabel, children }) => (
  <div className="text-center mb-4">
    <h2 className="text-xl font-medium mb-2" aria-label={ariaLabel ? `${ariaLabel}_TITLE` : "PAGE_HEADING_TITLE"}>
      {title}
    </h2>
    <p className="text-sm" aria-label={ariaLabel ? `${ariaLabel}_DESCRIPTION` : "PAGE_HEADING_DESCRIPTION"}>
      {description}
    </p>
    {children}
  </div>
);

export default PageHeading;
