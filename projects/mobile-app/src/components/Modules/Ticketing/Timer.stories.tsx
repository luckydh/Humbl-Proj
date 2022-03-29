import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";

import Timer, { TimerProps } from "./Timer";

export default {
  decorators: [withPadding, withDesign],
  title: "Ticketing/Timer",
  component: Timer,
} as Meta;

const Template: Story<TimerProps> = (args) => <Timer {...args} />;

const onDone = () => {};

export const Primary = Template.bind({});
Primary.args = {
  startingTime: 30,
  onExpired: onDone,
};
export const ExpiredTimer = Template.bind({});
ExpiredTimer.args = {
  startingTime: 0,
  onExpired: onDone,
};
