import i18n from "i18n";
import React from "react";
import renderer from "react-test-renderer";
import TicketItem from "./TicketItem";

//Disable suspense on menu drawer

if (i18n.options) {
  i18n.options.react = {
    useSuspense: false,
  };
}

it("renders ticket item with end date", () => {
  const ticket = {
    title: "General Admission",
    register: null,
    price: "$25.00",
    min: 1,
    max: 10,
    name: "ticket1",
    saleEndDate: new Date(1478708162000),
  };
  const tree = renderer.create(<TicketItem {...ticket} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders ticket item without end date", () => {
  const ticket = {
    title: "General Admission",
    register: null,
    price: "$25.00",
    min: 1,
    max: 12,
    name: "ticket1",
  };
  const tree = renderer.create(<TicketItem {...ticket} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders ticket item with badge", () => {
  const ticket = {
    register: null,
    title: "Early Bird",
    price: "$49.00",
    min: 5,
    max: 10,
    name: "ticket3",
    badge: { label: "Sold Out", type: "warning" },
  };
  const tree = renderer.create(<TicketItem {...ticket} />).toJSON();
  expect(tree).toMatchSnapshot();
});
