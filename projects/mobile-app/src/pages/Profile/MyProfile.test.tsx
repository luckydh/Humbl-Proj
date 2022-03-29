import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import createApolloMock from "generated/createApolloMock";
import { GetAccountByIdDocument } from "generated/graphql";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import MenuDrawer from "components/ProfileMenu/MenuDrawer";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
      t: (string: string) => string,
    }),
}));

describe("Merchant Home page ", () => {
  it("Newly created account, no stripe, no bussiness details, should display Accept Payments Banner ", async () => {
    const mockHistory = createMemoryHistory();

    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            isMerchant: true,
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: false,
                hasBanking: false,
                chargesEnabled: false,
                payoutsEnabled: false,
              },
            },
          },
        },
      },
      { addTypename: false }
    );

    render(
      <Router history={mockHistory}>
        <MockedProvider mocks={[mockedProfile]} addTypename={false}>
          <MenuDrawer />
        </MockedProvider>
      </Router>
    );

    await waitFor(() => expect(screen.queryByText("component-profile-menu.text.accept-payments-payouts")).toBeInTheDocument());

    await waitFor(() =>
      expect(screen.queryByText("component-profile-menu.text.manage-payouts")).not.toBeInTheDocument()
    );
  });

  it("Newly created account, no stripe, no bussiness details, should display Accept Payments Banner ", async () => {
    const mockHistory = createMemoryHistory();

    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            isMerchant: true,
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: true,
                chargesEnabled: true,
                payoutsEnabled: true,
              },
            },
          },
        },
      },
      { addTypename: false }
    );

    render(
      <Router history={mockHistory}>
        <MockedProvider mocks={[mockedProfile]} addTypename={false}>
          <MenuDrawer />
        </MockedProvider>
      </Router>
    );

    await waitFor(() => expect(screen.queryByText("component-profile-menu.text.accept-payments-payouts")).not.toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText("component-profile-menu.text.manage-payouts")).toBeInTheDocument());
  });
});
