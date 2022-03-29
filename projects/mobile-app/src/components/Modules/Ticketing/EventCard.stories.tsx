import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";
import { EventCard, EventCardProps } from "./EventCard";
import moment from "moment-timezone";

export default {
  decorators: [withPadding, withDesign],
  title: "Ticketing/EventCard",
  component: EventCard,
} as Meta;

const Template: Story<EventCardProps> = (args) => <EventCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Jorge Drexler presenta: Silente / Boston NEW CONFIRMED DATE",
  platform: "tickeri",
  image: "https://d3m2ck9isazgad.cloudfront.net/w652/eventFlyer/1597950911246-d7e319bcdbf239ef65c13de3.png",
  date: moment("2021-04-17T12:25:00-04:00").toDate(),
};
Primary.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/proto/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-from-XD?node-id=119%3A11485&scaling=min-zoom&page-id=66%3A11208",
  },
};

export const ListOfEvents: Story = () => {
  const eventItems: EventCardProps[] = [
    {
      title: "Jorge Drexler presenta: Silente / Boston NEW CONFIRMED DATE",
      platform: "tickeri",
      image: "https://d3m2ck9isazgad.cloudfront.net/w652/eventFlyer/1597950911246-d7e319bcdbf239ef65c13de3.png",
      date: moment("2021-04-17T12:25:00-04:00").toDate(),
    },
    {
      title: "Bajo La Luna Fest 2021 con Cultura Profética, Caramelos de Cianuro, Micro TDH y más!",
      platform: "tickeri",
      image: "https://d3m2ck9isazgad.cloudfront.net/w652/eventFlyer/1615908431693-44003335734bcb83afc3052c.jpg",
      date: moment("2021-04-17T12:25:00-04:00").toDate(),
    },
    {
      title: "NEW DATE: Colombian Fest International 2021 en Houston,TX",
      platform: "tickeri",
      image: "https://d3m2ck9isazgad.cloudfront.net/w652/eventFlyer/1610656578914-2cba7d1a8fbabe2bf09b04d4.jpg",
      date: moment("2021-04-17T12:25:00-04:00").toDate(),
    },
  ];
  return (
    <ul>
      {eventItems.map((ticketItem, index) => (
        <li key={index} className="my-4">
          <EventCard {...ticketItem} />
        </li>
      ))}
    </ul>
  );
};

ListOfEvents.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/proto/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-from-XD?node-id=119%3A11485&scaling=min-zoom&page-id=66%3A11208",
  },
};
