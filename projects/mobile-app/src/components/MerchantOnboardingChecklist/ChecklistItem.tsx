import { ChecklistStatus } from "./ChecklistStatus";
import "./styles.scss";
import React from "react";
import ArrowForward from "../../assets/svgs/chevron-right-filled.svg";
import CompleteCheckmark from "../../assets/svgs/checkmark-border.svg";
import warningIcon from "../../assets/svgs/warning-red.svg";
import PadLockIcon from "../../assets/svgs/PadlockIcon.svg";

export interface ChecklistItemProps {
  label: string;
  status: ChecklistStatus;
  onClick?: Function;
  isFirst?: boolean;
  isLast?: boolean;
  isCurrentStep?: boolean;
  hideIcon?: boolean;
}

export const ChecklistItem = ({
  label,
  status,
  onClick,
  isFirst,
  isLast,
  isCurrentStep = false,
  hideIcon = false,
}: ChecklistItemProps) => {
  const handleClick = () => status === ChecklistStatus.CURRENT && onClick && onClick();

  const classes = ["check-list-item-timeline"];
  if (status !== ChecklistStatus.ERROR) {
    if (isCurrentStep) {
      classes.push("check-list-item-timeline-current-step");
    } else {
      classes.push("check-list-item-timeline-step");
    }
  }

  return (
    <div className="flex flex-row justify-start">
      <div className={`flex flex-shrink ml-2 mr-6 ${classes.join(" ")}`}>
        {!isFirst && !isCurrentStep && <div className="check-list-item-timeline-top" />}
        {!isLast && !isCurrentStep && <div className="check-list-item-timeline-bottom" />}
        {!isFirst && isCurrentStep && <div className="check-list-item-timeline-current-step-top" />}
        {!isLast && isCurrentStep && <div className="check-list-item-timeline-current-step-bottom" />}
        {status === ChecklistStatus.ERROR && (
          <div className="check-list-item-timeline-error-icon">
            <img src={warningIcon} alt={"Warning"} />
          </div>
        )}
      </div>

      <div
        className={`flex flex-grow p-3 border rounded text-white justify-between my-2  ${
          status !== ChecklistStatus.PENDING && status !== ChecklistStatus.ERROR && "check-list-item-white-background"
        }
        ${status === ChecklistStatus.ERROR && "check-list-item-error-border"}
        `}
        onClick={() => handleClick()}>
        <span>{label}</span>
        {hideIcon && status === ChecklistStatus.PENDING && <span>Pending</span>}
        {!hideIcon && (
          <div className="check-list-item-icon">
            {status === ChecklistStatus.COMPLETE && <img src={CompleteCheckmark} alt={""} />}
            {(status === ChecklistStatus.PENDING || status === ChecklistStatus.CURRENT) && (
              <img src={ArrowForward} alt={""} />
            )}

            {status === ChecklistStatus.LOCKED && (
              <img className="check-list-item-pad-lock-icon" src={PadLockIcon} alt={""} />
            )}
            {status === ChecklistStatus.ERROR && <img src={ArrowForward} alt={""} />}
          </div>
        )}
      </div>
    </div>
  );
};
