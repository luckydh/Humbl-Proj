import React from "react";
import { Icon, IconProps } from "components/Icon/Icon";

interface NoticeProps {
  iconName: IconProps["name"];
  title: React.ReactNode;
  description: React.ReactNode;
  ariaLabel?: string;
}

export const Notice: React.FC<NoticeProps> = ({ iconName, title, description, ariaLabel }) => (
  <div className="flex flex-row mt-2 mb-6">
    <div className="w-10 pt-2" aria-label="KYC_VAULT_ICON">
      <Icon name={iconName} size="sm" />
    </div>
    <div className="flex-grow ml-3">
      <h3
        className="text-lg font-medium"
        aria-label={ariaLabel ? `${ariaLabel}_TITLE_LABEL` : "KYC_SECURE_DISCLAIMER_TITLE_LABEL"}>
        {title}
      </h3>
      <p className="text-xs" aria-label={ariaLabel ? `${ariaLabel}_TITLE_BODY` : "KYC_SECURE_DISCLAIMER_BODY_LABEL"}>
        {description}
      </p>
    </div>
  </div>
);
