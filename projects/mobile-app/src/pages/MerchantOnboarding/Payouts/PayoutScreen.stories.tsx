import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import { MockedProvider } from "@apollo/client/testing";
import { PayoutScreen, PayoutScreenProps } from "./PayoutScreen";
import moment from "moment-timezone";

export default {
  decorators: [],
  title: "Merchants/Payouts",
  component: PayoutScreen,
  args: {
    nextPayoutDate: 13,
    account: "1234",
  },
} as Meta;

const mocks: any = [];

const Template: Story<PayoutScreenProps> = (args) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <PayoutScreen {...args} />
  </MockedProvider>
);

export const WithPayouts = Template.bind({});
WithPayouts.args = {
  currentBalance: "$49.25 USD",
  payouts: [
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
  ],
};

export const WithPayoutsStripeRestricted = Template.bind({});
WithPayoutsStripeRestricted.args = {
  currentBalance: "$49.25 USD",
  stripeRestricted: true,
  payouts: [
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
  ],
};

export const WithPayoutsStripeRestrictedSoon = Template.bind({});
WithPayoutsStripeRestrictedSoon.args = {
  currentBalance: "$49.25 USD",
  stripeRestrictedSoon: true,
  payouts: [
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
  ],
};

export const WithoutPayouts = Template.bind({});
WithoutPayouts.args = {
  loading: false,
  currentBalance: "$49.25 USD",
  payouts: [],
};
export const Loading = Template.bind({});
Loading.args = {
  currentBalance: "$49.25 USD",
  loading: true,
  payouts: [
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
    { amount: "$500 USD", date: moment("2021-04-16T08:00:00").tz("America/Los_Angeles").toDate() },
  ],
};
