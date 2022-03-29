import * as React from "react";

const HomeCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={28} cy={28} r={27} stroke="#fff" strokeWidth={2} />
    <g clipPath="url(#prefix__clip0)" fill="#fff">
      <path d="M27.972 19.211l-11.467 9.454c0 .02-.003.04-.01.059a.313.313 0 00-.009.059v9.572c.01.7.575 1.266 1.275 1.277h7.658v-7.658h5.115v7.658h7.656c.7-.01 1.266-.576 1.277-1.277v-9.57a.276.276 0 00-.02-.12L27.971 19.21z" />
      <path d="M41.872 25.102a.579.579 0 00-.22-.429L29.49 14.566a2.479 2.479 0 00-3.03 0L14.222 24.788a.577.577 0 00-.219.428.651.651 0 00.138.47l1.24 1.474a.68.68 0 00.412.22c.171.011.34-.037.48-.137l11.695-9.777 11.64 9.663a.611.611 0 00.414.137h.06c.16-.022.306-.1.413-.22l1.24-1.476a.647.647 0 00.137-.468z" />
    </g>
    <defs>
      <clipPath id="prefix__clip0">
        <path fill="#fff" transform="translate(14 14.049)" d="M0 0h27.876v25.582H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default HomeCircleIcon;
