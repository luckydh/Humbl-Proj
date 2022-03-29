import React, { FC, ReactElement, useCallback } from "react";
import cx from "classnames";

export interface TabButtonProps {
  /** Set the icon element */
  icon: ReactElement;
  /** Set the label */
  title: string;
  /** Set the ID */
  id: string;

  /** Set the tab active */
  isActive?: boolean;
  /** Respond to TabButton click */
  onClick?: (id: string) => void;
}

export const TabButton: FC<TabButtonProps> = ({ icon, id, isActive = false, onClick, title }) => {
  const onClickHandler = useCallback(() => {
    onClick?.(id);
  }, [id, onClick]);

  const iconClasses = cx(
    "rounded-full flex items-center justify-center fill-current text-blue",
    isActive ? "bg-white" : "bg-white-faded"
  );

  const textClasses = cx("text-white text-xs mt-1", isActive ? "font-bold" : "font-medium");

  return (
    <button
      title={title}
      className="flex flex-col items-center flex-none outline-none select-none"
      onClick={onClickHandler}>
      <span className={iconClasses} style={{ height: 31, width: 31 }}>
        {icon}
      </span>
      <span className={textClasses}>Search</span>
    </button>
  );
};

TabButton.displayName = "TabButton";
