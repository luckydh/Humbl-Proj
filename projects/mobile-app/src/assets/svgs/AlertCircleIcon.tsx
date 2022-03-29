import * as React from "react";

interface AlertCircleIconProps {
  height?: number;
  width?: number;
}

const AlertCircleIcon: React.FC<AlertCircleIconProps> = ({ height = 12, width = 12 }) => (
  <svg width={height || 12} height={width || 12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#prefix__clip0)">
      <path
        d="M6 .007a5.993 5.993 0 00-4.242 10.235 5.993 5.993 0 009.776-6.533A5.993 5.993 0 008.29.466 5.887 5.887 0 006 .006zm.513 5.826a.586.586 0 01-1.166 0v-1.87a.586.586 0 011.166 0v1.87zm-.573 2.83a.58.58 0 11.221-1.116.573.573 0 01.358.53.586.586 0 01-.579.587z"
        fill="#3B5B7B"
      />
    </g>
    <defs>
      <clipPath id="prefix__clip0">
        <path fill="#fff" d="M0 0h12v12H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default AlertCircleIcon;
