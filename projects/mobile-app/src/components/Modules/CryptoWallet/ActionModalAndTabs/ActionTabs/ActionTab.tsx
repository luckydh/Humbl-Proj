import React from "react";
import cx from "classnames";
import { Button } from "components/Button/Button";

export interface ActionTabsProps {
  title: string;
  description: string;
  leftIcon: string;
  rightIcon: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  testIdButton?: string;
  testIdLabel?: string;
}

interface ActionTabWithChildren {
  title?: never;
  description?: never;
  // TODO: update to be able to use Icon component instead of img. maybe just accept JSX.Element here?
  leftIcon: string;
  rightIcon: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  testIdButton?: string;
  testIdLabel?: string;
}

const ActionTab: React.FC<ActionTabsProps | ActionTabWithChildren> = ({
  title,
  description,
  leftIcon,
  rightIcon,
  onClick,
  className,
  disabled,
  testIdButton,
  testIdLabel,
  children,
}) => {
  const customClass = "flex justify-center items-center";
  return (
    <Button
      ariaLabel={testIdButton}
      onClick={onClick}
      isDisabled={disabled}
      customClass={cx(
        "flex flex-row w-full items-center bg-white rounded-lg p-2 active:bg-blue-lightest2 transition-all",
        className
      )}>
      <div className={cx("bg-white bg-opacity-50 rounded-full h-8 w-8", customClass)}>
        <span className={cx("w-7 h-7 rounded-lg bg-blue", customClass)}>
          <img src={leftIcon} alt={title} className="h-4 w-4" />
        </span>
      </div>
      {children ? (
        <div className="flex flex-1 ml-2 text-left text-blue-dark font-bold text-base align-middle">{children}</div>
      ) : (
        <div className="flex flex-col flex-1 ml-2 text-left">
          <div className="text-blue-dark font-bold text-base items-center flex">{title}</div>
          <div
            aria-label={testIdLabel}
            className="text-blue-dark leading-relaxed font-normal text-xs truncate whitespace-normal">
            {description}
          </div>
        </div>
      )}
      <div className="bg-white bg-opacity-50 rounded-full flex items-center">
        <span className={cx("w-7 h-7 rounded-full bg-blue-dark", customClass)}>
          <img src={rightIcon} alt={title} />
        </span>
      </div>
    </Button>
  );
};

export default ActionTab;
