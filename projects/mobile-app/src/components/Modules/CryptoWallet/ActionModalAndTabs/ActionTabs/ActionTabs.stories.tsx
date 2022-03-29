import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import up from "assets/images/up.png";
import forward from "assets/images/forward.png";
import ActionTab from "./ActionTab";

export default {
  title: "CryptoWallet/ActionTab",
  component: ActionTab,
  argTypes: {},
} as Meta;

const defaultArgs = {
  title: "Send",
  description: "Send Assets to another wallet",
  leftIcon: up,
  rightIcon: forward,
};

const Template: Story = () => (
    <ActionTab
      title="Send"
      description="Send Assets to another wallet"
      leftIcon={up}
      rightIcon={forward}
      onClick={() => {}}
      className="mb-3"
    />
  );
export const Primary = Template.bind({});

Primary.args = defaultArgs;
