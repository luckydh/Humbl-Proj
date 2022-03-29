import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { WarningModal, WarningModalProps } from "./WarningModal";
import { Icon } from "components/Icon/Icon";

export default {
  title: "Components/WarningModal",
  component: WarningModal,
  args: {
    header: <Icon name="bold_danger" color="red" size="md" />,
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nostrum cumque sunt! Debitis dolore, quibusdam alias nisi possimus voluptates illo numquam veniam suscipit, eius modi assumenda accusamus ipsam asperiores rerum!",
    duration: 5000,
    show: true,
  },
} as Meta;

const Template: Story<WarningModalProps> = (args) => <WarningModal {...args} />;

export const WithFiveSecondsDuration = Template.bind({});
WithFiveSecondsDuration.parameters = {
  storyshots: false,
};
