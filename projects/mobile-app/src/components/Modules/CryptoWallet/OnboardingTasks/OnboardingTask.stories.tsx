import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { OnboardingTask, OnboardingTaskProps } from "./OnboardingTask";
import { Illustration } from "components/Illustration/Illustration";

export default {
  title: "OnboardingTasks/Tasks",
  component: OnboardingTask,
  decorators: [withPadding],
} as Meta;

const defaultArgs: OnboardingTaskProps = {
  title: "This is a Task",
  description: "Also has a nifty description",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore storybook injects an onclick and only way to have it not go in is via null 🤷‍♂️
  onClick: null,
  icon: <Illustration name="document" size="md" />,
};

const Template: Story<OnboardingTaskProps> = (args) => <OnboardingTask {...args} />;

export const Primary = Template.bind({});
Primary.args = defaultArgs;

export const WithClick = Template.bind({});
WithClick.args = {
  ...defaultArgs,
  title: "This Task has an Onclick",
  onClick: () => {},
};

export const LongText = Template.bind({});
LongText.args = {
  ...defaultArgs,
  title: "This Task has a bunch of text that goes on and on",
  description:
    "This description similarly goes on and on and on. And then you thought it would be over but it was not. So of course it just kept going and going.",
  onClick: () => {},
};
