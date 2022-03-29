import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SendOrderPreview, { SendOrderPreviewProps } from "./SendOrderPreview";
import { MockedProvider } from "@apollo/client/testing";
import { QuoteType } from "generated/graphql";

export default {
  title: "CryptoWallet/Send/SendOrderPreview",
  component: SendOrderPreview,
  argTypes: {},
} as Meta;

const sampleQuote: QuoteType = {
  destination: "Qqwertyuiooodfghj",
  notes: "Lorem Content",
  fiatAmount: 50,
  fiatFees: 3,
  fiatCurrencyCode: "USD",
  sourceCurrency: "BTC",
  sourceAmount: (0.001364).toString(),
  sourceCurrencyCode: "BTC",
};
const defaultArgs: SendOrderPreviewProps = {
  quote: sampleQuote,
  isLoadingQuote: false,
  isLoadingConfirmation: false,
  error: undefined,
  onClickBack: () => {},
  onConfirmOrder: () => {},
};

const Template: Story<SendOrderPreviewProps> = (args) => (
  <MockedProvider mocks={[]} addTypename={false}>
    <SendOrderPreview
      quote={args.quote}
      error={args.error}
      isLoadingQuote={args.isLoadingQuote}
      isLoadingConfirmation={args.isLoadingConfirmation}
      onConfirmOrder={() => {}}
      onClickBack={() => {}}
    />
  </MockedProvider>
);
export const Primary = Template.bind({});
Primary.args = defaultArgs;

export const Loading = Template.bind({});
Loading.args = { ...defaultArgs, isLoadingQuote: true };

export const NoFees = Template.bind({});
NoFees.args = {
  ...defaultArgs,
  quote: {
    isInternal: true,
    destination: "Qqwertyuiooodfghj",
    notes: "Lorem Content",
    fiatAmount: 50,
    fiatFees: 0,
    fiatCurrencyCode: "USD",
    sourceCurrency: "BTC",
    sourceAmount: (0.001364).toString(),
    sourceCurrencyCode: "BTC",
  },
};
