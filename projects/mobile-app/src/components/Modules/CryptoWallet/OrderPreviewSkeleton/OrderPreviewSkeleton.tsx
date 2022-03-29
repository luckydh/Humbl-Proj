import React from "react";
import ContentLoader from "react-content-loader";
import skeletonStyles from "utils/SkeletonStyles";

export const OrderPreviewSkeleton: React.FC = () => (
    <div>
      <div className="w-full bg-[#4AC6F8]">
        <ContentLoader
          width="100%"
          height="95px"
          viewBox="0 0 100% 95"
          uniqueKey="orderPreview-header-1"
          {...skeletonStyles}>
          <rect x="25%" y="25" width="50%" height="16" rx="4" ry="4" />
          <rect x="25%" y="51" width="50%" height="19" rx="4" ry="4" />
        </ContentLoader>
        <hr className="h-px bg-white border-0 opacity-30" />
        <ContentLoader
          width="100%"
          height="95px"
          viewBox="0 0 100% 95"
          uniqueKey="orderPreview-header-2"
          {...skeletonStyles}>
          <rect x="25%" y="25" width="50%" height="16" rx="4" ry="4" />
          <rect x="25%" y="51" width="50%" height="19" rx="4" ry="4" />
        </ContentLoader>
      </div>
      <ContentLoader
        width="100%"
        height="272"
        viewBox="0 0 100% 272"
        uniqueKey="orderPreview-details"
        {...skeletonStyles}
        style={{ background: "transparent" }}>
        <rect x="5%" y="32" width="50%" height="16" rx="6" ry="6" />
        <rect x="70%" y="32" width="25%" height="16" rx="6" ry="6" />
        <rect x="5%" y="76" width="50%" height="16" rx="6" ry="6" />
        <rect x="70%" y="76" width="25%" height="16" rx="6" ry="6" />
        <rect x="5%" y="120" width="50%" height="16" rx="6" ry="6" />
        <rect x="70%" y="120" width="25%" height="16" rx="6" ry="6" />
        <rect x="5%" y="164" width="50%" height="16" rx="6" ry="6" />
        <rect x="70%" y="164" width="25%" height="16" rx="6" ry="6" />
        <rect x="5%" y="248" width="25%" height="24" rx="6" ry="6" />
        <rect x="70%" y="248" width="25%" height="24" rx="6" ry="6" />
      </ContentLoader>
    </div>
  );
