import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AssetGraphStatic, AssetGraphStaticProps } from "./AssetGraph";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/AssetGraph",
  component: AssetGraphStatic,
  argTypes: {},
  decorators: [withPadding],
  parameters: {
    storyshots: false,
  },
} as Meta;

const StaticTemplate: Story<AssetGraphStaticProps> = (args) => <AssetGraphStatic {...args} />;

export const Static = StaticTemplate.bind({});
Static.args = {
  amount: 12345.1234567891,
  coin: "btc",
  coinName: "Bitcoin",
  price: 123.45,
  logo: "",
};
