import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Rating, RatingProps } from "./Rating";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/Rating/Input",
  component: Rating,
  argTypes: {},
  decorators: [withPadding],
} as Meta;

const Template: Story<RatingProps> = (args) => <Rating {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
