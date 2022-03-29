import React from "react";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withDesign } from "storybook-addon-designs";
import { WalletBalanceHistoryGraph, WalletBalanceHistoryGraphProps } from "./WalletBalanceHistoryGraph";
import { MOCK as GraphData } from "components/DigitalWallet/mock";
import { MockedProvider } from "@apollo/client/testing";
import createApolloMock from "generated/createApolloMock";
import { GetWalletBalanceHistoryDocument } from "generated/graphql";
import { MOCK } from "pages/CryptoWallet/Portfolio/mock";

export default {
  title: "Widgets/WalletBalanceHistoryGraph",
  component: WalletBalanceHistoryGraph,
  args: {
    setGraphActive: action("setGraphActive"),
  },
  decorators: [withDesign],
} as Meta;

const getWalletBalanceHistoryMock = createApolloMock(
  GetWalletBalanceHistoryDocument,
  { currency: "USD" },
  {
    data: {
      getWalletBalanceHistory: {
        history: MOCK,
      },
    },
  }
);

const Template: Story<WalletBalanceHistoryGraphProps & { mocks: any }> = ({ mocks, ...args }) => (
  <MockedProvider mocks={mocks ?? [getWalletBalanceHistoryMock]}>
    <WalletBalanceHistoryGraph {...args} />
  </MockedProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  data: GraphData,
};
Primary.parameters = {
  // d3 errors. Remove when resolved.
  storyshots: false,
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=5679%3A69288",
  },
};

export const Expanded = Template.bind({});
Expanded.args = {
  data: GraphData,
};
Expanded.parameters = {
  storyshots: false,
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=5642%3A75501",
  },
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  isLoading: true,
};

// TODO: Frak look into this PLEASE!!!!!!
export const HasError = Template.bind({});
HasError.args = {
  error: {
    message: "There was an issue with your request",
    graphQLErrors: [],
    clientErrors: [],
    networkError: null,
    extraInfo: null,
    name: "error",
  },
};
HasError.parameters = {
  storyshots: false,
};

export const ZeroBalance = Template.bind({});
ZeroBalance.args = {
  data: undefined,
};

ZeroBalance.parameters = {
  // d3 errors. Remove when resolved.
  storyshots: false,
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=5679%3A69288",
  },
};
