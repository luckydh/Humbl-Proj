import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BaseCheckbox, IonCheckboxProps } from "./Checkbox";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/Checkbox",
  component: BaseCheckbox,
  decorators: [withPadding],
} as Meta;

const Template: Story<IonCheckboxProps> = (args) => <BaseCheckbox {...args} />;

export const Small = Template.bind({});

Small.args = {
  size: "small",
};

export const Default = Template.bind({});

Default.args = {
  size: "default",
};

export const Large = Template.bind({});

Large.args = {
  size: "large",
};
