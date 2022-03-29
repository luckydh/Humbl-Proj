import React from "react";
import { StaticRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Login from "./index";
//Disable suspense on login
import i18n from "../../i18n";

if (i18n.options) {
  i18n.options.react = {
    useSuspense: false,
  };
}

it("renders Login page", async () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <Login />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
