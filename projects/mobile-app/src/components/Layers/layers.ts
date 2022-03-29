import React from "react";
import { LayerComponentProps } from "./common";

import { AddCardFlow } from "pages/CardAdd/AddCardFlow";
import { BuyingFlowContainer as CryptoBuyingFlow } from "pages/CryptoWallet/BuyingFlow/BuyingFlowContainer";
import { CryptoWithdrawScreen as CryptoWithdrawFlow } from "pages/CryptoWithdraw/CryptoWithdrawScreen";
import { SwapFlowContainer } from "pages/CryptoWallet/SwapFlow/SwapFlowContainer";
import PlaidOAuth from "pages/PlaidOAuth/PlaidOAuth";
import { KYC } from "pages/CryptoWallet/KYCFlow/KYC";
import { PaymentMethodType } from "generated/graphql";
import { PlaidWrapperProps } from "components/Plaid/PlaidWrapper";
import { FlowType, SendFlowContainer } from "pages/CryptoWallet/SendFlow/SendFlowContainer";

export type LayerId = keyof Layers;
export type HasProps<T> = T extends { props: unknown } ? T["props"] : undefined;
export type HasPropsArray<T> = T extends { props: unknown } ? [T["props"]] : [undefined?];

export type Layers = {
  addCardFlow: {
    id: "addCardFlow";
    props: { onComplete?: (newPaymentMethod: PaymentMethodType) => void };
  };
  cryptoWalletBuyingFlow: {
    id: "cryptoWalletBuyingFlow";
    props: { currency?: string; onComplete?: (payload: unknown) => void };
  };
  cryptoWalletWithdrawFlow: {
    id: "cryptoWalletWithdrawFlow";
    props: { cryptoId?: string };
  };
  cryptoWalletSwap: {
    id: "cryptoWalletSwap";
  };
  updateKYC: {
    id: "updateKYC";
  };
  cryptoWalletSendFlow: {
    id: "cryptoWalletSendFlow";
    props: { flowType?: FlowType };
  };
  plaidOAuth: {
    id: "plaidOAuth";
    props: {
      closeExistingPlaid?: () => void;
      plaidOptions?: Omit<PlaidWrapperProps, "children">;
    };
  };
};

type LayersRecord<K extends LayerId> = {
  [P in K]: React.FC<LayerComponentProps<P>>;
};

export const layers: LayersRecord<LayerId> = {
  addCardFlow: AddCardFlow,
  cryptoWalletBuyingFlow: CryptoBuyingFlow,
  cryptoWalletSwap: SwapFlowContainer,
  cryptoWalletWithdrawFlow: CryptoWithdrawFlow,
  plaidOAuth: PlaidOAuth,
  updateKYC: KYC,
  cryptoWalletSendFlow: SendFlowContainer,
};
