import React, { useState } from "react";
import { GetCountryByString } from "pages/MerchantOnboarding/CountriesMapping";
import { AccountType, useUpdateStripeBankingMutation } from "generated/graphql";
import { presentToast } from "utils/toast";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useGetFieldList } from "pages/MerchantOnboarding/Payouts/PayoutDetails.schema";
import { getSchema } from "pages/MerchantOnboarding/utils/getSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { RenderFormFields } from "pages/MerchantOnboarding/utils/RenderFormFields";
import { mapToRouting } from "pages/MerchantOnboarding/utils/mapToRouting";
import { useGetCurrentAccount } from "../../hooks/useGetCurrentAccount";
import SuccessModal from "components/SuccessModal";
import { useHistory } from "react-router";
import Button from "../../components/Button/Button";
import { Countries } from "../../utils/Countries";

export const BankInfoEditPage = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [updateStripeBankingMutation] = useUpdateStripeBankingMutation();

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const { currentAccount, refetch } = useGetCurrentAccount();

  const account = currentAccount as AccountType;

  const countryCode = GetCountryByString(account?.merchantProfileDetails?.country?.alpha2 || "");

  const { fields, schema } = getSchema(useGetFieldList(), Countries[countryCode]);
  const { register, handleSubmit, errors, control } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });

  return (
    <>
      <SuccessModal
        isOpen={showSuccessModal}
        message={t("update-bank-page.success-modal.message")}
        duration={3000}
        onTimeout={() => {
          history.goBack();
        }}
      />
      <form
        onSubmit={handleSubmit((data) => {
          setIsButtonLoading(true);

          const routingNumber = mapToRouting(Countries[countryCode], data?.routingNumber, data?.routingNumber2);

          updateStripeBankingMutation({
            variables: {
              routingNumber,
              accountNumber: data.accountNumber,
            },
            context: {
              uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
            },
          })
            .then((bankResponse) => {
              if (bankResponse.data?.updateStripeBanking) {
                refetch();
                setShowSuccessModal(true);
              }
            })
            .catch((error) => {
              if (error.message === "Invalid routing number") {
                presentToast(t("update-bank-page.error.invalid-routing-number"), 2000, "danger");
              } else {
                presentToast(t("update-bank-page.error.general"), 2000, "danger");
              }
            })
            .finally(() => {
              setIsButtonLoading(false);
            });
        })}>
        <RenderFormFields fields={fields} register={register} errors={errors} control={control} />
        <div className="flex flex-col w-full">
          <p className="text-white text-sm my-3">{t("onboarding.payout.bottom-description")}</p>
          <Button isDisabled={isButtonLoading} type={"submit"}>
            {t("update-bank-page.update-bank-info")}
          </Button>
        </div>
      </form>
    </>
  );
};
