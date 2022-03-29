import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Input, { InputProps } from "./Input";
import withPadding from "../../utils/withPadding";
import CardPlaceHolder from "../../assets/svgs/credit-card-placeholder.svg";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {},
  decorators: [withPadding],
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: "Placeholder Text",
};

export const WithData = Template.bind({});
WithData.args = {
  value: "I'm fine",
};

export const WithAppend = Template.bind({});
WithAppend.args = {
  append: <>$</>,
  placeholder: "Placeholder Text",
};

export const WithAppendImage = Template.bind({});
WithAppendImage.args = {
  append: <img src={CardPlaceHolder} alt="Card Placeholder" />,
  placeholder: "Placeholder Text",
};

export const WithPrepend = Template.bind({});
WithPrepend.args = {
  prepend: <>$</>,
  value: "Prepend",
  placeholder: "Placeholder Text",
};

export const WithPrependImage = Template.bind({});
WithPrependImage.args = {
  prepend: <img src={CardPlaceHolder} alt="Card Placeholder" />,
  value: "Prepend",
  placeholder: "Placeholder Text",
};
export const WithError = Template.bind({});
WithError.args = {
  hasError: true,
  value: "I have an error",
};
