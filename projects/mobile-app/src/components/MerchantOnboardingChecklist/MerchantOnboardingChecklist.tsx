import React from "react";
import { ChecklistItem, ChecklistItemProps } from "./ChecklistItem";
import { ChecklistStatus } from "./ChecklistStatus";

export interface MerchantOnboardingChecklistProps {
  items: ChecklistItemProps[];
}

export const MerchantOnboardingChecklist = ({
  items,
}: MerchantOnboardingChecklistProps) => {
  let currentStep = false;
  return (
    <>
      <div className="flex flex-col">
        {items?.map((item, index) => {
          let itemCurrentStep = false;
          if (!currentStep && item.status === ChecklistStatus.CURRENT) {
            currentStep = true;
            itemCurrentStep = true;
          }
          return (
            <ChecklistItem
              key={item.label}
              {...item}
              isFirst={index === 0}
              isLast={index === items.length - 1}
              isCurrentStep={itemCurrentStep}
            />
          );
        })}
      </div>
    </>
  );
};
