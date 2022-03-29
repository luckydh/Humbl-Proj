import React from "react";

// import { Container } from './styles';

const AvatarEdit = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 72 72"
    >
      <defs>
        <filter
          id="prefix__a"
          x={0}
          y={0}
          width={72}
          height={72}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy={3} />
          <feGaussianBlur stdDeviation={3} result="b" />
          <feFlood floodOpacity={0.161} />
          <feComposite operator="in" in2="b" />
          <feComposite in="SourceGraphic" />
        </filter>
        <style>{".prefix__b{fill:#fff}"}</style>
      </defs>
      <g transform="translate(.001 .001)" filter="url(#prefix__a)">
        <g transform="translate(9 6)" fill="#3b5b7b" stroke="#fff" strokeWidth={2}>
          <circle cx={30} cy={30} r={30} stroke="none" />
          <circle cx={30} cy={30} r={29} fill="none" />
        </g>
      </g>
      <path
        className="prefix__b"
        d="M26 44.335v5.613h5.613l16.563-16.563-5.613-5.613zM52.501 26.941l-3.5-3.5a1.5 1.5 0 00-2.118 0l-2.739 2.739 5.613 5.613 2.739-2.739a1.5 1.5 0 00.005-2.113z"
      />
    </svg>
  );

export default AvatarEdit;
