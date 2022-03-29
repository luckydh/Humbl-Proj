import React from "react";
import { useTranslation } from "react-i18next";
import { Illustration } from "components/Illustration/Illustration";

export const NoPaymentMethods = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6 mb-16">
      <Illustration name="payment_methods" size="lg" />
      <h2 className="mt-4 text-2xl tracking-tight text-center text-white">
        {t("pages-cards.my-payment-methods.no-payment-methods.title")}
      </h2>
      <p className="mt-2 text-base tracking-normal text-center text-white px-5">
        {t("pages-cards.my-payment-methods.no-payment-methods.message")}
      </p>
    </div>
  );
};
