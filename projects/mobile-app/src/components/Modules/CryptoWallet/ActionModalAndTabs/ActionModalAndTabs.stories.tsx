import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { ActionModal } from "./ActionModal/ActionModal";
import ActionTab from "./ActionTabs/ActionTab";
import ActionModalAndTabs from ".";
import { UpIcon, DownIcon, bankIcon, ActionIcon } from "assets/icons";

export default {
  title: "CryptoWallet/ActionModalAndTabs",
  component: ActionModalAndTabs,
  argTypes: {},
} as Meta;

const data = {
  items: [
    {
      title: "Send",
      description: "Send Assets to another wallet",
      leftIcon: UpIcon,
      rightIcon: ActionIcon,
    },
    {
      title: "Receive",
      description: "Receive Assets to another wallet",
      leftIcon: DownIcon,
      rightIcon: ActionIcon,
    },
    {
      title: "Withdraw",
      description: "Transfer balance to your bank",
      leftIcon: bankIcon,
      rightIcon: ActionIcon,
    },
  ],
};

const Template: Story = (args) => (
  <ActionModal {...args} ariaLabel="STORY_BOOK" setShowActionModal={() => {}} showActionModal={true} onClick={() => {}}>
    {args.items &&
      args.items.map((item: any, index: number) => (
        <ActionTab
          title={item?.title}
          key={index}
          description={item?.description}
          leftIcon={item?.leftIcon}
          rightIcon={item?.rightIcon}
          onClick={() => {}}
          className="mb-3"
        />
      ))}
  </ActionModal>
);

export const Primary = Template.bind({});
Primary.args = data;
