import React from "react";
import { CheckBoxCard, CheckBoxCardSkeleton } from "components/CheckBoxCard";
import { PaymentMethodStatus, PaymentMethodType } from "generated/graphql";
import { formatMaskedValue } from "./common";
import { Icon } from "components/Icon/Icon";

type PlaidDataCardProps = {
  data?: PaymentMethodType | null;
  isSelected: boolean;
  disabled?: boolean;
  onSelect: (bank: PaymentMethodType) => void;
};

export const PlaidDataCard: React.FC<PlaidDataCardProps> = ({ children, data, disabled, isSelected, onSelect }) => {
  if (!data) {
    return <CheckBoxCardSkeleton className="mb-2" />;
  }

  // TODO: this should eventually be resolved to cardbrand or some "brand" display value
  // but until the BE can get the proper data from the institution, this will have to do.
  const title = data.cardBrand?.display || data.name || "";
  const isDisabled = disabled || data.status !== PaymentMethodStatus.Active;

  return (
    <div className="-mx-6">
      <CheckBoxCard
        title={title}
        subtitle={formatMaskedValue(data.lastFour)}
        onClick={() => onSelect(data)}
        disabled={isDisabled}
        selected={isSelected}
        icon={<Icon color="blue-dark2" name="bold_bank" size="sm" />}
        bottomLineContent={isSelected && !isDisabled && children}
      />
    </div>
  );
};
