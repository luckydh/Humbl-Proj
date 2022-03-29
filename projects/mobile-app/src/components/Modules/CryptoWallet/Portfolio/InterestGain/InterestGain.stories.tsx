import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import InterestGain, { InterestGainProps } from "./index";
import withPadding from "utils/withPadding";
import { CURRENCY_LIST } from "./mock";
import { MockedProvider } from "@apollo/client/testing";

export default {
  decorators: [withDesign, withPadding],
  title: "CryptoWallet/Components/InterestGain",
  component: InterestGain,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=5088%3A65779",
    },
  },
} as Meta;

const Template: Story<InterestGainProps> = (args) => (
  <MockedProvider>
    <InterestGain {...args} />
  </MockedProvider>
);

export const InterestSingleAsset = Template.bind({});
InterestSingleAsset.args = {
  totalInterest: 50,
  cryptoCurrencylist: CURRENCY_LIST.slice(0, 1),
};

export const InterestMultipleAssets = Template.bind({});
InterestMultipleAssets.args = {
  totalInterest: 325.38,
  cryptoCurrencylist: CURRENCY_LIST,
};

export const InterestSkeleton = Template.bind({});
InterestSkeleton.args = {
  isLoading: true,
};
