import React, { useMemo, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ChooseAmountScreen, SubmitPayload } from "components/Modules/CryptoWallet/ChooseAmountScreen";
import OrderPreview, { HeaderItem } from "components/Modules/CryptoWallet/SendFlow/OrderPreview";
import { ErrorModal } from "components/ErrorHandling/ErrorModal";
import { WarningIcon } from "assets/icons";
import { presentToast } from "utils/toast";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { Countries } from "utils/stateOptions";
import CurrencyValue from "utils/CurrencyValue/CurrencyValue";
import { Routes, buildPath } from "utils/routes";
import { formatUsingIntl } from "utils/currency";
import { decimalPrecision, ORDER_PREVIEW_DECIMAL_PRECISION } from "utils/decimalPrecision";
import { cryptoToFiat } from "utils/currencyConversion";
import { captureException } from "ErrorLogger";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { getPotentialHumblError, mapErrorCodeToTranslationKey } from "graphql/humblGraphqlError";
import { TransferSuccess } from "./Success/TransferSuccess";
import { CryptoCurrencyItemProps } from "../../components/Modules/CryptoWallet/CryptoCurrencyList";
import {
  AssetBalanceType,
  BankType,
  useConfirmQuoteMutation,
  useGetWalletQuery,
  useStartPayoutQuoteMutation,
} from "../../generated/graphql";
import { ChooseAssetScreen } from "../../components/Modules/CryptoWallet/ChooseAssetScreen";
import { BankListPage } from "../SelectBank/BankListPage";
import { CryptoWithdrawSteps } from "./CryptoWithdrawReducer";
import { useCryptoWithdrawScreenReducer } from "./useCryptoWithdrawScreenReducer";
import { LayerComponentProps } from "components/Layers/common";

// Once backend is able to provide us with fiatPrice this can go away ie price:49.1235...
export interface AssetBalanceTypeWithPrice extends AssetBalanceType {
  price: number;
}

const WYRE_WITHDRAW_DAILY_LIMIT = 150_000;

export const CryptoWithdrawScreen: React.FC<LayerComponentProps<"cryptoWalletWithdrawFlow">> = () => {
  const { t } = useTranslation();
  const { cryptoId } = useParams<Partial<Routes["cryptoWalletWitdraw_Crypto_"]["params"]>>();
  const history = useHistory();
  const {
    availableBalances,
    currentQuote,
    currentStep,
    selectedAsset,
    successResponse,
    goToNextStep,
    goToPreviousStep,
    selectedBankAccount,
    setAvailableBalances,
    setBankAccount,
    setSelectedAmount,
    setSelectedTicker,
    setSelectedAsset,
    setCurrentQuote,
    goToStep,
    setSuccessResponse,
  } = useCryptoWithdrawScreenReducer();

  const withdrawLimitMin = selectedBankAccount.country === Countries.MX ? 50 : 1;
  const location = useLocation();

  const userCurrency = useGetCurrentAccountCurrency();

  const { loading: getWalletQueryLoading } = useGetWalletQuery({
    variables: {
      type: "WITHDRAW",
    },
    onCompleted: (data) => {
      setAvailableBalances(data?.wallet?.assets || []);
    },
  });

  const [startPayoutQuote] = useStartPayoutQuoteMutation();
  const [confirmQuote] = useConfirmQuoteMutation();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [subTitleError, setErrorSubTitle] = useState("");

  const cancelOrder = () => {
    setShowExitModal(true);
  };

  // this can be removed once we have backend price on this asset
  const calculatePriceFromExchange = (exchangeRate: number): number => {
    if (exchangeRate > 0) {
      return 1 / exchangeRate;
    }
    return NaN;
  };

  // once we have backend price we can modify this to simply return the found asset.
  const getAssetFromTicker = (code: string): AssetBalanceTypeWithPrice => {
    // The asset from wallet does not have a price.
    // find the selected asset from the wallet
    const asset: AssetBalanceTypeWithPrice = availableBalances.find(
      (assetBalance: AssetBalanceType) => assetBalance.code === code
    );

    // if it exists set the price otherwise return the asset.
    if (asset?.exchangeRate) {
      const price = calculatePriceFromExchange(asset.exchangeRate);
      return { ...asset, price };
    }
    return asset;
  };

  const onChooseAmountSubmit = async (data: SubmitPayload) => {
    setSelectedAmount(data);
    const fiatAmtString = new CurrencyValue(`${data.fiatAmount}`).format(2); // Pinning to 2 as we are using fiat only here.
    const { maxOption } = data;
    try {
      const quote = await startPayoutQuote({
        variables: {
          sourceCurrencyCode: selectedAsset.code,
          destinationCurrencyCode: selectedAsset.currency,
          destAmount: fiatAmtString,
          bankAccountId: selectedBankAccount.id,
          maxOption,
        },
      });
      if (quote?.data?.startPayoutQuote) {
        trackEvent(EVENTS.BUTTON_CLICK, {
          action: "Submit",
          type: "Withdraw",
          screenName: "Choose Amount",
          cryptoCode: selectedAsset?.code,
          fiatAmount: data?.fiatAmount,
          cryptoAmount: data?.cryptoAmount,
        });
        setCurrentQuote(quote.data.startPayoutQuote);
      }

      goToNextStep();
    } catch (error) {
      presentToast(t("select-crypto-asset.withdraw.error.sub-title"), 2000, "danger");
      captureException(error as Error);
    }
  };

  const confirmOrder = async () => {
    try {
      const confirmationQuoteReturn = await confirmQuote({
        variables: {
          quoteId: currentQuote.quoteId,
        },
      });
      if (confirmationQuoteReturn?.data?.confirmQuote) {
        trackEvent(EVENTS.WITHDRAW_CRYPTO, {
          screenName: "Order Preview",
          assetName: currentQuote?.sourceCurrencyCode,
          assetAmount: currentQuote?.sourceAmount,
          pathName: location?.pathname,
          transactionId: confirmationQuoteReturn.data.confirmQuote?.transactionId,
          status: "Success",
        });

        trackEvent(EVENTS.BUTTON_CLICK, {
          action: "Confirm Order",
          type: "Withdraw",
          screenName: "Order Preview",
          status: "success",
          quoteId: currentQuote.quoteId,
        });
        setSuccessResponse(confirmationQuoteReturn?.data?.confirmQuote);
        setShowErrorModal(false);
      }
    } catch (error) {
      const humblError = error?.graphQLErrors && getPotentialHumblError(error.graphQLErrors);
      trackEvent(EVENTS.WITHDRAW_CRYPTO, {
        screenName: "Order Preview",
        assetName: currentQuote?.sourceCurrencyCode,
        assetAmount: currentQuote?.sourceAmount,
        pathName: location?.pathname,
        status: "Fail",
      });
      trackEvent(EVENTS.BUTTON_CLICK, {
        action: "Confirm Order",
        type: "Withdraw",
        screenName: "Order Preview",
        status: "fail",
      });
      setSuccessResponse("ERROR");
      setErrorSubTitle(
        humblError
          ? t(mapErrorCodeToTranslationKey(humblError.humblErrorCode))
          : t("select-crypto-asset.withdraw.error.sub-title")
      );
      setShowErrorModal(true);
    }
    goToNextStep();
  };

  const cryptoCurrencyItems = useMemo(() => availableBalances.map(({ fiatAmount, amount, logoImage, name, code }: AssetBalanceType) => {
      const cryptoCurrencyItem: CryptoCurrencyItemProps = {
        valueInCrypto: amount,
        valueInFiat: formatUsingIntl(fiatAmount?.major ?? 0.0),
        image: logoImage,
        name,
        tickerCode: `${code}`,
      };
      return cryptoCurrencyItem;
    }), [availableBalances]);

  const generateConfirmationHeaderArray = (
    srcAmount: number,
    srcCurrencyCode: string,
    destAmount: number,
    destCurrencyCode: string
  ): HeaderItem[] => [
      {
        title: t("select-crypto-asset.withdraw.transferring"),
        value: decimalPrecision(srcAmount, ORDER_PREVIEW_DECIMAL_PRECISION),
        currency: srcCurrencyCode,
        titleAriaLabel: "ORDERPREVIEW_YOUARESENDING_LABEL",
        currencyAriaLabel: "ORDERPREVIEW_CRYPTOCURRENCY_LABEL",
      },
      {
        title: t("select-crypto-asset.withdraw.equals"),
        value: formatUsingIntl(destAmount, "standard", destCurrencyCode),
        currency: destCurrencyCode,
        titleAriaLabel: "ORDERPREVIEW_WHICHEQUALS_LABEL",
        currencyAriaLabel: "ORDERPREVIEW_FIATCURRENCY_LABEL",
      },
    ];

  const handleOnBankSelected = (bankAccount: BankType) => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Continue",
      type: "Withdraw",
      screenName: "Transfer to bank",
    });
    trackEvent(EVENTS.WITHDRAW_CRYPTO, {
      screenName: "Transfer to bank",
      pathName: location.pathname,
      bankName: bankAccount.nickname,
      accountNumber: bankAccount.lastFour,
    });
    setBankAccount(bankAccount);
    if (!cryptoId) {
      goToNextStep();
      return;
    }

    const asset = getAssetFromTicker(cryptoId);
    if (asset) {
      setSelectedAsset(asset);
      goToStep(CryptoWithdrawSteps.CHOOSE_AMOUNT);
    } else {
      goToNextStep();
      presentToast(t("select-crypto-asset.withdraw.invalid-asset-selected"), 2000, "danger");
    }
  };

  const goBack = () => {
    history.goBack();
  };

  const getFeesAmount = () =>
    // TODO: use CurrencyValue for calculations here
     cryptoToFiat(currentQuote.sourceFee, currentQuote.exchangeRate);
const getSourceAmount = () =>
    // TODO: use CurrencyValue for calculations here
     currentQuote.sourceAmount - currentQuote.sourceFee;
const getTotalAmount = () =>
    // TODO: use CurrencyValue for calculations here
     currentQuote.destinationAmount + getFeesAmount();
const validateAmount = (amount: number) => {
    const availableAmount = selectedAsset.fiatAmount.major;

    if (availableAmount < amount) {
      return t("crypto-wallet.withdraw.choose-amount.insufficient-balance");
    }

    if (availableAmount >= WYRE_WITHDRAW_DAILY_LIMIT && amount >= WYRE_WITHDRAW_DAILY_LIMIT) {
      return t("crypto-wallet.withdraw.choose-amount.max-limit", {
        dailyLimit: formatUsingIntl(WYRE_WITHDRAW_DAILY_LIMIT, "standard", userCurrency),
      });
    }

    if (amount <= withdrawLimitMin) {
      return t("crypto-wallet.withdraw.choose-amount.min-limit", {
        minimumFiatAmount: formatUsingIntl(withdrawLimitMin, "standard", userCurrency),
      });
    }

    return null;
  };

  return (
    <>
      {currentStep === CryptoWithdrawSteps.SELECT_BANK_ACCOUNT && (
        <BankListPage
          ariaLabel="TRANSFERTOBANK"
          onBankSelected={handleOnBankSelected}
          onClickBack={() => history.replace(buildPath("cryptoWallet"))}
        />
      )}
      {currentStep === CryptoWithdrawSteps.CHOOSE_ASSETS && (
        <ChooseAssetScreen
          ariaLabel="CHOOSEASSET"
          cryptoCurrencyItems={cryptoCurrencyItems}
          loading={getWalletQueryLoading}
          onChooseAsset={({ tickerCode: ticker }) => {
            trackEvent(EVENTS.BUTTON_CLICK, {
              action: "Choose Asset",
              type: "Withdraw",
              screenName: "Choose Asset",
              cryptoCode: ticker,
            });
            setSelectedTicker(ticker);
            const asset = getAssetFromTicker(ticker);
            if (asset) {
              setSelectedAsset(asset);
            }
            goToNextStep();
          }}
          onClickBack={goToPreviousStep}
          onRightClick={goBack}
          title={t("select-crypto-asset.withdraw.title")}
        />
      )}
      {currentStep === CryptoWithdrawSteps.CHOOSE_AMOUNT && (
        <ChooseAmountScreen
          asset={selectedAsset}
          ariaLabel="CALCULATOR"
          suggestions={[{ type: "max" }]}
          isSubmitting={false}
          availableAmountInFiat={selectedAsset?.fiatAmount?.major}
          onBack={goToPreviousStep}
          onClickClose={goBack}
          validateAmount={validateAmount}
          onSubmit={(data) => {
            if (data.fiatAmount > 0) {
              trackEvent(EVENTS.WITHDRAW_CRYPTO, {
                screenName: "Choose Amount Screen",
                pathName: location.pathname,
                assetName: selectedAsset.code,
                assetAmount: data.cryptoAmount,
              });
              onChooseAmountSubmit(data);
            } else {
              presentToast(t("select-crypto-asset.withdraw.transfer-minimum"), 2000, "danger");
            }
          }}
        />
      )}
      {currentStep === CryptoWithdrawSteps.ORDER_PREVIEW && (
        <>
          <OrderPreview
            transferTo={`${selectedBankAccount.nickname} ${selectedBankAccount.lastFour}`}
            amount={formatUsingIntl(currentQuote.destinationAmount, "standard", currentQuote.destinationCurrencyCode)}
            fees={formatUsingIntl(getFeesAmount(), "standard", currentQuote.destinationCurrencyCode)}
            total={formatUsingIntl(getTotalAmount(), "standard", currentQuote.destinationCurrencyCode)}
            headerItems={generateConfirmationHeaderArray(
              getSourceAmount(),
              currentQuote.sourceCurrencyCode,
              currentQuote.destinationAmount,
              currentQuote.destinationCurrencyCode
            )}
            onClickBack={goToPreviousStep}
            ariaLabel="ORDERPREVIEW"
            onClickConfirm={confirmOrder}
            onClickCancel={cancelOrder}
          />
        </>
      )}
      {currentStep === CryptoWithdrawSteps.SUCCESS && (
        <>
          {successResponse !== "ERROR" && (
            <TransferSuccess
              fiatAmount={successResponse.destinationAmount}
              fiatCurrencyCode={successResponse.destinationCurrencyCode}
              cryptoId={currentQuote?.sourceCurrencyCode}
              cryptoAmount={currentQuote?.sourceAmount}
              email={successResponse.email}
              transactionId={successResponse.transactionId}
            />
          )}
          {successResponse === "ERROR" && (
            <ErrorModal
              IconComponent={<img src={WarningIcon} alt="warning icon" />}
              isOpen={showErrorModal}
              secondaryAction={{
                text: t("payment-page.action.cancel"),
                action: goToPreviousStep,
              }}
              title={t("select-crypto-asset.withdraw.error.title")}
              subTitle={subTitleError}
            />
          )}
        </>
      )}
      {showExitModal && (
        <ErrorModal
          ariaLabel="CANCELCONFIRMATION"
          IconComponent={<img src={WarningIcon} alt="warning icon" />}
          isOpen={showExitModal}
          title={t("crypto-wallet.buy.order-preview.exit-modal.title")}
          subTitle={t("crypto-wallet.buy.order-preview.exit-modal.subtitle")}
          secondaryAction={{
            text: t("crypto-wallet.buy.order-preview.exit-modal.cancel-action"),
            action: () => {
              setShowExitModal(false);
            },
          }}
          primaryAction={{
            text: t("crypto-wallet.buy.order-preview.exit-modal.confirm-action"),
            action: () => {
              setShowExitModal(false);
              setSelectedAmount(null);
              history.goBack();
            },
          }}
        />
      )}
    </>
  );
};
