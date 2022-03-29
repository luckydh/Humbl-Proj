import React from "react";
import ContentLoader from "react-content-loader";
import skeletonStyles from "utils/SkeletonStyles";

export const GraphSkeleton: React.FC = () => (
    <div className="bg-light-bright-blue mx-5 rounded-md overflow-hidden">
      <ContentLoader viewBox="0 0 370 400" {...skeletonStyles}>
        <g filter="url(#prefix__filter0_d)">
          <rect x={24} y={18} width={"327"} height={365} rx={8} fill="#4AC6F8" />
        </g>
        <rect x={38} y={46} width={54} height={54} rx={4} />
        <rect x={104} y={46} width={164} height={12} rx={4} />
        <rect x={120} y={88} width={148} height={12} rx={4} />
        <rect x={104} y={88} width={12} height={12} rx={4} />
        <rect x={276} y={88} width={12} height={12} rx={4} />
        <rect x={104} y={67} width={164} height={12} rx={4} />
        <rect x={38} y={120} width={299} height={16} rx={4} />
        <rect x={38} y={310} width={299} height={16} rx={4} />
        <rect x={38} y={343} width={26} height={26} rx={4} />
        <rect x={93} y={343} width={26} height={26} rx={4} />
        <rect x={148} y={343} width={26} height={26} rx={4} />
        <rect x={203} y={343} width={26} height={26} rx={4} />
        <rect x={258} y={343} width={26} height={26} rx={4} />
        <rect x={313} y={343} width={26} height={26} rx={4} />
      </ContentLoader>
    </div>
  );
