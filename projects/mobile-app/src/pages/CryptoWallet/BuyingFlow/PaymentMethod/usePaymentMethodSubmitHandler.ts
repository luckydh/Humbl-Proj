import { PurchasePayload } from "./PaymentMethodScreen";
import { BuyingFlowPaymentMethodType } from "../sharedTypes";
import {
  useStartQuoteMutation,
  useCreateCardOrderReservationMutation,
  useStartAchPurchaseQuoteMutation,
  PaymentMethodCategory,
} from "generated/graphql";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { buyingFlowAmountState, buyingFlowOrderState } from "../atoms";

/**
 * Hook to get the submit handler and control states for the payment screen in buying flow.
 * The handler decides to call Order or Swap mutations based on selected payment method type.
 *
 * @param userCurrency The currency from user's account.
 * @param destinationCurrency The currency the user wants to buy/swap.
 */
export function usePaymentMethodSubmitHandler(userCurrency: string) {
  const setOrderState = useSetRecoilState(buyingFlowOrderState);
  const {
    destinationCryptoAmount: cryptoDestinationAmount,
    destinationFiatAmount: fiatDestinationAmount,
    destinationCurrencyCode = "",
  } = useRecoilValue(buyingFlowAmountState);

  const [startQuote, { error: quoteError, loading: quoteSubmitting }] = useStartQuoteMutation();
  const [startAchQuote, { error: achQuoteError, loading: achQuoteSubmitting }] = useStartAchPurchaseQuoteMutation();

  const [createCardOrderReservation, { error: orderError, loading: orderSubmitting }] =
    useCreateCardOrderReservationMutation();

  const handlePaymentMethodSubmit = async (payload: PurchasePayload) => {
    if (payload.type === PaymentMethodCategory.Card) {
      const response = await createCardOrderReservation({
        variables: {
          sourceAmount: String(fiatDestinationAmount),
          sourceCurrency: userCurrency,
          destinationCurrency: destinationCurrencyCode,
        },
      });

      setOrderState({
        reservationId: response.data?.createCardOrderReservation?.reservationId,
        paymentMethodId: payload.paymentMethodId,
        cvvConfirmation: payload.cvvConfirmation,
        paymentMethodType: payload.type,
      });
    }

    if (payload.type === BuyingFlowPaymentMethodType.Asset) {
      const response = await startQuote({
        variables: {
          destAmount: cryptoDestinationAmount!,
          sourceCurrencyCode: payload.assetCode!,
          destinationCurrencyCode,
        },
      });

      setOrderState({
        paymentMethodType: payload.type,
        quoteId: response.data?.startQuote?.quoteId,
      });
    }

    if (payload.type === PaymentMethodCategory.Ach) {
      const response = await startAchQuote({
        variables: {
          destAmount: cryptoDestinationAmount!,
          sourceCurrencyCode: destinationCurrencyCode,
          destinationCurrencyCode,
          paymentMethodId: payload.paymentMethodId!,
        },
      });

      setOrderState({
        paymentMethodType: payload.type,
        quoteId: response.data?.startACHPurchaseQuote?.quoteId,
      });
    }
  };

  return {
    handlePaymentMethodSubmit,
    error: orderError || quoteError || achQuoteError,
    isSubmitting: orderSubmitting || quoteSubmitting || achQuoteSubmitting,
  };
}
