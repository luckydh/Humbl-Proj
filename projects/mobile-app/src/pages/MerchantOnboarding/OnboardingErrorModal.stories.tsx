import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import {
  OnboardingErrorModal,
  OnboardingErrorModalProps,
  OnboardingModalState,
} from "./OnboardingErrorModal";

export default {
  decorators: [withPadding],
  title: "Merchants/OnboardingErrorModal",
  component: OnboardingErrorModal,
} as Meta;

const Template: Story<OnboardingErrorModalProps> = ({ state }) => <OnboardingErrorModal state={state} onClose={() => {}} />;

export const AccountError = Template.bind({});
AccountError.args = { state: OnboardingModalState.ACCOUNT_ERROR };
export const BankError = Template.bind({});
BankError.args = { state: OnboardingModalState.BANK_ERROR };
export const GenericError = Template.bind({});
GenericError.args = { state: OnboardingModalState.ERROR };
