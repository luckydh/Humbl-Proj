import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { ChartCard, ChartCardProps, Heading, Price, ChartCardEmpty } from "./ChartCard";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/ChartCard",
  component: ChartCard,
  argTypes: {},
  decorators: [withPadding],
} as Meta;

const Template: Story<ChartCardProps> = (args) => (
  <ChartCard {...args}>
    <Heading>Total Balance</Heading>
  </ChartCard>
);

const EmptyTemplate: Story<ChartCardProps> = (args) => (
  <ChartCardEmpty {...args}>
    <Heading>Wallet Balance</Heading>
    <Price value={100} />
  </ChartCardEmpty>
);

export const Primary = Template.bind({});
Primary.args = {
  height: 100,
};
// TODO This needs to be removed. Need to find out why test is failing
Primary.parameters = {
  storyshots: false,
};

export const FixedSize = Template.bind({});
FixedSize.args = {
  height: 100,
  width: 200,
};
// TODO This needs to be removed. Need to find out why test is failing
FixedSize.parameters = {
  storyshots: false,
};

export const Empty = EmptyTemplate.bind({});
Empty.args = {};
Empty.parameters = {
  storyshots: false,
};
