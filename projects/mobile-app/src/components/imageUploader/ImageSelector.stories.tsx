import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import withPadding from "../../utils/withPadding";
import ImageEditSelector, { ImageEditSelectorProps } from "./ImageSelector";

export default {
  title: "Components/ImageSelector",
  component: ImageEditSelector,
  argTypes: {},
  decorators: [withPadding],
} as Meta;

const Template: Story<ImageEditSelectorProps> = (args) => <ImageEditSelector {...args} />;

export const Primary = Template.bind({});

export const WithImage = Template.bind({});
WithImage.args = {
  image: "https://place-hold.it/300x500",
};
