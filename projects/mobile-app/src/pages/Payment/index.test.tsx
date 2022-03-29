import React from "react";
import { Router, StaticRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import { actNextTick } from "../../utils/test-helpers";
import { MockedProvider } from "@apollo/client/testing";
import { createMemoryHistory } from "history";
import { GetAccountByIdDocument } from "../../generated/graphql";
import createApolloMock from "../../generated/createApolloMock";
import i18n from "../../i18n";
import Payment from "./index";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "test-12345" }),
}));

if (i18n.options) {
  i18n.options.react = {
    useSuspense: false,
  };
}

describe("Payment", () => {
  it("w redirect to the account page if account is not a merchant", async () => {
    const history = createMemoryHistory();
    const accountMock = createApolloMock(
      GetAccountByIdDocument,
      { id: "test-12345" },
      {
        data: {
          accountById: { isMerchant: false },
        },
      }
    );

    render(
      <Router history={history}>
        <MockedProvider mocks={[accountMock]}>
          <Payment />
        </MockedProvider>
      </Router>
    );

    await actNextTick();

    expect(history.location.pathname).toBe("/account/test-12345");
  });
  it("should display the payment flow if account is a merchant", async () => {
    const accountMock = createApolloMock(
      GetAccountByIdDocument,
      { id: "test-12345" },
      {
        data: {
          accountById: { isMerchant: true },
        },
      }
    );

    const { getByText } = render(
      <StaticRouter>
        <MockedProvider mocks={[accountMock]} addTypename={true}>
          <Payment />
        </MockedProvider>
      </StaticRouter>
    );

    await waitFor(() => {
      expect(getByText("page-profile-view-merchant.button.pay-merchant")).toBeInTheDocument();
    });
  });
});
