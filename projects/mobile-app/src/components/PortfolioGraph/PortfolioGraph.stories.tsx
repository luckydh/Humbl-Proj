import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";

import { PortfolioGraph, PortfolioGraphProps } from "./PortfolioGraph";
import withPadding from "../../utils/withPadding";
import { MOCK } from "../DigitalWallet/mock";

export default {
  title: "Components/PortfolioGraph",
  component: PortfolioGraph,
  args: {
    setGraphActive: action("setGraphActive"),
  },
  decorators: [withPadding],
  parameters: {
    storyshots: false,
  },
} as Meta;

const Template: Story<PortfolioGraphProps> = (args) => <PortfolioGraph {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: MOCK,
};

export const Expanded = Template.bind({});
Expanded.args = {
  data: MOCK,
  isGraphActive: true,
};

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
