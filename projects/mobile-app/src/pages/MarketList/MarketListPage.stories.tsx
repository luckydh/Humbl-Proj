import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MarketListPage } from "./MarketListPage";
import { MockedProvider } from "@apollo/client/testing";
import { MarketListPageMocks } from "./MarketListPage.mocks";

export default {
  title: "Cryptowallet/Screens/Market List Page",
  component: MarketListPage,
} as Meta;

const Template: Story = () => (
  <MockedProvider mocks={MarketListPageMocks()} addTypename={false}>
    <MarketListPage title="STORY_BOOK" />
  </MockedProvider>
);

export const Example = Template.bind({});
Example.args = {};
