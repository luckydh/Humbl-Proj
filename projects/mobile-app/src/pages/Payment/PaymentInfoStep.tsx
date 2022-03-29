import React, { useEffect, useMemo, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useHistory } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { AccountType, PaymentMethodType, useGetMyPaymentMethodsQuery } from "generated/graphql";
import { Avatar, ProfileAvatar } from "components/Avatar/Avatar";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { Button } from "components/Button/Button";
import { Calculator } from "components/Calculator/Calculator";
import { Picker } from "components/Picker/Picker";
import { CurrencyInput } from "./CurrencyInput";
import { formatCurrency, getCurrencySymbol } from "utils/currency";
import { Message } from "components/Message/Message";
import { chevronDown } from "ionicons/icons";
import { PaymentMethodSelector } from "components/PaymentMethodSelector";

export interface PaymentInfo {
  tipAmount: number;
  tipPercentage: TipPercentageOption | null;
  total: number;
  amount: number;
  paymentMethod: PaymentMethodType;
}

interface Props {
  account: AccountType;
  onComplete: (data: PaymentInfo) => void;
  initialData?: Omit<PaymentInfo, "total">;
  currency: string;
}

type CalculatorTarget = "tip" | "amount" | null;
type TipPercentageOption = number | "custom" | null;

type HistoryState = {
  amount: number;
  tipAmount: number;
  tipPercentage: TipPercentageOption;
};

const TIP_PERCENTAGES = [5, 10, 15];

const calcTipPercentage = (amount: number, percentage: number) => Math.floor((percentage / 100) * amount);

export const PaymentInfoStep: React.FC<Props> = ({ account, onComplete, initialData, currency }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory<HistoryState>();

  const { data, loading } = useGetMyPaymentMethodsQuery({
    fetchPolicy: "cache-and-network",
  });

  const [amount, setAmount] = useState(initialData?.amount ?? 0);
  const [amountError, setAmountError] = useState(false);
  const [noCardSelectedError, setCardSelectedError] = useState(false);

  const [isTipPickerOpen, setIsTipPickerOpen] = useState(false);

  const resetCalculator = useRef<(value: string) => void>(() => {});

  const [selectedCard, setSelectedCard] = useState<PaymentMethodType | undefined>(initialData?.paymentMethod);

  const [tipAmount, setTipAmount] = useState(initialData?.tipAmount ?? 0);
  const [tipPercentage, setTipPercentage] = useState<TipPercentageOption | null>(initialData?.tipPercentage ?? null);

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorTarget, setCalculatorTarget] = useState<CalculatorTarget>("amount");
  const [currentPageState] = useState<HistoryState>(history.location.state);

  useEffect(() => {
    if (!selectedCard) {
      setSelectedCard(data?.paymentMethods?.[0]);
    }
  }, [selectedCard, data]);

  useEffect(() => {
    if (currentPageState) {
      setAmount(currentPageState?.amount);
      setTipAmount(currentPageState?.tipAmount);
      setTipPercentage(currentPageState?.tipPercentage);
    }
  }, [currentPageState]);

  const handleClickPay = () => {
    if (amount === 0) {
      setAmountError(true);
      return;
    }

    // If user attempts to continue without having a card, show error
    if (!selectedCard) {
      setCardSelectedError(true);
      return;
    }

    onComplete({
      amount,
      tipAmount,
      tipPercentage,
      total: amount + tipAmount,
      paymentMethod: selectedCard!,
    });
  };

  const handleSelectCard = (card: PaymentMethodType) => {
    // User selected a card, set error false.
    setCardSelectedError(false);
    setSelectedCard(card);
  };

  const handleClickInput = (target: CalculatorTarget) => () => {
    const valueToreset = target === "amount" ? amount : tipAmount;
    resetCalculator.current(`${valueToreset}`);
    setAmountError(false);
    setIsCalculatorOpen(true);
    setCalculatorTarget(target);
  };

  const handleChangeCalculatorValue = (newValue: string) => {
    const value = newValue === "" ? 0 : Number(newValue);

    if (calculatorTarget === "tip") {
      setTipAmount(value);
    }

    if (calculatorTarget === "amount") {
      setAmount(value);
      if (tipPercentage !== "custom") {
        setTipAmount(0);
        setTipPercentage(null);
      }
    }
  };

  const handleSubmitCalculatorValue = () => {
    setCalculatorTarget(null);
    setIsCalculatorOpen(false);
    setPageState();
  };

  const handleChangeTipAmount = (percentage: TipPercentageOption) => {
    if (percentage === "custom") {
      setTipAmount(0);
      setTipPercentage("custom");
      setIsCalculatorOpen(true);
      setCalculatorTarget("tip");
      setPageState();
      return;
    }

    setTipPercentage(percentage);
    const calculatedTipPercentage: number = calcTipPercentage(amount, percentage ?? 0);
    setTipAmount(calculatedTipPercentage);
    setPageState(percentage, calculatedTipPercentage);
  };

  const setPageState = (percentage: TipPercentageOption = tipPercentage, calculatedTip: number = tipAmount) => {
    history.replace(pathname, {
      amount,
      tipPercentage: percentage,
      tipAmount: calculatedTip,
    });
  };

  const handleOpenTipPicker = () => {
    setIsTipPickerOpen(true);
    setCalculatorTarget(null);
    setIsCalculatorOpen(false);
  };

  const handleCloseTipPicker = () => {
    setIsTipPickerOpen(false);
  };

  const handleResetTipPicker = () => {
    setTipAmount(0);
    setTipPercentage(null);
    setIsTipPickerOpen(false);
    setPageState();
  };

  const currencySymbol = getCurrencySymbol(currency);

  const tipAmountOptions = useMemo(() => TIP_PERCENTAGES.map((percentage) => {
      const tipValue = calcTipPercentage(amount, percentage);
      return {
        value: percentage,
        label: `${percentage}% (${currencySymbol}${formatCurrency(tipValue)})`,
      };
    }), [amount, currencySymbol]);

  const renderTipButtonText = () => {
    if (tipPercentage === "custom") {
      return "Custom";
    }

    if (typeof tipPercentage === "number") {
      return `${tipPercentage}%`;
    }

    return t("payment-page.action.add-tip");
  };

  return (
    <LayoutModal title={t("page-profile-view-merchant.button.pay-merchant")}>
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col flex-grow h-full">
          {isCalculatorOpen ? (
            <div className="flex mb-6 items-center">
              <Avatar size="small" src={account?.image} />
              <div className="ml-3">
                <h1 className="font-bold text-xl leading-4 text-white">{account?.displayName}</h1>
                <p className="text-lg">@{account?.userName}</p>
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <ProfileAvatar
                size="medium"
                username={account?.userName}
                src={account?.image}
                name={account?.displayName}
              />
            </div>
          )}
          <div className="mb-4 mt-4">
            <CurrencyInput
              text={formatCurrency(amount)}
              prepend={currencySymbol}
              append={currency}
              focused={calculatorTarget === "amount"}
              disabled={amount === 0}
              onClick={handleClickInput("amount")}
              data-testid="amount-input"
            />
            {amountError && (
              <div className="mt-2">
                <Message variant="error">{t("payment-page.error.invalid-amount")}</Message>
              </div>
            )}
          </div>
          <div className="mb-2 flex">
            <CurrencyInput
              text={formatCurrency(tipAmount)}
              prepend={currencySymbol}
              disabled={tipAmount <= 0}
              focused={calculatorTarget === "tip"}
              data-testid="tip-input"
              onClick={() => {
                if (tipPercentage === "custom") {
                  handleClickInput("tip")();
                }
              }}
            />
            <button
              type="button"
              style={{ height: 60 }}
              onClick={handleOpenTipPicker}
              className="w-24 flex flex-col items-center justify-center rounded-lg py-2 px-2 ml-2 select-none outline-none bg-blue-dark uppercase disabled:opacity-50 text-white">
              <span className="text-sm font-medium">{renderTipButtonText()}</span>
              <IonIcon icon={chevronDown} />
            </button>
          </div>
          <div className="my-6">
            <h5 className="text-center text-xl text-white font-semibold uppercase">
              {t("payment-page.message.total")}
            </h5>
            <h1 className="text-center text-white text-4xl">
              {currencySymbol}
              {formatCurrency(amount + tipAmount)}
            </h1>
          </div>
          {!isCalculatorOpen && (
            <div className="flex flex-col">
              <PaymentMethodSelector
                loading={loading}
                useLegacyPaymentMethodScreen={true}
                redirectTo={pathname}
                onSelect={handleSelectCard}
                paymentMethods={data?.paymentMethods}
                selectedPaymentMethod={selectedCard}
              />
              {noCardSelectedError && (
                <div className="mt-2">
                  <Message variant="error">{t("payment-page.card-selection.error.select-a-card")}</Message>
                </div>
              )}
              <div className="py-4 flex justify-center">
                <Button type="button" onClick={handleClickPay}>
                  {t("payment-page.action.pay")}
                </Button>
              </div>
            </div>
          )}
          {isCalculatorOpen && (
            <div className="pb-6">
              <Calculator
                limit={1000000000}
                data-testid="calculator"
                resetRef={resetCalculator}
                onSubmit={handleSubmitCalculatorValue}
                onChange={handleChangeCalculatorValue}
              />
            </div>
          )}
        </div>
      </div>
      <Picker
        title={t("payment-page.action.add-tip")}
        open={isTipPickerOpen}
        onClose={handleCloseTipPicker}
        value={tipPercentage}
        onChange={handleChangeTipAmount}
        closeOnClickOutside
        showResetButton
        showCancelButton
        resetButtonText={t("payment-page.action.remove-tip")}
        cancelButtonText={t("payment-page.action.cancel")}
        onReset={handleResetTipPicker}
        onCancel={handleCloseTipPicker}>
        {tipAmountOptions.map((option) => (
          <Picker.Item key={option.label} value={option.value} label={option.label} />
        ))}
        <Picker.Item value="custom" label={t("payment-page.message.custom-amount")} />
      </Picker>
    </LayoutModal>
  );
};

export default PaymentInfoStep;
