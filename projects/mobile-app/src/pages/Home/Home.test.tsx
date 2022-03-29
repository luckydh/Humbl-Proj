import Home from "./Home";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { mockProfile } from "utils/test-helpers/profileMocks";

jest.mock("react-i18next", () => ({
  Trans: ({ i18nKey } = { i18nKey: "" }) => i18nKey,
  useTranslation: () => ({
      t: (string: string) => string,
    }),
}));

describe("Merchant Home page ", () => {
  it("Newly created account, no stripe, no bussiness details, should display Accept Payments Banner ", async () => {
    const mockHistory = createMemoryHistory();

    const mockedProfile = mockProfile({
      isMerchant: true,
      merchantProfileDetails: {
        id: "1234",
        businessDetails: {
          hasOnboarded: false,
          hasBanking: false,
          chargesEnabled: false,
          payoutsEnabled: false,
        },
      },
    });

    render(
      <Router history={mockHistory}>
        <MockedProvider mocks={[mockedProfile]} addTypename={false}>
          <Home />
        </MockedProvider>
      </Router>
    );
    await waitFor(() => expect(screen.queryByText("home-page.accept-cards")).toBeInTheDocument());
  });

  it("Newly created account, onboarded stripe, should display Pending Verification banner ", async () => {
    const mockHistory = createMemoryHistory();

    const mockedProfile = mockProfile({
      isMerchant: true,
      merchantProfileDetails: {
        id: "1234",
        businessDetails: {
          hasOnboarded: true,
          hasBanking: true,
          chargesEnabled: false,
          payoutsEnabled: false,
        },
      },
    });

    render(
      <Router history={mockHistory}>
        <MockedProvider mocks={[mockedProfile]} addTypename={false}>
          <Home />
        </MockedProvider>
      </Router>
    );
    await waitFor(() => expect(screen.queryByText("home-page.pending-status")).toBeInTheDocument());
  });

  it("Newly created account, onboarded stripe succesfully  ", async () => {
    const mockHistory = createMemoryHistory();

    const mockedProfile = mockProfile({
      isMerchant: true,
      merchantProfileDetails: {
        id: "1234",
        businessDetails: {
          hasOnboarded: true,
          hasBanking: true,
          chargesEnabled: true,
          payoutsEnabled: true,
        },
      },
    });

    render(
      <Router history={mockHistory}>
        <MockedProvider mocks={[mockedProfile]} addTypename={false}>
          <Home />
        </MockedProvider>
      </Router>
    );
    await waitFor(() => expect(screen.queryByText("home-page.action-card.purchases")).toBeInTheDocument());
  });
});
