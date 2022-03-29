import React from "react";

export const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" {...props}>
    <path
      d="M20 9h-2.1A7.96 7.96 0 0011 2.1V0H9v2.1A7.862 7.862 0 002.1 9H0v2h2.1A7.96 7.96 0 009 17.9V20h2v-2.1a7.96 7.96 0 006.9-6.9H20zm-9 6.9V14H9v1.9A5.947 5.947 0 014.1 11H6V9H4.1A5.947 5.947 0 019 4.1V6h2V4.1A5.947 5.947 0 0115.9 9H14v2h1.9a5.947 5.947 0 01-4.9 4.9z"
      fill="#fff"
    />
  </svg>
);

export default TargetIcon;
