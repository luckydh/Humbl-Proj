import React from "react";

export const CreditCardBack = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={59} height={42} viewBox="0 0 59 42" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#prefix__filter0_d)">
      <rect x={6} y={4} width={47} height={29.455} rx={1} fill="#fff" />
    </g>
    <path fill="#9DADBD" d="M6 9.454h47v4.909H6z" />
    <rect x={8.181} y={18.182} width={24} height={6.545} rx={0.5} fill="#9DADBD" fillOpacity={0.4} />
    <rect
      x={36.886}
      y={17.432}
      width={13.5}
      height={8.046}
      rx={1.25}
      fill="#9DADBD"
      fillOpacity={0.4}
      stroke="#FF6363"
      strokeWidth={1.5}
    />
    <defs>
      <filter
        id="prefix__filter0_d"
        x={0}
        y={0}
        width={59}
        height={41.455}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={3} />
        <feColorMatrix values="0 0 0 0 0.000280444 0 0 0 0 0.000280444 0 0 0 0 0.000280444 0 0 0 0.22 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default CreditCardBack;
