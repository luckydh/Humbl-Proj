import React from "react";
import { AccountType } from "generated/graphql";
import { Button } from "components/Button/Button";
import { useTranslation } from "react-i18next";
import { formatCurrency, getCurrencySymbol } from "utils/currency";
import { ProfileLayout } from "components/PageTemplates/ProfileLayout";
import moment from "moment";
import CheckMark from "components/CheckMark";
import { useHistory } from "react-router";
import { useCurrentAccountHomePath } from "hooks/useCurrentAccountHomePath";

interface Props {
  account: AccountType;
  totalAmount?: number;
  currency: string;
  onClickReview: () => void;
}

export const PaymentSuccessStep: React.FC<Props> = ({ account, totalAmount, currency, onClickReview }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const homePath = useCurrentAccountHomePath();
  return (
    <ProfileLayout showBackButton={false}>
      <div className="flex flex-col pt-14 h-full justify-between">
        <div className=" flex items-center flex-col relative w-full">
          <CheckMark className="" noBackground />
        </div>
        <div className="flex-1 flex flex-col flex-grow justify-around text-center text-white pb-6">
          <div>
            <h1 className="text-3xl">{t("payment-page.action.payment-success")}</h1>
            <div className="text-base text-white-faded">
              {t("payment-page.action.at", { date: moment().format("MMM D YYYY"), time: moment().format("hh:MM A") })}
            </div>
          </div>
          <div>
            <h1 className="text-2xl">{account.displayName}</h1>
            <h1 className="text-3xl">
              {getCurrencySymbol(currency)}
              {formatCurrency(totalAmount!)} {currency}
            </h1>
          </div>
        </div>
        <div className="relative bottom-0 flex py-4 flex-col">
          <Button className="mb-2" onClick={onClickReview}>
            {t("payment-page.action.write-a-review")}
          </Button>
          <Button
            variant="custom"
            className="rounded-md font-bold w-full border-blue-dark text-blue-dark py-2 px-4 border-2 border-solid"
            onClick={() => history.push(homePath)}
          >
            {t("payment-page.action.go-back-home")}
          </Button>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default PaymentSuccessStep;
