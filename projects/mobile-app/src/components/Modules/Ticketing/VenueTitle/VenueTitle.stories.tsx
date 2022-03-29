import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";
import VenueTitle, { VenueTitleProps } from "./VenueTitle";
import { ProfileLayout } from "components/PageTemplates/ProfileLayout";

export default {
  decorators: [withDesign],
  title: "Ticketing/VenueTitle",
  component: VenueTitle,
} as Meta;

const Template: Story<VenueTitleProps> = (args) => <VenueTitle {...args} />;

export const Primary = Template.bind({});

const defaultArgs = {
  title: "Isla Cuban-Latín Kitchen & Rum Bar",
  address: {
    city: "Los Angeles",
    postal: "90029",
    region: "California",
    street: "123 Melrose Avenue",
  },
};

Primary.args = defaultArgs;
Primary.decorators = [withPadding];

export const WithinLayout: Story<VenueTitleProps> = (args) => (
    <ProfileLayout>
      <VenueTitle {...args} />
      <div className="mt-2">
        <h2 className="text-white text-lg font-semibold">Upcoming Events</h2>
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="bg-blue-dark rounded-lg w-full my-4 py-12">
            <h3 className="text-white text-lg font-bold text-center">
              Event {index + 1}
            </h3>
          </div>
        ))}
      </div>
    </ProfileLayout>
  );

WithinLayout.args = defaultArgs;
WithinLayout.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/proto/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=119%3A11485&scaling=min-zoom",
  },
};
