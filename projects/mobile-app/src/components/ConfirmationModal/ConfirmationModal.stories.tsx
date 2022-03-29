import React, { useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { ConfirmationModal, ConfirmationModalProps } from "./ConfirmationModal";
import Button from "../Button/Button";

export default {
  decorators: [withPadding],
  title: "Components/Confirmation Modal",
  component: ConfirmationModal,
} as Meta;

const Template: Story<ConfirmationModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleAnyClick = (): void => {
    setIsOpen(false);
  };
  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open modal</Button>}
      <ConfirmationModal
        {...args}
        isOpen={isOpen}
        onConfirm={() => handleAnyClick()}
        onCancel={() => handleAnyClick()}
      />
    </>
  );
};

export const Example = Template.bind({});
Example.args = {
  isOpen: true,
  title: "Confirmation Title",
  subTitle: "Confirmation Subtitle",
  confirmationButtonText: "Confirm",
  cancelButtonText: "Cancel",
};
Example.parameters = {};
