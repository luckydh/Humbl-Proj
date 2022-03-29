import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "components/Icon/Icon";

export interface OnboardingTaskProps {
  title: string;
  description: string;
  onClick?: () => void;
  icon: JSX.Element;
  ariaLabel?: string;
}

export const OnboardingTask: React.FC<OnboardingTaskProps> = ({ title, onClick, description, icon, ariaLabel }) => {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      aria-label={ariaLabel || "ONBOARDING_TASK_BUTTON"}
      className="min-w-[16rem] max-w-xs h-32 whitespace-normal bg-blue-lightest bg-right-bottom bg-no-repeat shadow-md rounded-xl text-blue-dark font-medium flex flex-col justify-center">
      <div className="p-3 sm:px-4 flex flex-row">
        <div className="flex flex-col justify-center flex-shrink text-blue-dark truncate">
          <p className="text-sm md:text-base truncate">{title}</p>
          <p className="text-xs md:text-sm max-w-sm font-normal whitespace-normal line-clamp-2">{description}</p>
        </div>
        <div className="flex flex-row justify-end items-center flex-auto">{icon}</div>
      </div>
      {onClick && (
        <>
          <hr className="border-gray-900 border-opacity-10" />
          <div className="px-3 py-2 text-light-bright-blue flex flex-row items-center">
            {t("global.continue")}
            <span className="align-middle mr-[-6px] opacity-50">
              <Icon color="light-bright-blue" name="outline_chevron" size="xs" />
            </span>
            <Icon name="outline_chevron" color="light-bright-blue" size="xs" />
          </div>
        </>
      )}
    </div>
  );
};
