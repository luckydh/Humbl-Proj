import { useRecoilValue } from "recoil";
import { useLayerProps } from "components/Layers/hooks";
import { buyingFlowAmountState } from "./atoms";

export function useBuyingFlowDestinationCurrency() {
  const layerProps = useLayerProps("cryptoWalletBuyingFlow");
  const amountState = useRecoilValue(buyingFlowAmountState);
  return layerProps?.currency ?? amountState.destinationCurrencyCode;
}
