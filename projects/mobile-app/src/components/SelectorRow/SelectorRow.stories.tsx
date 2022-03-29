import React, { useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import withPadding from "../../utils/withPadding";
import { SelectorRow, SelectorRowProps } from "./SelectorRow";

export default {
  title: "Components/Selector Row",
  component: SelectorRow,
  decorators: [withPadding],
} as Meta;

const Template: Story<SelectorRowProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState("24h");
  return <SelectorRow onOptionsSelected={setSelectedValue} selectedOption={selectedValue} options={args.options} />;
};

export const Example = Template.bind({});
Example.args = {
  options: [
    { label: "1H", value: "1h", ariaLabel: "STORY_BOOK" },
    { label: "24H", value: "24h", ariaLabel: "STORY_BOOK" },
    { label: "1W", value: "1w", ariaLabel: "STORY_BOOK" },
    { label: "1M", value: "1m", ariaLabel: "STORY_BOOK" },
    { label: "1Y", value: "1y", ariaLabel: "STORY_BOOK" },
    { label: "All", value: "all", ariaLabel: "STORY_BOOK" },
  ],
};
