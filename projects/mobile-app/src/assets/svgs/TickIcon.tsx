import React from "react";

const TickIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { height = 26, width = 20 } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 12.4646C2.39489 12.865 6.60634 16.5083 7.492 17.2734C7.53467 17.3118 7.59203 17.3334 7.65179 17.3334C7.71153 17.3334 7.76889 17.3118 7.81157 17.2734L23.3333 2.66669"
        stroke="white"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default TickIcon;
