import CardItem from "./CardItem";
import React from "react";
import renderer from "react-test-renderer";

it("renders card item without chevron", () => {
  const tree = renderer.create(<CardItem brandName="Visa" last4="1234" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders card item with chevron", () => {
  const tree = renderer
    .create(<CardItem brandName="Visa" last4="1234" showChevron={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders card item with custom card brand image", () => {
  const tree = renderer
    .create(
      <CardItem
        brandName="Visa"
        last4="1234"
        brandImage="https://res.cloudinary.com/humbldata/image/upload/v1615500991/payment_method_assets/VISA_kigub0.png"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
