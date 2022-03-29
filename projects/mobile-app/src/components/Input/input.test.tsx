import React from "react";
import { StaticRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Input from "./Input";
//Disable suspense on menu drawer
import i18n from "../../i18n";

if (i18n.options) {
  i18n.options.react = {
    useSuspense: false,
  };
}

it("renders Input field correctly", async () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <Input register={() => null} />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
