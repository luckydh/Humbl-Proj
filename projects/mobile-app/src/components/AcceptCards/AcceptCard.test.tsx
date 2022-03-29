import React from "react";
import { StaticRouter } from "react-router";
import renderer from "react-test-renderer";
import AcceptCard from "./index";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => ({
      t: (string: string) => string,
    }),
}));

it("renders <Acceptcard /> with merchant status of pending", async () => {
  const tree = renderer.create(<AcceptCard loading={false} showMerchantPending={true} />);
  const treeNode = tree.root;
  expect(treeNode.findByType("p").children.includes("home-page.pending-status")).toBeTruthy();
  const treeJson = tree.toJSON();
  expect(treeJson).toMatchSnapshot();
});

it("renders <Acceptcard/> with merchant status undefined correctly", async () => {
  const tree = renderer.create(
    <StaticRouter>
      <AcceptCard loading={false} showMerchantPending={false} />
    </StaticRouter>
  );
  const treeNode = tree.root;
  expect(treeNode.findByType("p").children.includes("home-page.accept-cards")).toBeTruthy();
  const treeJson = tree.toJSON();
  expect(treeJson).toMatchSnapshot();
});

it("renders <Acceptcard /> in LOADING state", async () => {
  const tree = renderer.create(<AcceptCard loading={true} showMerchantPending={false} />);
  const treeJson = tree.toJSON();
  expect(treeJson).toMatchSnapshot();
});
