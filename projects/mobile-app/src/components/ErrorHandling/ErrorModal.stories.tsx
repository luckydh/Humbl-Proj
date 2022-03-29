import React, { useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { ErrorModal, ErrorModalProps } from "./ErrorModal";
import Button from "../Button/Button";
import { WarningIcon } from "assets/icons";

export default {
  decorators: [withPadding],
  title: "Error/error Modal",
  component: ErrorModal,
} as Meta;

const Template: Story<ErrorModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleAnyClick = (): void => {
    setIsOpen(false);
  };
  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open modal</Button>}
      <ErrorModal
        {...args}
        IconComponent={<img src={WarningIcon} alt="warning icon" />}
        isOpen={isOpen}
        secondaryAction={{ text: "Cancel", action: () => handleAnyClick() }}
      />
    </>
  );
};

export const Example = Template.bind({});
// hackery to get action to run
const foo = () => null;
Example.args = {
  isOpen: true,
  title: "Error Title",
  subTitle: "Error Subtitle",
  primaryAction: { text: "Confirm", action: () => foo() },
};
Example.parameters = {};

export const OneButtonError = Template.bind({});
OneButtonError.args = {
  isOpen: true,
  title: "Error Title",
  subTitle: "Error Subtitle",
  secondaryAction: undefined,
};
OneButtonError.parameters = {};
