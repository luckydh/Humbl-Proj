import React, { useEffect, useState } from "react";
import { AccountType, useCreateCompleteTransactionMutation } from "generated/graphql";

import { PaymentInfoStep, PaymentInfo } from "./PaymentInfoStep";
import { PaymentConfirmStep } from "./PaymentConfirmStep";
import { PaymentSuccessStep } from "./PaymentSuccessStep";
import { ReviewInfoStep } from "./ReviewInfoStep";
import { ReviewSuccessStep } from "./ReviewSuccessStep";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { confirmPaymentIntent, destroyStripeModal } from "utils/StripeHandler";
import "assets/3rd-party/stripe.scss";

interface Props {
  account: AccountType;
}

type Step = "payment-info" | "payment-confirm" | "payment-success" | "review-info" | "review-success";

const DEFAULT_CURRENCY = "USD";

export const MerchantPayment: React.FC<Props> = ({ account }) => {
  const [step, setStep] = useState<Step>("payment-info");
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();
  const [paymentError, setPaymentError] = useState(false);
  // ToDo: Need to remove the mutation, test and implementation below.
  // const [createTransaction, { data, error, loading }] =
  //   useCreateMerchantTransactionMutation();

  const [createCompleteTransaction, { data: transactionData }] = useCreateCompleteTransactionMutation();
  const [transactionLoading, setTransactionLoading] = useState(false);
  const goToPaymentInfo = () => setStep("payment-info");
  const goToPaymentConfirm = () => setStep("payment-confirm");
  const goToPaymentSuccess = () => setStep("payment-success");
  const goToReviewInfo = () => setStep("review-info");
  const goToReviewSuccess = () => setStep("review-success");

  const handleCompletePaymentInfo = (payment: PaymentInfo) => {
    setPaymentInfo(payment);
    goToPaymentConfirm();
  };

  const handleStripeModalRemoval = () => {
    destroyStripeModal(() => setTransactionLoading(false));
  };

  const currency = account.merchantProfileDetails?.currency ?? DEFAULT_CURRENCY;

  useEffect(() => {
    setPaymentError(false);
    const paymentStatus = (response: any) => {
      setTransactionLoading(false);
      if (response?.status === true) {
        trackEvent(EVENTS.PAYMENT_ATTEMPT, { status: "success" });
        goToPaymentSuccess();
      } else {
        setPaymentError(true);
        trackEvent(EVENTS.PAYMENT_ATTEMPT, { status: "fail" });
      }
    };
    (async () => {
      if (transactionData) {
        if (transactionData.createCompleteTransaction?.intentSecret) {
          const response = await confirmPaymentIntent(transactionData.createCompleteTransaction.intentSecret);
          paymentStatus(response);
        } else {
          setTransactionLoading(false);
          setPaymentError(true);
          trackEvent(EVENTS.PAYMENT_ATTEMPT, { status: "fail" });
        }
      }
    })();
  }, [transactionData]);

  const handleCompleteConfirm = async () => {
    if (!paymentInfo) {
      setPaymentError(true);
      trackEvent(EVENTS.PAYMENT_ATTEMPT, { status: "fail" });
      return;
    }
    setPaymentError(false);
    try {
      setTransactionLoading(true);
      await createCompleteTransaction({
        variables: {
          currency,
          amount: paymentInfo.total, // keeping this because the backend still requires it
          tip: paymentInfo.tipAmount,
          subtotal: paymentInfo.amount,
          methodUsed: paymentInfo.paymentMethod.id,
          destinationAccountTag: account.id,
        },
      });
    } catch (error) {
      setTransactionLoading(false);
      setPaymentError(true);
      trackEvent(EVENTS.PAYMENT_ATTEMPT, { status: error });
      // this catch block prevents "Unexpected promise rejection"
      // the error is being treated in the "error" prop of the mutation hook
    }
  };

  return (
    <>
      {step === "payment-info" && (
        <PaymentInfoStep
          account={account}
          currency={currency}
          initialData={paymentInfo}
          onComplete={handleCompletePaymentInfo}
        />
      )}
      {step === "payment-confirm" && (
        <PaymentConfirmStep
          account={account}
          currency={currency}
          destroyStripeModal={handleStripeModalRemoval}
          totalAmount={paymentInfo?.total || 0}
          error={paymentError}
          onBack={goToPaymentInfo}
          onComplete={handleCompleteConfirm}
          loading={transactionLoading}
        />
      )}
      {step === "payment-success" && (
        <PaymentSuccessStep
          account={account}
          currency={currency}
          totalAmount={paymentInfo?.total}
          onClickReview={goToReviewInfo}
        />
      )}
      {step === "review-info" && (
        <ReviewInfoStep
          account={account}
          onComplete={goToReviewSuccess}
          transactionId={transactionData?.createCompleteTransaction?.transaction?.id!}
        />
      )}
      {step === "review-success" && <ReviewSuccessStep />}
    </>
  );
};

export default MerchantPayment;
