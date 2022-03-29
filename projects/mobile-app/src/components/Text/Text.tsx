import React, { FC } from "react";

export const Heading: FC<{ ariaLabel: string }> = ({ children, ariaLabel }) => (
    <h1 className="font-medium text-3xl leading-snug text-white" aria-label={ariaLabel}>
      {children}
    </h1>
  );
