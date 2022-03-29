import React from "react";

// import { Container } from './styles';

const Chevron = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      className="flex-none ml-auto"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 37.996 38.002"
      {...props}
    >
      <defs>
        <style>{`.a_chevron_filled{fill:#d3eff9}`}</style>
      </defs>
      <path
        className="a_chevron_filled"
        d="M19033,21472a18.944,18.944,0,1,1,7.395-1.494A18.888,18.888,0,0,1,19033,21472Zm-2.77-29.555-2.6,2.594,7.533,7.535-7.533,7.533,2.6,2.6,10.137-10.135Z"
        transform="translate(-19014.002 -21433.998)"
      />
    </svg>
    // <svg
    //   className="flex-none ml-auto"
    //   width="13"
    //   height="21"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     d="M2.598 20.265l-2.6-2.6 7.534-7.534-7.534-7.534 2.6-2.6L12.73 10.129z"
    //     className="fill-current"
    //     fillRule="nonzero"
    //   />
    // </svg>
  );

export default Chevron;
