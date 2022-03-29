import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { formatUsingIntl } from "utils/currency";
import { useSwapFlowScreenReducer } from "./useSwapFlowContainerReducer";
import { SwapFlowSteps } from "./SwapFlowReducer";
import { ChooseAssetScreen } from "components/Modules/CryptoWallet/ChooseAssetScreen";
import { CryptoCurrencyItemProps } from "components/Modules/CryptoWallet/CryptoCurrencyList";
import {
  useConfirmQuoteMutation,
  useGetCoinSwapAssetsLazyQuery,
  useGetCryptoMarketListQuery,
  useGetQuoteAndAssetLazyQuery,
  useStartQuoteMutation,
  useGetassetmetricQuery,
  useMyAssetsQuery,
} from "generated/graphql";
import { ChooseAmountScreen, SubmitPayload } from "components/Modules/CryptoWallet/ChooseAmountScreen";
import { PurchaseSuccessScreen } from "components/Modules/CryptoWallet/PurchaseSuccessScreen/PurchaseSuccessScreen";
import BuyOrderPreviewScreen from "../BuyingFlow/OrderPreview/BuyOrderPreviewScreen";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { SuggestionType } from "components/Modules/CryptoWallet/SuggestionButton";
import { getPotentialHumblError } from "graphql/humblGraphqlError";
import { cryptoToFiat } from "utils/currencyConversion";
import { decimalPrecision, ORDER_PREVIEW_DECIMAL_PRECISION } from "utils/decimalPrecision";
import { captureException } from "ErrorLogger";
import { getCurrentUser } from "../../../Firebase";
import { LayerComponentProps } from "components/Layers/common";
import { MINIMUM_FIAT_AMOUNT_TO_BUY } from "utils/constants";

const PURCHASE_AMOUNT_SUGGESTIONS: SuggestionType[] = [
  { type: "flat", value: 5 },
  { type: "flat", value: 10 },
  { type: "flat", value: 100 },
];

export const SwapFlowContainer: React.FC<LayerComponentProps<"cryptoWalletSwap">> = ({ onClose }) => {
  const { t } = useTranslation();

  const userCurrency = useGetCurrentAccountCurrency();
  const user = getCurrentUser();
  const { data: marketListData, loading } = useGetCryptoMarketListQuery({
    variables: { type: "SWAP" },
  });
  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    selectedAssetSwapFrom,
    selectedAssetSwapTo,
    setSelectedAmount,
    setSelectedAssetSwapFrom,
    setSelectedAssetSwapTo,
    setQuoteId,
    quoteId,
    setTransactionId,
    transactionId,
  } = useSwapFlowScreenReducer();

  const { data: myAssetsData, loading: myAssetsLoading } = useMyAssetsQuery({
    variables: {
      currency: userCurrency,
    },
  });
  const { data: assetMetrics, loading: assetMetricsLoading } = useGetassetmetricQuery({
    variables: {
      assetName: selectedAssetSwapFrom?.tickerCode,
    },
    skip: !selectedAssetSwapFrom?.tickerCode,
  });

  const [startQuote, { error: quoteError, loading: quoteSubmittingLoader }] = useStartQuoteMutation();
  const [coinSwapAssetQuery, { loading: coinSwapLoader, error: coinSwapQueryError, data: coinSwapAssetData }] =
    useGetCoinSwapAssetsLazyQuery();
  const [getQuoteAssetQuery, { data: quoteAssetData, loading: getQuoteAssetLoader }] = useGetQuoteAndAssetLazyQuery();

  const cryptoAssets = useMemo(
    () =>
      marketListData?.getMarketList?.assets?.map<CryptoCurrencyItemProps>((item) => ({
        name: item?.name,
        valueInFiat: formatUsingIntl(item?.price!, "standard", item.currency),
        image: item?.logoImage,
        change: item?.percentChangeOverPeriod,
        tickerCode: item?.code!,
      })),
    [marketListData?.getMarketList?.assets]
  );

  const assetSwapTo = marketListData?.getMarketList?.assets?.find(
    ({ code }) => code === selectedAssetSwapTo.tickerCode
  );

  const filteredAssets = useMemo(
    () => cryptoAssets?.filter((item) => item.tickerCode !== selectedAssetSwapFrom.tickerCode),
    [cryptoAssets, selectedAssetSwapFrom.tickerCode]
  );

  const filteredMyAssets = myAssetsData?.myAssets?.reduce((current, nextAsset) => {
    const cryptoAsset = cryptoAssets?.find((item) => item.tickerCode === nextAsset.code);
    if (cryptoAsset) {
      current.push(cryptoAsset);
    }

    return current;
  }, [] as CryptoCurrencyItemProps[]);

  const myAsset = myAssetsData?.myAssets?.find((asset) => asset.code === selectedAssetSwapFrom?.tickerCode);

  const validateAmount = (amount: number) => {
    const availableAmount = myAsset?.fiatAmount?.major!;

    if (availableAmount < amount) {
      return t("crypto-wallet.swap.choose-amount.insufficient-balance");
    }

    if (amount < MINIMUM_FIAT_AMOUNT_TO_BUY) {
      return t("crypto-wallet.buy.choose-amount.min-limit", {
        minimumFiatAmount: formatUsingIntl(MINIMUM_FIAT_AMOUNT_TO_BUY, "standard", userCurrency),
      });
    }
    return null;
  };

  const onChooseAmountComplete = async ({ fiatAmount }: SubmitPayload) => {
    try {
      goToNextStep();
      const swapToCryptoAmount = fiatAmount / (assetSwapTo?.price ?? 1);
      const quote = await startQuote({
        variables: {
          destAmount: String(swapToCryptoAmount),
          sourceCurrencyCode: selectedAssetSwapFrom.tickerCode!,
          destinationCurrencyCode: selectedAssetSwapTo.tickerCode,
        },
      });
      setQuoteId(quote.data?.startQuote?.quoteId);
      coinSwapAssetQuery({
        variables: {
          quoteId: quote.data?.startQuote?.quoteId,
          sourceAssetCode: selectedAssetSwapFrom.tickerCode,
          destinationAssetCode: selectedAssetSwapTo.tickerCode,
        },
      });
    } catch (err) {
      captureException(err);
    }
  };

  const [confirmQuote, { error: confirmQuoteError, loading: isSubmitting }] = useConfirmQuoteMutation({
    onError: (err) => {
      captureException(err);
    },
    onCompleted: ({ confirmQuote: completedQuote }) => {
      setTransactionId(completedQuote?.transactionId);
    },
  });

  const destinationValue = cryptoToFiat(
    String(quoteAssetData?.quote?.destinationAmount),
    quoteAssetData?.asset?.price!
  );

  const onConfirmOrder = async () => {
    await confirmQuote({
      variables: {
        quoteId,
      },
    });
    getQuoteAssetQuery({
      variables: {
        quoteId,
        assetCode: selectedAssetSwapTo.tickerCode,
      },
    });
    goToNextStep();
  };

  const quote = coinSwapAssetData?.quote;
  const sourceAssetPrice = coinSwapAssetData?.sourceAsset?.price ?? 0;
  const quoteSourceFee = quote?.sourceFee ?? 0;
  const quoteSourceAmount = quote?.sourceAmount ?? "0";

  const sourceAmountWithoutFees = parseFloat(quoteSourceAmount) - quoteSourceFee;

  const formatInUserCurrency = (value: number) => formatUsingIntl(value, "standard", userCurrency);

  const formatCryptoToUserFiatCurrency = (value?: number | string): string => {
    let val = "0";
    if (value) {
      val = typeof value === "string" ? value : String(value);
    }
    const fiat: number = cryptoToFiat(val, sourceAssetPrice);
    return formatInUserCurrency(fiat);
  };

  const fiatFeesAmount = formatCryptoToUserFiatCurrency(quoteSourceFee);
  const fiatTotalAmount = formatCryptoToUserFiatCurrency(quoteSourceAmount);
  const fiatSourceAmount = formatCryptoToUserFiatCurrency(sourceAmountWithoutFees);

  const queryGraphQLError =
    quoteError?.graphQLErrors || confirmQuoteError?.graphQLErrors || coinSwapQueryError?.graphQLErrors;
  const possibleHumblError = queryGraphQLError && getPotentialHumblError(queryGraphQLError);

  return (
    <>
      {currentStep === SwapFlowSteps.CHOOSE_ASSETS_SWAP_FROM && (
        <ChooseAssetScreen
          onChooseAsset={(asset) => {
            setSelectedAssetSwapFrom(asset);
            goToNextStep();
          }}
          loading={loading || myAssetsLoading}
          ariaLabel="CHOOSEASSET"
          cryptoCurrencyItems={filteredMyAssets ?? []}
          onClickBack={onClose}
          title={t("crypto-wallet.swap-from.title")}
        />
      )}
      {currentStep === SwapFlowSteps.CHOOSE_ASSETS_SWAP_TO && (
        <ChooseAssetScreen
          onChooseAsset={(asset) => {
            setSelectedAssetSwapTo(asset);
            goToNextStep();
          }}
          loading={loading || myAssetsLoading}
          ariaLabel="CHOOSEASSET"
          swapLeftText={t("crypto-wallet.swap.coin.icon.title")}
          tickerCode={selectedAssetSwapFrom.tickerCode}
          leftCoinImage={selectedAssetSwapFrom.image}
          cryptoCurrencyItems={filteredAssets ?? []}
          onClickBack={goToPreviousStep}
          onRightClick={onClose}
          title={t("crypto-wallet.swap-to.title")}
        />
      )}
      {currentStep === SwapFlowSteps.CHOOSE_AMOUNT && (
        <ChooseAmountScreen
          isLoading={assetMetricsLoading}
          asset={assetMetrics?.getAssetMetrics}
          isSubmitting={false}
          onBack={goToPreviousStep}
          cryptoSwapBalanceLabel
          ariaLabel="CALCULATOR"
          availableAmountInFiat={myAsset?.fiatAmount?.major}
          suggestions={PURCHASE_AMOUNT_SUGGESTIONS}
          onClickClose={onClose}
          validateAmount={validateAmount}
          leftCoinImage={selectedAssetSwapFrom.image}
          rightCoinImage={selectedAssetSwapTo?.image}
          onSubmit={(data) => {
            setSelectedAmount(data);
            onChooseAmountComplete(data);
          }}
        />
      )}
      {currentStep === SwapFlowSteps.ORDER_PREVIEW && (
        <BuyOrderPreviewScreen
          feesAmount={fiatFeesAmount}
          swapOrderFlow
          isLoading={quoteSubmittingLoader || coinSwapLoader}
          total={fiatTotalAmount}
          sourceAmount={fiatSourceAmount}
          ariaLabel="ORDERPREVIEW"
          leftCoinImage={selectedAssetSwapFrom.image}
          rightCoinImage={selectedAssetSwapTo?.image}
          sourceCryptoAmount={quoteSourceAmount}
          sourceCurrency={quote?.fiatCurrencyCode}
          destinationAmount={decimalPrecision(quote?.destinationAmount, ORDER_PREVIEW_DECIMAL_PRECISION)}
          destinationCurrency={quote?.destinationCurrencyCode}
          sourceCryptoCurrency={quote?.sourceCurrencyCode}
          onBack={goToPreviousStep}
          onConfirm={onConfirmOrder}
          onCancelOrder={onClose}
          isSubmitting={isSubmitting}
          error={possibleHumblError}
        />
      )}

      {currentStep === SwapFlowSteps.SUCCESS && quoteAssetData?.quote && (
        <PurchaseSuccessScreen
          coin={quoteAssetData.quote?.destinationCurrencyCode!}
          coinName={quoteAssetData.quote?.destinationCurrency!}
          logo={quoteAssetData.asset?.logoImage ?? ""}
          price={destinationValue}
          amount={quoteAssetData.quote?.destinationAmount!}
          transactionId={transactionId}
          title={t("crypto-wallet.swap.order-success.title.order-confirmed")}
          isLoading={getQuoteAssetLoader}
          subTitle={t("crypto-wallet.buy.order-success.message.confirmation-email", { email: user?.email })}
          onClickCta={onClose}
        />
      )}
    </>
  );
};
