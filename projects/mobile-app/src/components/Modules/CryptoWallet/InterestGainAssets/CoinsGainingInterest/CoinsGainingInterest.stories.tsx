import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { CoinsGainingInterest, CoinsGainingInterestProps } from "./CoinsGainingInterest";
import { withDesign } from "storybook-addon-designs";
import { CoinGainingInterestData } from "./mock";
import { MockedProvider } from "@apollo/client/testing";
import withPadding from "utils/withPadding";

export default {
  decorators: [withDesign, withPadding],
  title: "CryptoWallet/Components/CoinsGainingInterest",
  component: CoinsGainingInterest,
  argTypes: {},
  parameters: {
    storyshots: false,
  },
} as Meta;

const Template: Story<CoinsGainingInterestProps> = (args) => (
  <MockedProvider>
    <CoinsGainingInterest {...args} />
  </MockedProvider>
);

export const Primary = Template.bind({});

Primary.args = {
  totalInterestGained: 0.0012767898765,
  assetDataObject: CoinGainingInterestData,
  frontCardTitle: "Total Interest Gained",
  frontCardSubTitle: "You are currently gaining interest from BTC, ETH and USDC.",
};

export const ZeroInterest = Template.bind({});

ZeroInterest.args = {
  totalInterestGained: 0,
  assetDataObject: {},
  frontCardTitle: "Total Interest Gained",
  frontCardSubTitle: "Amount will reflect once coins start earning interest",
};
