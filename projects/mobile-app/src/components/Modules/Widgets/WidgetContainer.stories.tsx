import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { WidgetContainer } from "./WidgetContainer";
import withPadding from "utils/withPadding";

export default {
  title: "Components/WidgetContainer",
  component: WidgetContainer,
  parameters: {},
  argTypes: {
    children: { control: "" },
  },
  decorators: [withPadding],
} as Meta;

const Template: Story = (args) => <WidgetContainer ariaLabel="WIDGET_CONTAINER" {...args} />;

export const WithText = Template.bind({});
WithText.args = {
  children: "This is some text",
};
export const WithHtml = Template.bind({});
WithHtml.args = {
  children: <div className="p-3 bg-blue-lightest w-full flex">This is html</div>,
};
export const WithHtmlAndPadding = Template.bind({});
WithHtmlAndPadding.args = {
  children: <div className="m-6 w-full flex">This is html</div>,
};
export const ErrorExample = Template.bind({});
ErrorExample.args = {
  children: <div className="mx-6 my-10 text-sm text-black">Oops - We had a problem loading this data...</div>,
};
