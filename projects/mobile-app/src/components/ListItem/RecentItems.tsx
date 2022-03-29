import React from "react";
import cx from "classnames";
import "./style.scss";

interface RecentItemProps {
  userName: string;
  image: string;
  onClick?: () => void;
}

export const RecentItems: React.FC<RecentItemProps> = ({ userName, image, onClick }) => {
  const classes = "w-8 h-8 rounded-full flex items-center";
  return (
    <div className="flex-col inline-flex items-center recent-item-list w-[4.4rem]">
      <div className={cx("overflow-hidden", classes)} onClick={onClick}>
        <img src={image} className="w-full" alt={`${userName}`} />
      </div>
      <div className="text-blue-dark text-xs ">{userName}</div>
    </div>
  );
};
