import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { TwoFactor } from "components/Modules/CryptoWallet/TwoFactor/TwoFactor";
import { useTranslation } from "react-i18next";
import { usePostAuthCodesMutation } from "generated/graphql";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { formatPhoneNumber } from "react-phone-number-input";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { captureException } from "ErrorLogger";
import ActionModal from "components/Modules/CryptoWallet/ActionModalAndTabs/ActionModal/ActionModal";
import twoFactorCodeExample from "assets/svgs/2fa-code-example.svg";

import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { TwoFactorError, TwoFactorErrorType } from "components/Modules/CryptoWallet/TwoFactor/TwoFactorError";
import { ApolloError } from "@apollo/client";
import { BuyingFlowStepProps } from "../sharedTypes";
import { buyingFlowOrderState, buyingFlowTwoFactorState } from "../atoms";
import { getPotentialHumblError } from "graphql/humblGraphqlError";

enum TwoFactorStep {
  Sms = "sms",
  Bank = "bank",
}

enum ErrorReturn {
  WrongCode = "authorization code mismatch",
}

const wrongCodeError = (error?: ApolloError): boolean => {
  if (error) {
    // TODO: when humble error code is updated to return max attempts,
    // this should be made less brittle
    // b/e work tracked here: https://humblpay.atlassian.net/browse/HC-1854
    return error.toString().toLowerCase().includes(ErrorReturn.WrongCode);
  }
  return false;
};

export const TwoFactorAuthContainer: React.FC<BuyingFlowStepProps> = ({ onComplete, onAbort }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(TwoFactorStep.Sms);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState<ApolloError>();

  const orderState = useRecoilValue(buyingFlowOrderState);
  const [twoFactorState, setTwoFactorState] = useRecoilState(buyingFlowTwoFactorState);

  const { currentAccount } = useGetCurrentAccount();
  const [postAuthCodes, { error, loading: isSubmitting }] = usePostAuthCodesMutation({
    onError: (postAuthCodeError) => {
      captureException(postAuthCodeError);
    },
    onCompleted: (data) => {
      if (data.postAuthCodes) {
        onComplete();
      }
    },
  });

  useEffect(() => {
    setTwoFactorError(error);
  }, [error]);

  const handleOnErrorDismiss = () => {
    setTwoFactorError(undefined);
    wrongCodeError(twoFactorError) ? setStep(TwoFactorStep.Sms) : onAbort?.();
  };

  const { card2faNeeded, smsNeeded } = orderState;

  const handleChangeSms = (value: string) => {
    setTwoFactorState({ ...twoFactorState, smsCode: value });
  };

  const handleChangeBank = (value: string) => {
    setTwoFactorState({ ...twoFactorState, card2faCode: value });
  };

  const handleSubmit = () => {
    postAuthCodes({
      variables: {
        sms: twoFactorState.smsCode,
        card2Fa: twoFactorState.card2faCode,
        orderId: orderState.orderId!,
        reservationId: orderState.reservationId!,
      },
    });
  };

  const handleContinueSms = () => {
    if (card2faNeeded && (!twoFactorState.card2faCode || error)) {
      setStep(TwoFactorStep.Bank);
    } else {
      handleSubmit();
    }
  };

  const handleContinueBank = () => {
    if (smsNeeded && !twoFactorState.smsCode) {
      setStep(TwoFactorStep.Sms);
    } else {
      handleSubmit();
    }
  };

  const handleOpenHelpModal = () => {
    setHelpModalOpen(true);
  };

  return (
    <LayoutModal
      background="bg-blue"
      title={!twoFactorError ? t("crypto-wallet.buy.title.verification-required") : ""}
      shouldShowLeftButton={false}
      variant="offset"
    >
      {!twoFactorError && step === TwoFactorStep.Sms && (
        <TwoFactor
          twoFactorType="SMS"
          phoneNumber={formatPhoneNumber(currentAccount?.phone ?? "")}
          value={twoFactorState.smsCode}
          continueClick={handleContinueSms}
          onChange={handleChangeSms}
          onExit={onAbort}
          disableButtons={isSubmitting}
        />
      )}
      {!twoFactorError && step === TwoFactorStep.Bank && (
        <TwoFactor
          twoFactorType="BANK"
          onExit={onAbort}
          value={twoFactorState.card2faCode}
          continueClick={handleContinueBank}
          secondaryClick={handleOpenHelpModal}
          onChange={handleChangeBank}
          disableButtons={isSubmitting}
        />
      )}

      <OverlayLoading isOpen={isSubmitting} />
      <ActionModal
        ariaLabel="TWO_FACTOR_MODAL"
        background="bg-white"
        showCloseButton
        showActionModal={helpModalOpen}
        setShowActionModal={setHelpModalOpen}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="mb-5">
            <img src={twoFactorCodeExample} alt={t("crypto-wallet.buy.2fa-flow.help-modal.img-alt")} />
          </div>
          <h4 className="text-blue-dark font-bold text-xl mb-4 text-center">
            {t("crypto-wallet.buy.2fa-flow.help-modal.title")}
          </h4>
          <p className="text-blue-dark opacity-70 leading-5 tracking-tight text-center mb-4">
            {t("crypto-wallet.buy.2fa-flow.help-modal.message")}
          </p>
        </div>
      </ActionModal>

      {twoFactorError && <TwoFactorError type={getTwoFactorErrorType(twoFactorError)} onClick={handleOnErrorDismiss} />}
    </LayoutModal>
  );
};

function getTwoFactorErrorType(error?: ApolloError): TwoFactorErrorType {
  return wrongCodeError(error)
    ? "WrongCode"
    : getPotentialHumblError(error?.graphQLErrors ?? [])?.humblErrorCode === "ORDER_EXPIRED"
    ? "TimeOut"
    : "TooManyAttempts";
}

export default TwoFactorAuthContainer;
