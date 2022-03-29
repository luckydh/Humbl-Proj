import React, { useState } from "react";
import BillingAddressStep, { BillingAddressInfo } from "components/CardForm/BillingAddressStep";
import { useUpdateKycInfoMutation, BirthdayInput, AddressInput } from "generated/graphql";
import { useTranslation } from "react-i18next";
import { mapErrorCodeToTranslationKey, getPotentialHumblError } from "graphql/humblGraphqlError";
import { WarningModal } from "components/WarningModal";
import { captureException } from "ErrorLogger";
import { ContinueTextElement } from "./ContinueButton";
import PageHeading from "./PageHeading";
import { useKYCForm } from "./KYCFlowContext";
import LoaderButton from "components/LoaderButton/LoaderButton";
import { Icon } from "components/Icon/Icon";

export const ContactDetails: React.FC = () => {
  const { t } = useTranslation();
  const [processing, setIsProcessing] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const {
    formData: { address, govIdBack, govIdFront, govIdType, personalDetails },
    setFormData,
  } = useKYCForm();

  const [updateKycInfo, { error: updateKycInfoError }] = useUpdateKycInfoMutation({
    context: {
      uri: process.env.REACT_APP_SECURE_HUMBL_DATA_URL,
    },
  });

  const handleComplete = async (addressInfo: BillingAddressInfo) => {
    if (!govIdFront || !personalDetails || !govIdType) {
      return;
    }

    setFormData({ type: "Address", payload: addressInfo });
    setIsProcessing(true);

    const dobObject = createDOBObject(personalDetails.dateOFBirth);
    const addressObject = creatAddressObject(addressInfo);

    try {
      const { data: updateKycInfoData } = await updateKycInfo({
        variables: {
          govIdBack: govIdBack?.src,
          govIdFront: govIdFront.src,
          address: addressObject,
          dateOFBirth: dobObject,
          govIdType: govIdType!,
          individualSsn: personalDetails.individualSsn,
          legalFirstName: personalDetails.legalFirstName,
          legalLastName: personalDetails.legalLastName,
        },
      });
      const confirmedUpload = updateKycInfoData?.enterKYCInfo?.confirmedUpload;
      if (!confirmedUpload) {
        throw Error("Upload not confirmed");
      }

      setFormData({ type: "FormSubmitted", payload: confirmedUpload });
    } catch (error) {
      captureException(error);
      setShowWarning(true);
    }

    setIsProcessing(false);
  };

  const humblError = updateKycInfoError?.graphQLErrors && getPotentialHumblError(updateKycInfoError.graphQLErrors);

  return (
    <>
      <PageHeading
        title={t("kyc.contact-details.page.title")}
        description={t("kyc.contact-details.page.description")}
        ariaLabel="KYC_CONTACT"
      />

      <WarningModal
        show={!!showWarning}
        title={<Icon name="bold_danger" color="red" size="md" />}
        onDismiss={() => setShowWarning(false)}
        message={t(mapErrorCodeToTranslationKey(humblError?.humblErrorCode))}
      />

      {/*
      /* This padding offset is needed to make this behave like the other components in this flow.
      /* This should be a negative of the padding applied to the main flow container.
       */}
      <div className="-mb-20 w-full h-full">
        <BillingAddressStep
          ariaLabel="KYC_CONTINUE_BUTTON"
          initialData={address}
          onComplete={handleComplete}
          submitButton={
            <LoaderButton type="submit" loading={processing} loadingText={t("kyc.contact-details.page.process")}>
              <ContinueTextElement />
            </LoaderButton>
          }
          variant="fill"
        />
      </div>
    </>
  );
};

/** Based on a "MM/DD/YYYY" DOB */
function createDOBObject(dob: string): BirthdayInput {
  const [month, day, year] = dob.split("/");
  return { month: parseInt(month, 10), day: parseInt(day, 10), year: parseInt(year, 10) };
}

function creatAddressObject(address: BillingAddressInfo): AddressInput {
  return {
    street: address.addressLine1,
    additional: address.addressLine2,
    city: address.city,
    postal: address.postalCode,
    country: address.country,
    region: address.state,
  };
}
