import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Banner, { IBannerProps } from "./Banner";
import withPadding from "utils/withPadding";
import { CreditCardIcon, InfoIconDark } from "assets/icons";

export default {
  title: "components/Banner",
  component: Banner,
  decorators: [withPadding],
} as Meta;

const Template: Story<IBannerProps> = (args) => <Banner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "Some Nifty Sample Text goes here",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  size: "fill",
  text: "Some Nifty Sample Text goes here",
};

export const White = Template.bind({});
White.args = {
  bgColor: "white",
  leftIcon: <img src={CreditCardIcon} alt="foo" />,
  rightIcon: <img src={InfoIconDark} alt="foo" />,
  text: "Some Nifty Sample Text goes here",
  size: "fill",
};

export const WhiteRegularFont = Template.bind({});
WhiteRegularFont.args = {
  bgColor: "white",
  leftIcon: <img src={CreditCardIcon} alt="foo" />,
  rightIcon: <img src={InfoIconDark} alt="foo" />,
  text: "Some Nifty Sample Text goes here",
  size: "fill",
  fontSize: "regular",
};

export const WhiteNoRight = Template.bind({});
WhiteNoRight.args = {
  bgColor: "white",
  leftIcon: <img src={CreditCardIcon} alt="foo" />,
  text: "Some Nifty Sample Text goes here",
  size: "fill",
};

export const WhiteNoLeft = Template.bind({});
WhiteNoLeft.args = {
  bgColor: "white",
  rightIcon: <img src={InfoIconDark} alt="foo" />,
  text: "Some Nifty Sample Text goes here",
  size: "fill",
};
