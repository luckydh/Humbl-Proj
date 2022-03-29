import React from "react";
import { StaticRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import MenuDrawer from "./MenuDrawer";

// Disable suspense on menu drawer
import i18n from "../../i18n";
import { AccountType } from "generated/graphql";
import { MockedProvider } from "@apollo/client/testing";
import { VersionObject } from "utils/env";

if (i18n.options) {
  i18n.options.react = {
    useSuspense: false,
  };
}

const testingVersionObject: VersionObject = { major: "2", minor: "0", build: "2110" };

it("renders menu drawer correctly", async () => {
  const accountMock = {
    city: "randomUser.location.city",
    country: "AnyCountry",
    displayName: "Foo Man",
    id: "1234",
    phone: "1234567891",
    image: "https://place-hold.it/300.png",
    userName: "randomUser.login@username.com",
    isMerchant: false,
    hasMultipleAccounts: true,
  };
  const tree = renderer
    .create(
      <StaticRouter>
        <MockedProvider>
          <MenuDrawer testingVersionObject={testingVersionObject} accountProp={accountMock as AccountType} />
        </MockedProvider>
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
