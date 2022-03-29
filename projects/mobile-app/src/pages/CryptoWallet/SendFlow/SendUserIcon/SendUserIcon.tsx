import React from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";

export interface SendUserIconProps {
  image?: string;
  coinImage?: string;
  displayName: string;
  size?: "sm" | "md" | "lg";
  fullText?: boolean;
  row?: boolean;
  ariaLabel?: string;
}

export const SendUserIcon: React.FC<SendUserIconProps> = ({
  image,
  coinImage,
  displayName,
  size = "medium",
  fullText = false,
  row = false,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const wrapperClasses = cx("flex w-full justify-center items-center", { "flex-col": !row, "flex-row": row });

  const iconSize = cx({
    "h-7 w-7": size === "sm",
    "h-10 w-10": size === "md",
    "h-[50px] w-[50px]": size === "lg",
  });

  const imageClasses = cx("flex flex-row justify-center ", { "mb-2": !fullText });

  const textClasses = cx("text-blue-dark", { "pl-2": fullText });

  const coinImageClassses = cx("h-5 w-5 absolute bottom-0 -right-1.5");

  return (
    <div className={wrapperClasses}>
      <div className={imageClasses}>
        <div className={`${iconSize} relative`}>
          {image && (
            <img
              aria-label={ariaLabel && `${ariaLabel}_USERLOGO_IMAGE`}
              alt="User Logo"
              className="rounded-full overflow-hidden"
              src={image}
            />
          )}
          {coinImage && <img alt="coin logo" className={coinImageClassses} src={coinImage} />}
        </div>
      </div>
      <span aria-label={ariaLabel && `${ariaLabel}_USERNAME_LABEL`} className={textClasses}>
        {fullText ? t("senduser.fulltext.send-to-name", { displayName }) : displayName}
      </span>
    </div>
  );
};
