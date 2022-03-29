import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import { ProgressBar, ProgressBarProps } from "./ProgressBar";

export default {
  decorators: [withDesign],
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=5088%3A65779",
    },
  },
} as Meta;

const defaultArgs = {
  total: 100,
  data: [
    {
      tickerCode: "BTC",
      interestGained: 75,
    },
    {
      tickerCode: "ETH",
      interestGained: 25,
    },
  ],
};

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const Primary = Template.bind({});
Primary.args = defaultArgs;
