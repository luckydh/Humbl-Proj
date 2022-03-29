import React from "react";
import renderer from "react-test-renderer";
import Button from "./Button";

it("renders default pill button correctly", () => {
  const tree = renderer.create(<Button>Default Button</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders square pill button correctly", () => {
  const tree = renderer.create(<Button variant="square">Square Button</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders large square button correctly", () => {
  const tree = renderer
    .create(
      <Button variant="square" size="large">
        Large Square Button
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders large pill button correctly", () => {
  const tree = renderer.create(<Button size="large">Large Button</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders text button correctly", () => {
  const tree = renderer.create(<Button variant="text">Text Button</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders outline button correctly", () => {
  const tree = renderer
    .create(<Button variant="outline">Outline Button</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders submit button correctly", () => {
  const tree = renderer.create(<Button type="submit">Submit Button</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
