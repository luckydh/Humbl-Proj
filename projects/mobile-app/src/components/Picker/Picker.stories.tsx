import React, { useState } from "react";
import withPadding from "utils/withPadding";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Picker, PickerProps } from "./Picker";

export default {
  title: "Components/Picker",
  component: Picker,
  decorators: [withPadding],
} as Meta;

const items = [
  <Picker.Item key="js" label="JavaScript" value="js" />,
  <Picker.Item key="ts" label="TypeScript" value="ts" />,
  <Picker.Item key="csharp" label="C#" value="csharp" />,
];

const Template: Story<PickerProps> = (args) => (
  <Picker {...args} open={true} value="js" title="Select the Best Language">
    {items}
  </Picker>
);

export const Primary = Template.bind({});

export const WithCancel = Template.bind({});

WithCancel.args = {
  showCancelButton: true,
};

export const WithReset = Template.bind({});

WithReset.args = {
  showResetButton: true,
};

export const WithCancelAndReset = Template.bind({});

WithCancelAndReset.args = {
  showResetButton: true,
  showCancelButton: true,
  resetButtonText: "Reinitialize",
  cancelButtonText: "Abandon",
};

export const ControlledExample: Story<PickerProps> = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Picker</button>
      <Picker
        open={open}
        value={selected}
        title="Select the Best Language"
        showResetButton={true}
        showCancelButton={true}
        closeOnClickOutside={true}
        onClose={() => setOpen(false)}
        onChange={setSelected}
        onCancel={() => setOpen(false)}
        onReset={() => {
          setSelected(undefined);
          setOpen(false);
        }}
      >
        {items}
      </Picker>
    </div>
  );
};
