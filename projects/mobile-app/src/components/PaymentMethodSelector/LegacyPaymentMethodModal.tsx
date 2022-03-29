import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PaymentMethodType } from "generated/graphql";
import { Label } from "../Label/Label";
import { CardItem } from "./CardItem";
import CheckIcon from "assets/svgs/CheckIcon";
import { PlusIcon } from "assets/svgs/PlusIcon";

type LegacyPaymentMethodModalProps = {
  paymentMethodList?: PaymentMethodType[];
  selectedPaymentMethod?: PaymentMethodType;
  addCardLink: {
    pathname: string;
    search: string;
    state: unknown;
  };
  handleSelect: (data: { isLegacy: true; payload: PaymentMethodType }) => void;
  handleCloseModal: () => void;
};

export const LegacyPaymentMethodModal: React.FC<LegacyPaymentMethodModalProps> = ({
  selectedPaymentMethod,
  handleCloseModal,
  paymentMethodList,
  handleSelect,
  addCardLink,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Label>{t("payment-page.message.selected-payment-method")}</Label>
        <div className="mt-2 flex">
          <CardItem
            brandName={selectedPaymentMethod?.cardBrand?.display}
            brandImage={selectedPaymentMethod?.cardBrand?.image}
            last4={selectedPaymentMethod?.lastFour}
            onClick={handleCloseModal}
            className="flex-1"
          />
          <button
            type="button"
            onClick={handleCloseModal}
            className="w-20 flex items-center justify-center rounded-lg text-md mb-4 py-4 px-2 ml-2 select-none outline-none bg-blue-dark font-medium">
            <CheckIcon className="h-8" />
          </button>
        </div>
      </div>
      <div className="mt-8">
        <Label>{t("payment-page.card-selection.other-payment-methods")}</Label>
        <div className="mt-2">
          {paymentMethodList?.map((paymentMethod) => (
            <div key={paymentMethod.id} className="flex">
              <CardItem
                last4={paymentMethod?.lastFour}
                brandName={paymentMethod?.cardBrand?.display}
                brandImage={paymentMethod.cardBrand?.image}
                onClick={() => handleSelect({ isLegacy: true, payload: paymentMethod })}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => handleSelect({ isLegacy: true, payload: paymentMethod })}
                className="w-20 flex items-center justify-center rounded-lg text-md mb-4 py-4 px-2 ml-2 select-none outline-none bg-blue-dark font-medium text-white">
                {t("payment-page.action.select")}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <Link to={addCardLink}>
            <div className="flex">
              <CardItem brandName={t("payment-page.action.add-a-new-card")} className="flex-1" />
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-20 flex items-center justify-center rounded-lg text-md mb-4 py-4 px-2 ml-2 select-none outline-none bg-blue-dark font-medium">
                <PlusIcon />
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
