import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { InterestCard, InterestCardProps } from "./InterestCard";
import withPadding from "../../utils/withPadding";
import { RocketIcon } from "../../assets/icons";

export default {
  title: "Components/InterestCard",
  component: InterestCard,
  args: {
    src: RocketIcon,
    heading: "Want to earn interest?",
    content: "Gain interest by buying USDC, BTC, and ETH.",
  },
  decorators: [withPadding],
} as Meta;

const Template: Story<InterestCardProps> = (args) => <InterestCard {...args} />;
export const Primary = Template.bind({});
