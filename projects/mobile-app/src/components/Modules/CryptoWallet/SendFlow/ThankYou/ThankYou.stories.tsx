import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ThankYou, { ThankYouProps } from "components/Modules/CryptoWallet/SendFlow/ThankYou/ThankYou";

export default {
  title: "CryptoWallet/ThankYou",
  component: ThankYou,
  argTypes: {},
} as Meta;

const defaultData: ThankYouProps = {
  currency: "USD",
  value: 50.0,
  email: "useremail@gmail.com",
  transactionID: "0123456789",
  shouldShowViewTransactionButton: true,
};

const Template: Story<ThankYouProps> = (args) => <ThankYou {...args} />;
export const Primary = Template.bind({});
Primary.args = defaultData;

const transferSuccessData: ThankYouProps = {
  currency: "USD",
  value: 50.0,
  email: "useremail@gmail.com",
  transactionID: "0123456789",
  shouldShowViewTransactionButton: true,
  transferSuccess: true,
};

export const transferSuccess = Template.bind({});
transferSuccess.args = transferSuccessData;

const transferSuccessCanadianData: ThankYouProps = {
  currency: "CAD",
  value: 50.0,
  email: "useremail@gmail.com",
  transactionID: "0123456789",
  shouldShowViewTransactionButton: true,
  transferSuccess: true,
};

export const transferSuccessCanadian = Template.bind({});
transferSuccessCanadian.args = transferSuccessCanadianData;

const thankYouCanadianData: ThankYouProps = {
  currency: "CAD",
  value: 50.0,
  email: "useremail@gmail.com",
  transactionID: "0123456789",
  shouldShowViewTransactionButton: true,
  transferSuccess: true,
};

export const thankYouCanadian = Template.bind({});
thankYouCanadian.args = thankYouCanadianData;

const thankYouSingaporeData: ThankYouProps = {
  currency: "SGD",
  value: 50.0,
  email: "useremail@gmail.com",
  transactionID: "0123456789",
  shouldShowViewTransactionButton: true,
  transferSuccess: true,
};

export const thankYouSingapore = Template.bind({});
thankYouSingapore.args = thankYouSingaporeData;
