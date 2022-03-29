import React from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { BankType, useGetBanksQuery } from "generated/graphql";
import { EmptyBankList } from "./Components/EmptyBankList";
import { useHardwareBackButton } from "hooks/useHardwareBackButton";
import { trackEvent } from "utils/analytics/Segment";
import { BankList } from "./Components/BankList";
import EVENTS from "utils/analytics/AnalyticEvents";
import { BankListSkeleton } from "./Components/BankListSkeleton";

export interface SelectBankPageProps {
  onBankSelected: (bank: BankType) => void;
  onClickBack: () => void;
  ariaLabel?: string;
}

export const BankListPage = ({ onBankSelected, onClickBack, ariaLabel }: SelectBankPageProps) => {
  const { t } = useTranslation();
  const history = useHistory();

  useHardwareBackButton(onClickBack, 1000);

  const { loading, data } = useGetBanksQuery();

  const bankList: BankType[] = data?.getBanks ?? [];
  const isEmpty: boolean = bankList.length === 0;
  const initialLoad: boolean = loading && isEmpty;
  const isEmptyBankList: boolean = !loading && isEmpty;

  const onAddBankClicked = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Add Bank",
      type: "Withdraw",
      screenName: "Transfer to bank",
    });
    history.push("/add-bank-account");
  };

  const onDismissBank = () => {
    // TODO dispatch dissmissBank
  };

  const onBankSelectedConfirm = (bank: BankType) => {
    onBankSelected(bank);
  };

  if (initialLoad) {
    return <BankListSkeleton />;
  }

  if (isEmptyBankList) {
    return (
      <LayoutModal title={t("select-bank-page.heading")} ariaLabel={ariaLabel} onClickBack={onClickBack}>
        <EmptyBankList ariaLabel={ariaLabel} onAddBankClicked={onAddBankClicked} />
      </LayoutModal>
    );
  }

  return (
    <LayoutModal
      ariaLabel={ariaLabel}
      title={t("select-bank-page.heading")}
      onClickBack={onClickBack}
      horizontalPadding={false}>
      {bankList.length > 0 && (
        <BankList
          ariaLabel={ariaLabel}
          bankList={bankList}
          onDismissBank={onDismissBank}
          onBankSelectedConfirm={onBankSelectedConfirm}
          onAddBankClicked={onAddBankClicked}
        />
      )}
    </LayoutModal>
  );
};
