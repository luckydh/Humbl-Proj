import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BuyOrderPreviewScreen, BuyOrderPreviewScreenProps } from "./BuyOrderPreviewScreen";

export default {
  title: "CryptoWallet/Screens/BuyOrderPreview",
  component: BuyOrderPreviewScreen,
  argTypes: {},
} as Meta;

const defaultArgs = {
  total: "$53.99",
  feesAmount: "$3.99",
  sourceAmount: "$50.00",
  sourceCurrency: "USD",
  destinationAmount: "0.0001234",
  destinationCurrency: "BTC",
  exchangeRate: "$49,292.34",
  paymentMethodName: "USD Coin",
};

const Template: Story<BuyOrderPreviewScreenProps> = (args) => <BuyOrderPreviewScreen {...args} />;

export const Primary = Template.bind({});

Primary.args = defaultArgs;

export const Loading = Template.bind({});

Loading.args = {
  isLoading: true,
};

export const Submitting = Template.bind({});

Submitting.args = {
  ...defaultArgs,
  isSubmitting: true,
};

export const WithError = Template.bind({});

WithError.args = {
  ...defaultArgs,
  error: { humblErrorCode: "CARD_ISSUER_DECLINED" },
};

export const WithFallbackErrorMessage = Template.bind({});

WithFallbackErrorMessage.args = {
  ...defaultArgs,
  error: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    humblErrorCode: "unknown error code",
  },
};
