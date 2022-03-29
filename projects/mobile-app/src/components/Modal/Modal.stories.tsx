import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Modal, ModalProps } from "./Modal";
import { Heading } from "../Text/Text";

export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {},
} as Meta;

const Template: Story<ModalProps> = (args) => (
  <Modal {...args}>
    <div className="flex justify-center text-center">
      <Heading ariaLabel="STORY_BOOK">Modal Title</Heading>
    </div>
  </Modal>
);

export const Primary = Template.bind({});
Primary.args = {};
