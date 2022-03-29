import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckBoxCard } from "../../../components/CheckBoxCard/CheckBoxCard";
import { bankBlueIcon } from "../../../assets/icons";
import { Button } from "../../../components/Button/Button";
import { BankType } from "../../../generated/graphql";
import { formatMaskedValue } from "pages/PaymentMethods/common";

export interface SelectBankContainerProps {
  bankList: Array<BankType>;
  onDismissBank: (bankId: string | undefined) => void;
  onBankSelectedConfirm: (bank: BankType) => void;
  onAddBankClicked: () => void;
  ariaLabel?: string;
}

export const BankList = ({
  bankList,
  onDismissBank,
  onBankSelectedConfirm,
  onAddBankClicked,
  ariaLabel,
}: SelectBankContainerProps) => {
  const { t } = useTranslation();
  const [bankSelected, setBankSelected] = useState<BankType | null>(null);

  return (
    <div className="flex flex-grow flex-col">
      <div aria-label={ariaLabel && `${ariaLabel}_BANK_SECTION`} className="flex-grow">
        {bankList.map((bank) => (
          <div className="py-2" key={bank.id}>
            <CheckBoxCard
              ariaLabel={ariaLabel}
              title={bank.nickname || ""}
              subtitle={formatMaskedValue(bank.lastFour)}
              icon={bankBlueIcon}
              onClick={() => setBankSelected(bank)}
              selected={!!bankSelected && bankSelected.id === bank.id}
              onDismiss={() => onDismissBank(bank.id)}
            />
          </div>
        ))}
        <div className="py-2 px-6">
          <Button
            ariaLabel={ariaLabel && `${ariaLabel}_ADDABANK_BUTTON`}
            variant="text"
            style={{
              color: "#3b5b7b",
              border: "2px solid #3b5b7b",
              borderRadius: "6px",
            }}
            onClick={onAddBankClicked}>
            {t("select-bank-page.button.add-a-bank")}
          </Button>
        </div>
      </div>
      <div aria-label={ariaLabel && `${ariaLabel}_CONTINUE_BUTTON`} className="py-2 inset-x-0 bottom-0 px-6">
        <Button isDisabled={!bankSelected} onClick={() => bankSelected && onBankSelectedConfirm(bankSelected)}>
          {t("select-bank-page.button.continue")}
        </Button>
      </div>
    </div>
  );
};
