import React from "react";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "assets/svgs/PlusIcon";
import cx from "classnames";

export interface SuggestionType {
  type: "flat" | "max";
  value?: number;
}

export interface SuggestionButtonProps {
  suggestion: SuggestionType;
  currencySymbol?: string;
  onSelect: (suggestion: SuggestionType) => void;
  ariaLabel?: string;
  isMaxOption?: boolean;
}

export const SuggestionButton: React.FC<SuggestionButtonProps> = ({
  suggestion,
  onSelect,
  currencySymbol,
  ariaLabel,
  isMaxOption,
}) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={() => onSelect(suggestion)}
      aria-label={
        suggestion.type === "max" ? `${ariaLabel}_MAX_BUTTON` : `${ariaLabel}_SUGGESTED${suggestion.value}_BUTTON`
      }
      data-testid={`amount-suggestion-${suggestion.type}${suggestion.value ?? ""}`}
      className={cx("inline-flex flex-row justify-center ml-2 rounded-full bg-blue active:bg-blue-dark", {
        "bg-blue-dark": isMaxOption,
      })}>
      {suggestion.type === "max" && (
        <span className="px-6 py-2 text-lg font-medium leading-6 text-white">
          {t("crypto-wallet.buy.choose-amount.suggestion.max")}
        </span>
      )}
      {suggestion.type === "flat" && (
        <div className="flex py-2 pl-3 pr-4 items-center">
          <PlusIcon width={15} height={15} />
          <span className="ml-1.5 text-lg font-medium leading-6 text-white">
            {currencySymbol}
            {suggestion.value}
          </span>
        </div>
      )}
    </button>
  );
};
