import SendOrderPreview from "components/Modules/CryptoWallet/SendFlow/OrderPreview/SendOrderPreview";
import React from "react";
import { useConfirmTransferQuoteMutation, useGetQuoteByIdQuery } from "generated/graphql";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { captureException } from "ErrorLogger";
import { presentToast } from "utils/toast";
import { getPotentialHumblError } from "graphql/humblGraphqlError";
import { useFlowActions } from "pages/CryptoWallet/Flow";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sendFlowCurrentState } from "../sendFlowUtils";

/**
 * This container does all the business logic of fetching a quote and submitting an order
 * @returns Renders SendOrderPreview component
 */
export const SendOrderPreviewContainer: React.FC = () => {
  const { exit, forward, back } = useFlowActions();
  const { currency, code, quoteId, user, coinImage } = useRecoilValue(sendFlowCurrentState);
  const setCurrentState = useSetRecoilState(sendFlowCurrentState);
  const {
    data,
    loading: isLoadingQuote,
    error,
  } = useGetQuoteByIdQuery({
    fetchPolicy: "network-only",
    variables: { quoteId, assetCode: code || currency },
  });

  const humblError = error?.graphQLErrors && getPotentialHumblError(error.graphQLErrors);

  const [confirmQuote, { loading: isLoadingConfirmation }] = useConfirmTransferQuoteMutation({
    onCompleted: (confirmQuoteData) => {
      if (confirmQuoteData?.confirmQuote?.transactionId) {
        const {
          email = "",
          fiatAmount = 0,
          fiatCurrencyCode = "",
          transactionId,
          sourceAmount,
        } = confirmQuoteData.confirmQuote;

        trackEvent(EVENTS.SEND_CRYPTO, {
          screenName: "Order Preview",
          assetName: code ?? currency,
          assetAmount: sourceAmount,
          transactionId,
        });

        trackEvent(EVENTS.BUTTON_CLICK, {
          action: "Confirm",
          type: "Send",
          status: "success",
          screenName: "Order Preview",
          cryptoCode: code ?? currency,
          transactionId,
        });
        setCurrentState((state) => ({
          ...state,
          payload: {
            ...state.payload,
            fiatAmount,
            cryptoAmount: `${sourceAmount}`,
            fiatCurrencyCode,
          },
          email,
          transactionId,
          code,
        }));
        forward();
      }
    },
    onError: (confirmQuoteError) => {
      trackEvent(EVENTS.BUTTON_CLICK, {
        action: "Confirm",
        type: "Send",
        status: confirmQuoteError?.message,
        screenName: "Order Preview",
        cryptoCode: code ?? currency,
      });
      trackEvent(EVENTS.SEND_CRYPTO, {
        screenName: "Order Preview",
        assetName: code ?? currency,
        status: "Fail",
      });
      presentToast(confirmQuoteError.message, 2000, "danger");
      captureException(confirmQuoteError);
    },
  });

  const handleConfirmSend = async () => {
    await confirmQuote({
      variables: {
        quoteId,
        assetCode: code || currency,
      },
    });
  };

  const onRightClick = () => {
    exit();
  };

  return (
    <SendOrderPreview
      ariaLabel="ORDERPREVIEW"
      quote={data?.getQuote}
      onConfirmOrder={handleConfirmSend}
      isLoadingQuote={isLoadingQuote}
      isLoadingConfirmation={isLoadingConfirmation}
      error={humblError}
      onRightClick={onRightClick}
      onClickBack={back}
      userImage={user?.image}
      coinImage={coinImage}
      displayName={user?.displayName}
    />
  );
};
