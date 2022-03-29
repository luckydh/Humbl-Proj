import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { TextArea, TextAreaProps } from "./TextArea";
import withPadding from "utils/withPadding";

export default {
  title: "Components/TextArea",
  component: TextArea,
  argTypes: {},
  decorators: [withPadding],
} as Meta;

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: "Placeholder Text",
};
