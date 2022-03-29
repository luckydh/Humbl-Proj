import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";

import { CoinInfoGraph, CoinInfoGraphProps } from "./CoinInfoGraph";
import withPadding from "../../utils/withPadding";
import { LIMITED_HISTORY_MOCK, MOCK } from "../DigitalWallet/mock";

export default {
  title: "Components/CoinInfoGraph",
  component: CoinInfoGraph,
  args: {
    setGraphActive: action("setGraphActive"),
  },
  decorators: [withPadding],
  parameters: {
    storyshots: false,
  },
} as Meta;

const Template: Story<CoinInfoGraphProps> = (args) => <CoinInfoGraph {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: MOCK,
};

export const Expanded = Template.bind({});
Expanded.args = {
  data: MOCK,
  isGraphActive: true,
};

export const LimitedHistory = Template.bind({});
LimitedHistory.args = {
  data: LIMITED_HISTORY_MOCK,
};
