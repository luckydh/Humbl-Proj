import { MerchantProfileContainer } from "./MerchantProfileContainer";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import createApolloMock from "../../../generated/createApolloMock";
import { GetAccountByIdDocument } from "../../../generated/graphql";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
      t: (string: string) => string,
    }),
}));

const totalCount = 2;
const averageRating = 4.5;

describe("Merchant profile states", () => {
  it("Newly created account, no stripe, no bussiness details ", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
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
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );
    await waitFor(() => expect(screen.queryByTestId("loading")).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText("review-details-card.payouts-on-hold")).not.toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText("review-details-card.review-details")).not.toBeInTheDocument());
  });

  it("Stripe restricted, no banking, payouts disabled, payments enabled", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: false,
                chargesEnabled: true,
                payoutsEnabled: false,
              },
            },
          },
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.payouts-on-hold")).toBeInTheDocument());
  });

  it("Stripe restricted, no banking, payouts disabled, payments enabled", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: false,
                chargesEnabled: true,
                payoutsEnabled: false,
              },
            },
          },
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.payouts-on-hold")).toBeInTheDocument());
  });

  it("Stripe pending, has banking,  payouts disabled, payments disabled", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: true,
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
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("profile-view-merchant-page.checklist.text-1")).toBeInTheDocument());
  });

  it("Stripe pending, has banking, payouts disabled, payments enabled", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: true,
                chargesEnabled: true,
                payoutsEnabled: false,
              },
            },
          },
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("profile-view-merchant-page.checklist.text-1")).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText(totalCount)).not.toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText(averageRating)).not.toBeInTheDocument());
  });

  it("Completed , has banking, payments enabled, payouts enabled, no reviews", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
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
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("merchant-profile.no-reviews-line-1")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(totalCount)).not.toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText(averageRating)).not.toBeInTheDocument());
  });

  it("Completed , has banking, payments enabled, payouts enabled, with reviews", async () => {
    const totalCount = 2;
    const averageRating = 4.5;

    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: true,
                chargesEnabled: true,
                payoutsEnabled: true,
              },
            },
            reviews: {
              pageInfo: {
                totalCount,
              },
            },
            averageRating,
          },
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText(totalCount)).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText(averageRating)).toBeInTheDocument());
  });

  it("Stripe restricted soon, has banking, payments enabled, payouts disabled", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: true,
                chargesEnabled: true,
                payoutsEnabled: false,
                currentlyDueRequirements: ["external_account"],
                pastDueRequirements: [],
              },
            },
          },
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.review-details")).toBeInTheDocument());
  });

  it("Stripe restricted soon, has banking, payments enabled, payouts enabled, currently due requirements", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: true,
                chargesEnabled: true,
                payoutsEnabled: true,
                currentlyDueRequirements: ["external_account"],
                pastDueRequirements: [],
              },
            },
          },
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.review-details")).toBeInTheDocument());
  });

  it("Stripe restricted, has banking, payments enabled, payouts enabled, pastand currently due requirements", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: true,
                chargesEnabled: true,
                payoutsEnabled: false,
                currentlyDueRequirements: ["external_account"],
                pastDueRequirements: ["external_account"],
              },
            },
          },
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.payouts-on-hold")).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText("review-details-card.review-details")).not.toBeInTheDocument());
  });

  it("Stripe restricted, no banking, payments disabled, payouts disabled, past and currently due requirements", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: false,
                chargesEnabled: false,
                payoutsEnabled: false,
                currentlyDueRequirements: ["external_account"],
                pastDueRequirements: ["external_account"],
              },
            },
            reviews: {
              pageInfo: {
                totalCount,
              },
            },
            averageRating,
          },
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.payouts-on-hold")).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText("review-details-card.review-details")).not.toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText(totalCount)).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText(averageRating)).toBeInTheDocument());
  });

  it("Stripe restricted, no banking, payments enabled, payouts disabled, past and currently due requirements with external_account only, should take user to update banking info", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: false,
                chargesEnabled: false,
                payoutsEnabled: false,
                currentlyDueRequirements: ["external_account"],
                pastDueRequirements: ["external_account"],
              },
            },
            reviews: {
              pageInfo: {
                totalCount,
              },
            },
            averageRating,
          },
        },
      },
      { addTypename: false }
    );

    const mockHistory = createMemoryHistory();

    render(
      <Router history={mockHistory}>
        <MockedProvider mocks={[mockedProfile]} addTypename={false}>
          <MerchantProfileContainer />
        </MockedProvider>
      </Router>
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.payouts-on-hold")).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText("review-details-card.review-details")).not.toBeInTheDocument());

    await waitFor(() =>
      expect(screen.queryByText("profile-view-merchant-page.checklist.text-1")).not.toBeInTheDocument()
    );

    await waitFor(() => expect(screen.queryByText(totalCount)).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText(averageRating)).toBeInTheDocument());

    fireEvent.click(screen.getByText("Review Details"));

    await waitFor(() => expect(mockHistory.location.pathname).toBe("/merchant-onboarding-update"));
  });

  it("Stripe restricted, no banking, payments enabled, payouts disabled, past and currently due requirements with external_account and others, should take user to dynamic form with banking info required", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: false,
                chargesEnabled: false,
                payoutsEnabled: false,
                currentlyDueRequirements: ["external_account", "individual.address.city"],
                pastDueRequirements: ["external_account"],
              },
            },
            reviews: {
              pageInfo: {
                totalCount,
              },
            },
            averageRating,
          },
        },
      },
      { addTypename: false }
    );

    const mockHistory = createMemoryHistory<{ requireBanking: boolean }>();

    render(
      <Router history={mockHistory}>
        <MockedProvider mocks={[mockedProfile]} addTypename={false}>
          <MerchantProfileContainer />
        </MockedProvider>
      </Router>
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.payouts-on-hold")).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText("review-details-card.review-details")).not.toBeInTheDocument());

    await waitFor(() =>
      expect(screen.queryByText("profile-view-merchant-page.checklist.text-1")).not.toBeInTheDocument()
    );

    await waitFor(() => expect(screen.queryByText(totalCount)).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText(averageRating)).toBeInTheDocument());

    fireEvent.click(screen.getByText("Review Details"));

    await waitFor(() => expect(mockHistory.location.pathname).toBe("/merchant-onboarding-update"));
  });

  it("Stripe restricted, has banking, payments enabled, payouts disabled, past and currently due requirements others than external account, should take user to to dynamic form only", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: true,
                chargesEnabled: false,
                payoutsEnabled: false,
                currentlyDueRequirements: ["individual.address.city"],
                pastDueRequirements: ["individual.address.city"],
              },
            },
            reviews: {
              pageInfo: {
                totalCount,
              },
            },
            averageRating,
          },
        },
      },
      { addTypename: false }
    );

    const mockHistory = createMemoryHistory<{ requireBanking: boolean }>();

    render(
      <Router history={mockHistory}>
        <MockedProvider mocks={[mockedProfile]} addTypename={false}>
          <MerchantProfileContainer />
        </MockedProvider>
      </Router>
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.payouts-on-hold")).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText("review-details-card.review-details")).not.toBeInTheDocument());

    await waitFor(() =>
      expect(screen.queryByText("profile-view-merchant-page.checklist.text-1")).not.toBeInTheDocument()
    );

    await waitFor(() => expect(screen.queryByText(totalCount)).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText(averageRating)).toBeInTheDocument());

    fireEvent.click(screen.getByText("Review Details"));

    await waitFor(() => expect(mockHistory.location.pathname).toBe("/merchant-onboarding-update"));

    await waitFor(() => expect(mockHistory.location?.state?.requireBanking).toBeFalsy());
  });

  it("Document verification required soon", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: true,
                chargesEnabled: true,
                payoutsEnabled: false,
                currentlyDueRequirements: ["1sfsdf123.verification.document"],
                pastDueRequirements: [],
              },
            },
          },
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() =>
      expect(
        screen.queryByText("document-verification-required-card.document-verification-required-soon-description")
      ).toBeInTheDocument()
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.payouts-on-hold")).not.toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText("review-details-card.review-details")).not.toBeInTheDocument());

    await waitFor(() =>
      expect(screen.queryByText("profile-view-merchant-page.checklist.text-1")).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.queryByText("document-verification-required-card.document-verification-required-description")
      ).not.toBeInTheDocument()
    );

    await waitFor(() => expect(screen.queryByText("merchant-profile.no-reviews-line-1")).not.toBeInTheDocument());
  });

  it("Document verification required", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: true,
                chargesEnabled: true,
                payoutsEnabled: false,
                currentlyDueRequirements: ["1sfsdf123.verification.document"],
                pastDueRequirements: ["1sfsdf123.verification.document"],
              },
            },
            reviews: {
              pageInfo: {
                totalCount,
              },
            },
            averageRating,
          },
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() =>
      expect(
        screen.queryByText("document-verification-required-card.document-verification-required-description")
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        screen.queryByText("document-verification-required-card.document-verification-required-soon-description")
      ).not.toBeInTheDocument()
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.payouts-on-hold")).not.toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText("review-details-card.review-details")).not.toBeInTheDocument());

    await waitFor(() =>
      expect(screen.queryByText("profile-view-merchant-page.checklist.text-1")).not.toBeInTheDocument()
    );

    await waitFor(() => expect(screen.queryByText("merchant-profile.no-reviews-line-1")).not.toBeInTheDocument());
  });

  it("Currenty and past due reuirements and document verification required", async () => {
    const mockedProfile = createApolloMock(
      GetAccountByIdDocument,
      { id: "undefined" },
      {
        data: {
          accountById: {
            merchantProfileDetails: {
              businessDetails: {
                hasOnboarded: true,
                hasBanking: true,
                chargesEnabled: true,
                payoutsEnabled: false,
                currentlyDueRequirements: ["individual.id_number"],
                pastDueRequirements: ["1sfsdf123.verification.document"],
              },
            },
            reviews: {
              pageInfo: {
                totalCount,
              },
            },
            averageRating,
          },
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedProfile]} addTypename={false}>
        <MerchantProfileContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.review-details")).toBeInTheDocument());

    await waitFor(() =>
      expect(
        screen.queryByText("document-verification-required-card.document-verification-required-description")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        screen.queryByText("document-verification-required-card.document-verification-required-soon-description")
      ).not.toBeInTheDocument()
    );

    await waitFor(() => expect(screen.queryByText("review-details-card.payouts-on-hold")).not.toBeInTheDocument());

    await waitFor(() =>
      expect(screen.queryByText("profile-view-merchant-page.checklist.text-1")).not.toBeInTheDocument()
    );

    await waitFor(() => expect(screen.queryByText("merchant-profile.no-reviews-line-1")).not.toBeInTheDocument());
  });
});
