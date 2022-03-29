import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ConfirmationPage, ConfirmationPageProps } from "./ConfirmationPage";

export default {
  title: "Pages/ConfirmationPage",
  component: ConfirmationPage,
  argTypes: {
    onClick: { action: "onClick" },
  },
  decorators: [],
} as Meta;

const Template: Story<ConfirmationPageProps> = (args) => (
    <div className="flex flex-col flex-grow">
      <ConfirmationPage {...args} />
    </div>
  );

export const Primary = Template.bind({});
Primary.args = {
  title: "Success!",
  subtitle: "You can now accept payments.",
};
