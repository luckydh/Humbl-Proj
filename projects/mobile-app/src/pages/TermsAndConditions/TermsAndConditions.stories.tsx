import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import withPadding from "utils/withPadding";
import { TermsAndConditions, TermsAndConditionsProps } from "./TermsAndConditions";

export default {
  decorators: [withPadding],
  title: "Onboarding/TermsAndConditions",
  component: TermsAndConditions,
  args: {
    onAccept: action("onAccept"),
  },
} as Meta;

const Template: Story<TermsAndConditionsProps> = (args) => <TermsAndConditions {...args} />;

export const Primary = Template.bind({});
