import React from "react";
import { render, screen } from "@testing-library/react";
import i18n from "../../../../i18n";
import { CryptoCurrencyList, CryptoCurrencyListProps } from "./CryptoCurrencyList";

if (i18n.options) {
  i18n.options.lng = "en";
  i18n.options.react = {
    useSuspense: false,
  };
}

const mockCrypto1 = { name: "Crypto 1", tickerCode: "crypto1" };
const mockCrypto2 = { name: "Crypto 2", tickerCode: "crypto2" };
const mockCrypto3 = { name: "Crypto 3", tickerCode: "crypto3" };

const defaultProps: CryptoCurrencyListProps = {
  cta: { text: "", onClick: () => {} },
  loading: false,
  items: [],
  customEmptyListText: undefined,
  variant: undefined,
  onClickItem: () => {},
};

describe("Crypo Currency List", () => {
  it("Renders a list of CryptoCurrencyItem s for the items passed in", () => {
    const updatedProps = {
      ...defaultProps,
      items: [mockCrypto1, mockCrypto2, mockCrypto3],
    };
    render(<CryptoCurrencyList {...updatedProps} />);

    expect(screen.getByText(mockCrypto1.name)).toBeInTheDocument();
    expect(screen.getByText(mockCrypto2.name)).toBeInTheDocument();
    expect(screen.getByText(mockCrypto3.name)).toBeInTheDocument();
  });

  it("Renders a loading state when loading is true", async () => {
    const updatedProps = {
      ...defaultProps,
      loading: true,
    };
    render(<CryptoCurrencyList {...updatedProps} />);

    expect(screen.getByTestId("crypto-currency-list-skeleton")).toBeInTheDocument();
  });

  it("Renders empty message when 0 items provided", async () => {
    render(<CryptoCurrencyList {...defaultProps} />);

    const title = i18n.t("crypto-wallet.currency-list.no-results.title");
    const description = i18n.t("crypto-wallet.currency-list.no-results.description");

    expect(screen.getByTestId("crypto-currency-list-empty")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("Renders the emptyListKeys passed in", () => {
    const updatedProps = {
      ...defaultProps,
      customEmptyListText: {
        title: "Testing Title",
        description: "Testing Description",
      },
    };
    render(<CryptoCurrencyList {...updatedProps} />);

    expect(screen.getByText("Testing Title")).toBeInTheDocument();
    expect(screen.getByText("Testing Description")).toBeInTheDocument();
  });
});
