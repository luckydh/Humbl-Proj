import React from "react";
import { CryptoAllTransactionsContainer } from "./CryptoAllTransactionsContainer";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import createApolloMock from "generated/createApolloMock";
import { AssetTransactionCategory, GetRecentCryptoTransactionsDocument } from "generated/graphql";
import MockDate from "mockdate";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
      t: (string: string) => string,
    }),
}));

describe("Merchant profile states", () => {
  beforeAll(() => MockDate.set(new Date("08/28/2021")));

  afterAll(() => MockDate.reset());

  it("Should display a list of transactions on 'This month section' and July sections", async () => {
    const mockedTransactions = createApolloMock(
      GetRecentCryptoTransactionsDocument,
      { seeAll: true },
      {
        data: {
          getRecentTransactions: [
            {
              amount: 0.030225,
              category: AssetTransactionCategory.Purchase,
              currency: "USDC",
              date: "2021-08-18T18:32:37.807Z",
              fiatAmount: 1.05,
              fiatCurrency: "USD",
            },
            {
              amount: 0.030225,
              category: AssetTransactionCategory.Purchase,
              currency: "USDC",
              date: "2021-07-18T18:32:37.807Z",
              fiatAmount: 1.05,
              fiatCurrency: "USD",
            },
          ],
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedTransactions]} addTypename={false}>
        <CryptoAllTransactionsContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("month.full-name.this-month")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("July 2021")).toBeInTheDocument());
  });

  it("Should display a list pf transactions on June, May, April, March sections", async () => {
    const mockedTransactions = createApolloMock(
      GetRecentCryptoTransactionsDocument,
      { seeAll: true },
      {
        data: {
          getRecentTransactions: [
            {
              amount: 0.030225,
              category: AssetTransactionCategory.Purchase,
              currency: "USDC",
              date: "2021-06-18T18:32:37.807Z",
              fiatAmount: 1.05,
              fiatCurrency: "USD",
            },
            {
              amount: 0.030225,
              category: AssetTransactionCategory.Purchase,
              currency: "USDC",
              date: "2021-05-18T18:32:37.807Z",
              fiatAmount: 1.05,
              fiatCurrency: "USD",
            },
            {
              amount: 0.030225,
              category: AssetTransactionCategory.Purchase,
              currency: "USDC",
              date: "2021-04-18T18:32:37.807Z",
              fiatAmount: 1.05,
              fiatCurrency: "USD",
            },
            {
              amount: 0.030225,
              category: AssetTransactionCategory.Purchase,
              currency: "USDC",
              date: "2021-03-18T18:32:37.807Z",
              fiatAmount: 1.05,
              fiatCurrency: "USD",
            },
          ],
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedTransactions]} addTypename={false}>
        <CryptoAllTransactionsContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("June 2021")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("May 2021")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("April 2021")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("March 2021")).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText("month.full-name.this-month")).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("February 2021")).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("January 2021")).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("July 2021")).not.toBeInTheDocument());
  });

  it("Should display a list of transactions on 'This month section' and July sections", async () => {
    const mockedTransactions = createApolloMock(
      GetRecentCryptoTransactionsDocument,
      { seeAll: true },
      {
        data: {
          getRecentTransactions: [
            {
              amount: 0.030225,
              category: AssetTransactionCategory.Purchase,
              currency: "USDC",
              date: "2021-08-18T18:32:37.807Z",
              fiatAmount: 1.05,
              fiatCurrency: "USD",
            },
            {
              amount: 0.030225,
              category: AssetTransactionCategory.Purchase,
              currency: "USDC",
              date: "2021-07-18T18:32:37.807Z",
              fiatAmount: 1.05,
              fiatCurrency: "USD",
            },
          ],
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedTransactions]} addTypename={false}>
        <CryptoAllTransactionsContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("month.full-name.this-month")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("July 2021")).toBeInTheDocument());
  });

  it("Should display no transactions component when transactions list is empty", async () => {
    const mockedTransactions = createApolloMock(
      GetRecentCryptoTransactionsDocument,
      { seeAll: true },
      {
        data: {
          getRecentTransactions: [],
        },
      },
      { addTypename: false }
    );

    render(
      <MockedProvider mocks={[mockedTransactions]} addTypename={false}>
        <CryptoAllTransactionsContainer />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.queryByText("crypto-transactions.no-transactions")).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.queryByText("crypto-transactions.no-all-transactions-description")).toBeInTheDocument()
    );
  });
});
