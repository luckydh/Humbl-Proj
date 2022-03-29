import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StaticRouter } from "react-router";
import PaymentMethodScreen from "./PaymentMethodScreen";
import i18n from "i18n";
import { MockedProvider } from "@apollo/client/testing";
import createApolloMock from "generated/createApolloMock";
import { GetFeaturesDocument, PaymentMethodCategory } from "generated/graphql";
import { CreditCard } from "__fixtures__/paymentMethods";
import { RecoilRoot } from "recoil";

if (i18n.options) {
  i18n.options.react = {
    useSuspense: false,
  };
}

const mockedProfile = createApolloMock(
  GetFeaturesDocument,
  {},
  {
    data: {
      features: {
        features: [{ name: "ach-feature-redux-121521", enabled: true }],
      },
    },
  }
);

// Testing the interactions here. Most of the
// other cases should be covered by Storybook snapshots.

describe("PaymentMethodContainer", () => {
  it("should call onContinue with asset info", () => {
    const onContinue = jest.fn();
    const { getByText } = render(
      <StaticRouter>
        <RecoilRoot>
          <MockedProvider mocks={[mockedProfile]}>
            <PaymentMethodScreen
              refetchPaymentMethods={() => {}}
              onContinue={onContinue}
              assets={[
                {
                  code: "BTC",
                  name: "Bitcoin",
                  logoImage: "",
                  fiatAmount: {
                    display: "$50.00",
                  },
                },
              ]}
            />
          </MockedProvider>
        </RecoilRoot>
      </StaticRouter>
    );

    userEvent.click(getByText("Bitcoin"));
    userEvent.click(getByText("global.continue"));

    expect(onContinue).toBeCalledWith({
      type: "asset",
      assetCode: "BTC",
      paymentMethodId: undefined,
      cvvConfirmation: undefined,
    });
  });

  it("should call onContinue with credit card info", () => {
    const onContinue = jest.fn();
    const { getByText, getByRole } = render(
      <StaticRouter>
        <RecoilRoot>
          <MockedProvider mocks={[mockedProfile]}>
            <PaymentMethodScreen onContinue={onContinue} cards={[CreditCard]} refetchPaymentMethods={() => {}} />
          </MockedProvider>
        </RecoilRoot>
      </StaticRouter>
    );

    userEvent.click(getByText("Visa"));
    userEvent.type(getByRole("textbox"), "123");
    userEvent.click(getByText("global.continue"));

    expect(onContinue).toBeCalledWith({
      type: PaymentMethodCategory.Card,
      assetCode: undefined,
      paymentMethodId: "0123",
      cvvConfirmation: "123",
      cardLastFour: "0123",
    });
  });
});
