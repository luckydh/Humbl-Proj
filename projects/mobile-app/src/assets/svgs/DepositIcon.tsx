import * as React from "react";

const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={11} height={15} viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8.42 8.265a.557.557 0 01-.392-.166s0 0 0 0L5.815 5.843v8.052a.525.525 0 01-.161.377.555.555 0 01-.772 0 .525.525 0 01-.16-.377v-8.09l-2.353 2.3a.547.547 0 01-.388.17.56.56 0 01-.396-.153.531.531 0 01-.162-.386.52.52 0 01.171-.38l3.288-3.22h0l.347-.339.046-.045.046.046 3.496 3.565a.525.525 0 010 .753h0a.542.542 0 01-.397.149zm0 0s0 0 0 0l.002-.065v.065H8.42zM5.815 5.75l-.065-.066v.093l.065-.027zM.699.685H9.7c.144 0 .277.079.37.208.094.129.144.3.144.476 0 .175-.05.347-.144.475a.463.463 0 01-.37.208H.7a.463.463 0 01-.37-.208.818.818 0 01-.144-.475c0-.176.05-.347.144-.476a.463.463 0 01.37-.208z"
      fill="#fff"
      stroke="#fff"
      strokeWidth={0.13}
    />
  </svg>
);

export default SvgComponent;
