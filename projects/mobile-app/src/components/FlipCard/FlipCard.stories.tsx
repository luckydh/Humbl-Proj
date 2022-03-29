import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import { FlipCard, FlipCardProps } from "./FlipCard";

export default {
  title: "components/FlipCard",
  component: FlipCard,
  args: {
    onFlip: action("Flipped 👌"),
    front: (
      <div className="bg-yellow-light text-yellow font-medium w-20 h-20 flex items-center justify-center shadow">
        Front
      </div>
    ),
    back: (
      <div className="bg-green-500 text-white font-medium w-20 h-20 flex items-center justify-center shadow">Back</div>
    ),
  },
} as Meta;

const Template: Story<FlipCardProps> = (args) => (
  <div className="h-full w-full flex items-center justify-center">
    <FlipCard {...args} />
  </div>
);

export const Vertical = Template.bind({});
Vertical.args = {
  direction: "y",
  speed: "slow",
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  direction: "x",
  speed: "slow",
};
