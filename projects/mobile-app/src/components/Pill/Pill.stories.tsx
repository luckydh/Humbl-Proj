import React from "react";
import { Story, Meta } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import cx from "classnames";

import { Pill, PillProps } from "./Pill";

export default {
  title: "Components/Pill",
  component: Pill,
  args: {
    color: "default",
    outline: false,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=11060%3A110004",
    },
  },
  decorators: [withDesign],
} as Meta;

const Template: Story<PillProps> = (args) => {
  const { color, outline } = args;
  return (
    <div
      className={cx(
        "w-full h-full bg-gray-800 flex items-center justify-center transition-colors duration-300 ease-linear",
        {
          "bg-gray-100": color === "default" && outline,
        }
      )}>
      <Pill {...args}>10% APY</Pill>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const DefaultOutline = Template.bind({});
DefaultOutline.args = {
  outline: true,
};

export const Green = Template.bind({});
Green.args = {
  color: "green",
};

export const GreenOutline = Template.bind({});
GreenOutline.args = {
  color: "green",
  outline: true,
};

export const Red = Template.bind({});
Red.args = {
  color: "red",
};
export const RedOutline = Template.bind({});
RedOutline.args = {
  color: "red",
  outline: true,
};

export const Blue = Template.bind({});
Blue.args = {
  color: "blue",
};

export const BlueOutline = Template.bind({});
BlueOutline.args = {
  color: "blue",
  outline: true,
};

export const Yellow = Template.bind({});
Yellow.args = {
  color: "yellow",
};

export const YellowOutline = Template.bind({});
YellowOutline.args = {
  color: "yellow",
  outline: true,
};
