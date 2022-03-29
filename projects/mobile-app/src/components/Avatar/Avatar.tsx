import React, { FC } from "react";
import cx from "classnames";

import { AvatarLines } from "../../assets/svgs/AvatarLines";
import ContentLoader from "react-content-loader";
import { RatingDisplay } from "../Rating/Rating";
import { useHistory, useRouteMatch } from "react-router-dom";

export type AvatarSize = "tiny" | "small" | "medium" | "large";

export interface AvatarProps {
  /** Set the src of the image */
  src: string;

  /** Pass className to element container */
  className?: string;
  /**
   * Set the size of the avatar
   * @default small
   * */
  size?: AvatarSize;
}

const SIZES: Record<AvatarSize, number> = {
  tiny: 32,
  small: 74,
  medium: 117,
  large: 219,
};

const DISPLAYSIZE = { fontSize: "25px" };

export const Avatar: FC<AvatarProps> = ({ className, size = "small", src }) => {
  const px = SIZES[size];

  const classes = cx("flex-none rounded-full overflow-hidden bg-blue-dark flex items-center justify-center", className);

  return (
    <div
      className={classes}
      style={{
        height: px,
        width: px,
        boxShadow: "0px 5px 7px -1px rgba(0,0,0,.22)",
      }}>
      <img src={src} className="w-full" alt="" />
    </div>
  );
};

Avatar.displayName = "Avatar";

export interface ProfileAvatarProps extends AvatarProps {
  /** User's name to display */
  name?: string;
  /**
   * Set the size of the avatar
   * @default medium
   * */
  size: "medium" | "large";
  /** Username to display */
  username?: string;
  action?: React.ReactElement;
  street?: string;
  city?: string;
  region?: string;
  postal?: string;
  country?: string;
  rating?: number;
  totalRatings?: number;
}

const SPACING: Record<"medium" | "large", string> = {
  medium: "mt-1",
  large: "mt-3",
};

const LINES_SCALE: Record<"medium" | "large", string> = {
  medium: "transform scale-50 -mt-24",
  large: "-mt-10",
};

export const ProfileAvatar: FC<ProfileAvatarProps> = ({
  name,
  size = "medium",
  src,
  username,
  action,
  street,
  city,
  country,
  region,
  postal,
  rating,
  totalRatings = 0,
}) => {
  const nameClasses = cx("font-bold text-center leading-7 mt-4 text-base break-words max-w-full", SPACING[size]);

  const history = useHistory();
  const { url } = useRouteMatch();

  const linesClasses = cx("absolute z-0", LINES_SCALE[size]);
  return (
    <div className="leading-4 flex-none text-white flex items-center flex-col relative">
      {action ? (
        <div className="relative">
          <Avatar className="relative z-10" size={size} src={src} />
          <div className="absolute right-1 bottom-0 h-14 w-14 z-20">{action}</div>
        </div>
      ) : (
        <Avatar className="relative z-10" size={size} src={src} />
      )}
      <div className={linesClasses}>
        <AvatarLines />
      </div>
      {name && (
        <h1 className={nameClasses} style={DISPLAYSIZE}>
          {name}
        </h1>
      )}
      {username && <p className="text-lg mt-1">@{username}</p>}

      {typeof rating === "number" && (
        <div
          className="flex flex-row items-center justify-between"
          onClick={() => {
            if (totalRatings > 0) {
              history.push(`${url}/ratings`);
            }
          }}>
          <span className="flex mr-2">{rating?.toFixed(1)}</span>
          <RatingDisplay rating={rating} size="small" className="flex" />
          {totalRatings > 0 && <button className="bg-blue-dark rounded-lg px-2  ml-2 h-5">{totalRatings}</button>}
        </div>
      )}

      <p className="text-sm mt-2 text-center">{street}</p>

      <p className="text-sm text-center">
        {city} {region} {postal}
      </p>
      <p className="text-sm">{country}</p>
    </div>
  );
};

export const ProfileAvatarSkeleton: FC = () => (
  <div className="leading-4 flex-none text-white flex items-center flex-col relative">
    <ContentLoader
      speed={2}
      width={219}
      height={283}
      viewBox="0 0 219 283"
      backgroundColor="#4cb4dd"
      foregroundColor="#127aa3">
      <rect x="66" y="227" rx="3" ry="3" width="88" height="12" />
      <rect x="66" y="244" rx="3" ry="3" width="88" height="11" />
      <circle cx="360" cy="165" r="46" />
      <circle cx="108" cy="109" r="108" />
    </ContentLoader>
  </div>
);

ProfileAvatar.displayName = "ProfileAvatar";
