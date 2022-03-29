import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { MockedProvider } from "@apollo/client/testing";
import { InterestGainAssets } from "./InterestGainAssets";

export default {
  title: "Components/InterestGainAssets",
  component: InterestGainAssets,
  parameters: {
    storyshots: false,
  },
} as Meta;

const Template: Story = (args) => (
    <MockedProvider>
      <InterestGainAssets {...args} />
    </MockedProvider>
  );

export const Primary = Template.bind({});
