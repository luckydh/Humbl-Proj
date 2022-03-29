import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "../../utils/withPadding";
import { Alert, AlertProps } from "./Alert";

import clockIcon from "../../assets/svgs/clock.svg";
import WarningIcon from "../../assets/svgs/WarningIcon";

export default {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/proto/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=1503%3A23675&scaling=scale-down&page-id=1503%3A23241",
    },
  },
  decorators: [withPadding, withDesign],
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: "This is an Alert!",
  message: "And you should pay attention to whatever it's written in here.",
};

export const WithSVGIcon = Template.bind({});

WithSVGIcon.args = {
  icon: clockIcon,
  title: "You can use SVG Icons",
  message: "Just set the icon prop as a string with the SVG.",
};

export const WithReactNodeIcon = Template.bind({});

WithReactNodeIcon.args = {
  icon: <WarningIcon width={29} />,
  title: "You can use React elements",
  message: "Just set the icon prop as the React element.",
};

export const WithChildren = Template.bind({});

WithChildren.args = {
  title: "I have children",
  message: "Everything you set as children will appear below this text.",
  children: <button className="text-blue-dark py-1 mt-2">Click Me!</button>,
};
