import React from "react";
import ContentLoader from "react-content-loader";
import { CheckBoxCardSkeleton } from "components/CheckBoxCard/CheckBoxCardSkeleton";

interface BankListSkeletonProps {
  rows?: number;
}

const CHECKBOX_SKELETON_HEIGHT = 60;
const DEFAULT_ROWS = Math.ceil(window.innerHeight / CHECKBOX_SKELETON_HEIGHT);

export const BankListSkeleton: React.FC<BankListSkeletonProps> = ({ rows = DEFAULT_ROWS }) => (
    <div className="px-6">
      <PageHeaderSkeleton />
      {Array.from({ length: rows }).map((_, index) => (
        <CheckBoxCardSkeleton key={index} className="my-3" />
      ))}
    </div>
  );

const PageHeaderSkeleton = () => (
  <ContentLoader
    className="flex-grow"
    speed={2}
    width="100%"
    height={76}
    backgroundColor="#80DAFE80"
    uniqueKey="bank-list-skeleton"
    foregroundColor="#80DAFE">
    <rect x="10" y="27" rx="4" ry="4" width="16" height="22" />
    <rect x="20%" y="27" rx="4" ry="4" width="80%" height="22" />
  </ContentLoader>
);
