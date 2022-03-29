import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { EtxInvestmentCard, EtxInvestmentCardProps } from "./EtxInvestmentCard";

export default {
  title: "Pages/Etx/EtxInvestmentCard",
  component: EtxInvestmentCard,
  decorators: [withPadding],
  parameters: {
    storyshots: false,
  },
} as Meta;

const Template: Story<EtxInvestmentCardProps> = (args) => <EtxInvestmentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  historicalTrend: {
    month: 12,
    sixMonth: 14,
    twelveMonth: 15,
  },
  totalInvestment: 1234.1234,
};
