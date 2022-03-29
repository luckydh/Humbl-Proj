import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { useGetMyAssetsAndMetricsLazyQuery, useStartUserTransferQuoteMutation } from "generated/graphql";
import { ChooseAmountScreen, SubmitPayload } from "components/Modules/CryptoWallet/ChooseAmountScreen";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { formatUsingIntl } from "utils/currency";
import { captureException } from "ErrorLogger";
import { presentToast } from "utils/toast";
import { sendFlowCurrentState } from "../sendFlowUtils";
import { useFlowActions } from "pages/CryptoWallet/Flow";
import { useRecoilValue, useSetRecoilState } from "recoil";

const MINIMUM_FIAT_AMOUNT_TO_SEND = 1;

export const ChooseAmountSend: React.FC = () => {
  const { t } = useTranslation();
  const { forward, back, exit } = useFlowActions();
  const { currency = "", user, payload } = useRecoilValue(sendFlowCurrentState);
  const setCurrentState = useSetRecoilState(sendFlowCurrentState);

  const userCurrency = useGetCurrentAccountCurrency();
  // TODO: Should handle error state here if data fetching fails.
  const [getMyAssetsAndMetrics, { data, loading: assetsLoading }] = useGetMyAssetsAndMetricsLazyQuery();

  useEffect(() => {
    if (userCurrency) {
      getMyAssetsAndMetrics({
        variables: {
          assetName: currency,
          currency: userCurrency,
        },
      });
    }
  }, [userCurrency, getMyAssetsAndMetrics, currency]);

  const myAsset = data?.myAssets?.find((asset) => asset.code === currency);

  const handleBack = () => {
    back();
  };

  const onRightClick = () => {
    exit();
  };

  const [startUserTransferQuote] = useStartUserTransferQuoteMutation({
    onCompleted: (userTransferReturn) => {
      const quoteId = userTransferReturn?.startUserTransferQuote?.quoteId;
      if (quoteId) {
        trackEvent(EVENTS.SEND_CRYPTO, {
          screenName: "Send to Recipient",
          assetName: currency,
          assetAmount: payload?.cryptoAmount,
        });

        trackEvent(EVENTS.BUTTON_CLICK, {
          action: "Send",
          type: "Send",
          status: "success",
          screenName: "Order Preview",
          cryptoCode: currency,
          quoteId,
        });
        setCurrentState((state) => ({
          ...state,
          quoteId,
          coinImage: data?.getAssetMetrics?.logoImage,
        }));
        forward();
      }
    },
    onError: (userTransferError) => {
      trackEvent(EVENTS.SEND_CRYPTO, {
        screenName: "Send to Recipient",
        assetName: currency,
        assetAmount: payload?.cryptoAmount,
        status: "Fail",
      });

      trackEvent(EVENTS.BUTTON_CLICK, {
        action: "Send",
        type: "Send",
        status: userTransferError?.message,
        screenName: "Send to Recipient",
        cryptoCode: currency,
      });
      presentToast(userTransferError.message, 2000, "danger");
      captureException(userTransferError);
    },
  });

  const handleSubmit = async (submitPayload: SubmitPayload) => {
    trackEvent(EVENTS.SEND_CRYPTO, {
      screenName: "Choose Amount",
      assetName: currency,
      assetAmount: submitPayload.cryptoAmount,
    });

    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Submit",
      type: "Send",
      screenName: "Choose Amount",
      status: "success",
      cryptoCode: currency,
      fiatAmount: submitPayload.fiatAmount,
      cryptoAmount: submitPayload.cryptoAmount,
    });
    setCurrentState((state) => ({
      ...state,
      payload: submitPayload,
      code: currency,
      coinImage: data?.getAssetMetrics?.logoImage,
    }));
    if (currency && user && user.id) {
      await startUserTransferQuote({
        variables: {
          sourceCurrencyCode: currency,
          destAmount: submitPayload.cryptoAmount,
          sourceAmount: submitPayload.cryptoAmount,
          destinationCurrencyCode: currency,
          destination: user?.id,
          notes: "",
          maxOption: submitPayload.maxOption,
        },
      });
    } else {
      forward();
    }
  };

  const validateAmount = (amount: number) => {
    const availableAmount = myAsset?.fiatAmount?.major!;

    if (availableAmount < amount) {
      return t("crypto-wallet.send.choose-amount.insufficient-balance");
    }

    if (amount < MINIMUM_FIAT_AMOUNT_TO_SEND) {
      return t("crypto-wallet.send.choose-amount.min-limit", {
        minimumFiatAmount: formatUsingIntl(MINIMUM_FIAT_AMOUNT_TO_SEND, "standard", userCurrency),
      });
    }

    return null;
  };

  return (
    <ChooseAmountScreen
      asset={data?.getAssetMetrics}
      onBack={handleBack}
      ariaLabel="CALCULATOR"
      onClickClose={onRightClick}
      onSubmit={handleSubmit}
      isSubmitting={false}
      isLoading={assetsLoading}
      availableAmountInFiat={myAsset?.fiatAmount?.major}
      validateAmount={validateAmount}
      suggestions={[{ type: "max" }]}
      userImage={user?.image}
      displayName={user?.displayName}
    />
  );
};
