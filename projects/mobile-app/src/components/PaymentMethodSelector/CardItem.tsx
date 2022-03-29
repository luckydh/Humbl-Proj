import React from "react";
import cx from "classnames";
import Chevron from "assets/svgs/Chevron";
import ContentLoader from "react-content-loader";
import cardPlaceholder from "assets/svgs/credit-card-placeholder.svg";

interface CardItemProps {
  last4?: string;
  brandName?: string;
  brandImage?: string;
  bordered?: boolean;
  showChevron?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}

export const CardItem: React.FC<CardItemProps> = ({
  onClick,
  last4,
  brandName,
  brandImage,
  bordered = true,
  showChevron = false,
  className,
  disabled = false,
}) => {
  const buttonClasses = cx(
    "flex mb-4 rounded-lg select-none bg-none outline-none items-center",
    bordered ? "border-white border-2 border-solid p-3 py-4" : "",
    className
  );
  return (
    <button onClick={onClick} className={buttonClasses} disabled={disabled}>
      <img src={brandImage || cardPlaceholder} alt={`Payment Brand Logo - ${brandName} `} style={{ height: 38 }} />
      <div className="ml-3 rounded text-left w-full text-white flex items-center truncate">
        <div>
          <h2 className="text-md leading-none font-bold truncate">{brandName}</h2>
          {last4 && <span className="text-base leading-none font-medium truncate">Credit - {last4}</span>}
        </div>
        {showChevron && <Chevron width={38} />}
      </div>
    </button>
  );
};

export default CardItem;

export const CardItemSkeleton: React.FC<{
  forgroundColor?: string;
  backgroundColor?: string;
}> = ({ forgroundColor, backgroundColor }) => (
    <ContentLoader
      animate={true}
      speed={2}
      width={326}
      height={38}
      viewBox="0 0 326 38"
      backgroundColor={backgroundColor || "#4cb4dd"}
      foregroundColor={forgroundColor || "#127aa3"}
      uniqueKey="card-item-skeleton">
      <rect x="0" y="0" rx="3" ry="3" width="60" height="38" />
      <rect x="75" y="0" rx="3" ry="3" width="80" height="16" />
      <rect x="75" y="22" rx="3" ry="3" width="120" height="16" />
    </ContentLoader>
  );
