import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { ProfileAvatar, ProfileAvatarProps } from "./Avatar";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/ProfileAvatar",
  component: ProfileAvatar,
  argTypes: {},
  decorators: [withPadding],
} as Meta;

const Template: Story<ProfileAvatarProps> = (args) => <ProfileAvatar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  src:
    "https://www.zooportraits.com/wp-content/uploads/2018/05/Harbor-Seal-Phoca-Vitulina.jpg",
  username: "suzy.q",
  name: "Suzy Q",
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  city: "Anaheim",
  street: "1313 Disneyland Dr.",
  region: "California",
  country: "United States",
  postal: "92802",
  rating: 4.99,
  size: "medium",
  totalRatings: 1000,

  src:
    "https://www.zooportraits.com/wp-content/uploads/2018/05/Harbor-Seal-Phoca-Vitulina.jpg",
  username: "suzy.q",
  name: "Suzy Q",
};
