import React from "react";
import { StaticRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { CardWithAddress } from "__fixtures__/paymentMethods";

// Disable suspense on menu drawer
import i18n from "../../i18n";
import BillingAddressStep from "./BillingAddressStep";

if (i18n.options) {
  i18n.options.react = {
    useSuspense: false,
  };
}
it("renders Credit Card Billing Address Step form without data", () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <BillingAddressStep onComplete={() => new Promise(() => {})} />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Credit Card Billing Address Step form with initial data", () => {
  const tree = renderer
    .create(
      <StaticRouter>
        <BillingAddressStep
          initialData={{
            country: CardWithAddress.country,
            city: CardWithAddress.cityAddress,
            state: CardWithAddress.region,
            postalCode: CardWithAddress.PostalAddress,
            addressLine1: CardWithAddress.streetAddress,
            addressLine2: CardWithAddress.streetAdditional,
          }}
          onComplete={() => new Promise(() => {})}
        />
      </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
