import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";
import TicketItem, { TicketItemProps } from "./TicketItem";

export default {
  decorators: [withPadding, withDesign],
  title: "Ticketing/TicketItem",
  component: TicketItem,
} as Meta;

const Template: Story<TicketItemProps> = (args) => <TicketItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "General Admission",
  price: "$25.00",
  min: 1,
  max: 10,
  name: "ticket1",
  saleEndDate: new Date(1478708162000),
};

export const ListOfTickets: Story = () => {
  const ticketItems = [
    {
      title: "General Admission",
      price: "$13.99",
      min: 1,
      max: 12,
      name: "ticket1",
      saleEndDate: new Date(1478708162000),
      register: () => {},
    },
    {
      title: "VIP Seating",
      price: "$59.99",
      description: "VIP includes no waiting in line and access near the stage.",
      min: 1,
      max: 12,
      name: "ticket2",
      register: () => {},
    },
    {
      title: "VIP Gold Seating",
      price: "$79.99",
      description:
        "GOLD VIP: Includes assigned seating in front of stage + 1 drink ticket / Tickets at the door, if available $100.00",
      min: 2,
      max: 4,
      name: "ticket2",
      saleEndDate: new Date(1478708162000),
      register: () => {},
    },
    {
      title: "VIP Diamond Ticket With Too Long of a Name That Probable spans way too much space",
      price: "$55.00",
      description: "VIP includes no waiting in line and access near the stage.",
      min: 1,
      max: 12,
      name: "ticket2",
      register: () => {},
    },
    {
      title: "After Midnight Access",
      price: "Free",
      min: 5,
      max: 10,
      name: "ticket3",
      badge: { label: "Sold Out", type: "warning" },
      register: () => {},
    },
    {
      title: "Early Bird",
      price: "$49.00",
      min: 5,
      max: 10,
      name: "ticket3",
      badge: { label: "Sold Out", type: "warning" },
      register: () => {},
    },
    {
      title: "Late Bird",
      price: "$69.00",
      min: 5,
      max: 10,
      name: "ticket4",
      badge: { label: "Only 4 tickets left", type: "ticketWarning" },
      register: () => {},
    },
  ];
  return (
    <ul>
      {ticketItems.map((ticketItem, index) => (
        <li key={index}>
          <TicketItem {...ticketItem} />
        </li>
      ))}
    </ul>
  );
};

ListOfTickets.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/proto/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-from-XD?node-id=178%3A12437&scaling=min-zoom",
  },
};
