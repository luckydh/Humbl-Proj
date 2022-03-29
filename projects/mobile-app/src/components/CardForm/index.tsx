import React, { useState } from "react";
import { PaymentMethodType } from "generated/graphql";

import CardAddedStep from "./CardAddedStep";
import CreditCardInfoStep, { CreditCardFields } from "./CreditCardInfoStep";
import BillingAddressStep, { BillingAddressInfo } from "./BillingAddressStep";
import { Icon } from "components/Icon/Icon";
import "./styles.scss";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { ErrorModal } from "components/ErrorHandling/ErrorModal";
import { useTranslation } from "react-i18next";
import { UNSUPPORTED_STATES } from "utils/constants";

type Step = "credit-card" | "billing-address" | "card-added";

export type CardOutput = CreditCardFields & BillingAddressInfo;

interface Props {
  initialData?: PaymentMethodType;
  onComplete: (data: CardOutput) => Promise<void>;
  setIsHeaderAddCard?: (isHeaderAddCard: boolean) => void;
}

const blankBillingAddressInfo = {
  country: "",
  city: "",
  state: "",
  postalCode: "",
  addressLine1: "",
  addressLine2: "",
};

export const CardForm: React.FC<Props> = ({ onComplete, initialData, setIsHeaderAddCard }) => {
  const [step, setStep] = useState<Step>("credit-card");
  const [cardInfo, setCardInfo] = useState<CreditCardFields>();
  const [billingInfo, setBillingInfo] = useState<BillingAddressInfo>(blankBillingAddressInfo);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { t } = useTranslation();

  const handleCompleteCreditCardStep = (data: CreditCardFields) => {
    setCardInfo(data);
    setStep("billing-address");
    setIsHeaderAddCard?.(false);
  };

  const submitCardInfo = async (address: BillingAddressInfo) => {
    if (!cardInfo) {
      trackEvent(EVENTS.PAYMENT_METHOD_ADDED, { status: "fail" });
      return;
    }

    try {
      trackEvent(EVENTS.PAYMENT_METHOD_ADDED, { status: "success" });
      await onComplete({
        ...address,
        ...cardInfo,
      });

      setStep("card-added");
      setIsHeaderAddCard?.(true);
    } catch (error) {
      trackEvent(EVENTS.PAYMENT_METHOD_ADDED, { status: error });
      // This catch block prevents "Unexpected promise rejection".
      // The error should be treated in the parent component through
      // the "error" prop in the mutation hooks.
    }
  };

  const handleCompleteBillingAddressStep = async (address: BillingAddressInfo) => {
    const isUnsupportedState = address.state ? UNSUPPORTED_STATES.has(address.state.toUpperCase()) : false;

    if (isUnsupportedState) {
      setShowErrorModal(true);
      setBillingInfo(address);
      return;
    }

    submitCardInfo(address);
  };

  const handleProceed = async () => {
    await submitCardInfo(billingInfo);
    setShowErrorModal(false);
    setStep("card-added");
  };

  const handleCancel = () => {
    setShowErrorModal(false);
    setStep("credit-card");
  };

  return (
    <div className="flex flex-col justify-start h-full">
      {step === "credit-card" && (
        <CreditCardInfoStep initialData={initialData} onComplete={handleCompleteCreditCardStep} />
      )}
      {step === "billing-address" && (
        <BillingAddressStep
          initialData={{
            country: initialData?.country ?? "",
            city: initialData?.cityAddress ?? "",
            state: initialData?.region ?? "",
            postalCode: initialData?.PostalAddress ?? "",
            addressLine1: initialData?.streetAddress ?? "",
            addressLine2: initialData?.streetAdditional ?? "",
          }}
          ariaLabel="ADDCARD"
          onComplete={handleCompleteBillingAddressStep}
        />
      )}
      {showErrorModal && (
        <ErrorModal
          isOpen={showErrorModal}
          IconComponent={<Icon name="bold_danger" size="lg" />}
          title={t("add-card-tx-ny-error-title")}
          subTitle={t("add-card-tx-ny-error-subtitle")}
          secondaryAction={{ text: t("add-card-tx-ny-error-confirm-button"), action: handleProceed }}
          primaryAction={{ text: t("add-card-tx-ny-error-cancel-button"), action: handleCancel }}
          ariaLabel="STATEWARNING"
        />
      )}
      {step === "card-added" && <CardAddedStep isEditing={!!initialData} />}
    </div>
  );
};

export default CardForm;
