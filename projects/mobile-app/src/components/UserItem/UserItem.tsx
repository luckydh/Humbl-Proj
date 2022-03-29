import React, { FC } from "react";
import cx from "classnames";
import { Avatar, AvatarSize } from "../Avatar/Avatar";
import Chevron from "../../assets/svgs/Chevron";
import ContentLoader from "react-content-loader";

export interface UserItemProps {
  /** Set the user name */
  name: string;
  /** Set the avatar image src */
  src: string;
  /** Set the userName */
  size?: AvatarSize;
  userName: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const UserItem: FC<UserItemProps> = ({ name, src, userName, onClick, size = "small" }) => {
  const classes = cx("ml-3 rounded text-left px-2 w-full text-white flex items-center truncate");

  return (
    <div className="flex">
      <Avatar src={src} size={size} />
      <button className={classes} onClick={onClick}>
        <div className="truncate">
          <h2 className="text-lg leading-tight font-bold truncate">{name}</h2>
          <span className="text-base leading-tight font-medium truncate">@{userName}</span>
        </div>
        {!!onClick && (
          <div className="w-9 h-9 flex-none ml-auto">
            <Chevron />
          </div>
        )}
      </button>
    </div>
  );
};

UserItem.displayName = "UserItem";

export const UserItemSkeleton: FC = () => (
  <ContentLoader
    className="my-4"
    animate={true}
    speed={2}
    width={400}
    height={80}
    viewBox="0 0 400 80"
    backgroundColor="#4cb4dd"
    foregroundColor="#127aa3">
    <circle cx="40" cy="42" r="38" />
    <rect x="103" y="26" rx="3" ry="3" width="171" height="9" />
    <rect x="105" y="48" rx="3" ry="3" width="123" height="8" />
  </ContentLoader>
);
