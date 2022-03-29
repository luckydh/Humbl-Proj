import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

import { withPadding } from "utils/withPadding";

import { TextField, TextFieldProps } from "./TextField";

export default {
  title: "Fields/TextField",
  component: TextField,
  decorators: [withPadding, withDesign],
  args: {},
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=15052%3A177724",
    },
    viewport: {
      viewports: { ...INITIAL_VIEWPORTS, ...MINIMAL_VIEWPORTS },
      defaultViewport: "mobile1",
    },
  },
} as Meta;

type StoryProps = TextFieldProps;

const Template: Story<StoryProps> = (args) => <TextField {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: "firstName",
  name: "firstName",
  label: "First name",
  defaultValue: "email@gmai",
};

export const Error = Template.bind({});
Error.args = {
  id: "firstName",
  name: "firstName",
  label: "First name",
  variant: "error",
  helperText: "Error message",
  defaultValue: "email@gmail.comm",
};

export const Success = Template.bind({});
Success.args = {
  id: "firstName",
  name: "firstName",
  label: "First name",
  variant: "success",
  helperText: "Success message",
  defaultValue: "email@gmail.com",
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  id: "firstName",
  name: "firstName",
  label: "First name",
  placeholder: "John Doe",
  autoFocus: true,
};

export const Grid: Story = () => (
  <div className="uikit-space-y-4">
    <TextField
      type="text"
      label="Username"
      name="username"
      id="username"
      variant="success"
      helperText="This username is available."
      defaultValue="humbluser123"
    />
    <TextField
      type="email"
      label="Email"
      name="email"
      id="email"
      variant="error"
      helperText="Please provide a valid email."
      defaultValue="email@gmail.comm"
    />
    <TextField
      type="password"
      label="Password"
      name="password"
      id="password"
      helperText="Password should only contain letters, numbers and special characters."
      defaultValue="Test123"
    />
    <div className="uikit-flex uikit-space-x-4">
      <TextField type="text" label="State" name="state" id="state" />
      <TextField type="text" label="City" name="city" id="city" />
    </div>
  </div>
);

export const InputTypes: Story = () => (
  <div className="uikit-space-y-4">
    <TextField type="email" label="Email" name="email" id="email" />
    <TextField type="number" label=" Number" name="number" id="number" />
    <TextField type="password" label="Password" name="password" id="password" />
    <TextField type="search" label="Search" name="search" id="search" />
    <TextField type="tel" label="Tel" name="tel" id="tel" />
    <TextField type="text" label="Text" name="text" id="text" />
    <TextField type="url" label="URL" name="url" id="url" />
  </div>
);
