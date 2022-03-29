import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { ActionModal, ActionModalProps } from "./ActionModal";

export default {
  title: "CryptoWallet/ActionModal",
  component: ActionModal,
  argTypes: {},
} as Meta;

const Template: Story<ActionModalProps> = (args) => (
  <ActionModal {...args} setShowActionModal={() => {}} showActionModal onClick={() => {}} />
);

export const Primary = Template.bind({});
Primary.args = {};

export const WithCloseButton = Template.bind({});
WithCloseButton.args = {
  showCloseButton: true,
  ariaLabel: "STORY_BOOK",
};
