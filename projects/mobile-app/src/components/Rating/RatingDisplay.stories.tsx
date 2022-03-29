import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { RatingDisplay, RatingDisplayProps } from "./Rating";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/Rating/Display",
  component: RatingDisplay,
  argTypes: {
    rating: {
      control: {
        type: "range",
        min: 0,
        max: 5,
        step: 0.1,
      },
    },
  },
  decorators: [withPadding],
} as Meta;

const Template: Story<RatingDisplayProps> = (args) => <RatingDisplay {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  rating: 1,
};
