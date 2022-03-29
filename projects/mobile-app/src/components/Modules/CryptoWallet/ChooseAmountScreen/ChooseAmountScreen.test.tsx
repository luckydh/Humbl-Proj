import React from "react";
import { render, screen } from "@testing-library/react";
import { AssetMetricType } from "generated/graphql";
import userEvent from "@testing-library/user-event";
import i18n from "i18n";
import { MockedProvider } from "@apollo/client/testing";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { enterValueInCalculator } from "utils/test-helpers";
import { ChooseAmountScreen, InputMode } from "./ChooseAmountScreen";

if (i18n.options) {
  i18n.options.react = {
    useSuspense: false,
  };
}

const testAsset: AssetMetricType = {
  code: "BTC",
  name: "Bitcoin",
  price: 10000,
  logoImage: "image.png",
  currency: "usd",
};

describe("ChooseAmountScreen", () => {
  describe("Fiat input mode", () => {
    it("should allow switching to crypto input mode", () => {
      const history = createMemoryHistory();
      const { getByTestId } = render(
        <MockedProvider>
          <Router history={history}>
            <ChooseAmountScreen asset={testAsset} />
          </Router>
        </MockedProvider>
      );

      // enter a sample amount
      enterValueInCalculator("5.00");

      // primary is fiat, secondary is crypto
      expect(getByTestId("primary-amount")).toHaveTextContent("5.00");
      expect(getByTestId("secondary-amount")).toHaveTextContent("0.0005");

      // switch the input mode
      userEvent.click(getByTestId("switch-input-mode"));

      // primary is crypto, secondary is fiat
      expect(getByTestId("primary-amount")).toHaveTextContent("0.0005");
      expect(getByTestId("secondary-amount")).toHaveTextContent("5.00");
    });

    it("should allow applying flat suggestions", () => {
      const history = createMemoryHistory();
      const { getByTestId } = render(
        <MockedProvider>
          <Router history={history}>
            <ChooseAmountScreen
              asset={testAsset}
              suggestions={[
                { type: "flat", value: 5 },
                { type: "flat", value: 50 },
                { type: "flat", value: 100 },
              ]}
            />
          </Router>
        </MockedProvider>
      );

      userEvent.click(getByTestId("amount-suggestion-flat5"));
      expect(getByTestId("primary-amount")).toHaveTextContent("5.00");
      expect(getByTestId("secondary-amount")).toHaveTextContent("0.0005");

      userEvent.click(getByTestId("amount-suggestion-flat50"));
      expect(getByTestId("primary-amount")).toHaveTextContent("55.00");
      expect(getByTestId("secondary-amount")).toHaveTextContent("0.0055");

      userEvent.click(getByTestId("amount-suggestion-flat100"));
      expect(getByTestId("primary-amount")).toHaveTextContent("155.00");
      expect(getByTestId("secondary-amount")).toHaveTextContent("0.0155");
    });

    it("should allow applying max suggestion", () => {
      const history = createMemoryHistory();
      const { getByTestId } = render(
        <MockedProvider>
          <Router history={history}>
            <ChooseAmountScreen asset={testAsset} availableAmountInFiat={1000} suggestions={[{ type: "max" }]} />
          </Router>
        </MockedProvider>
      );

      userEvent.click(getByTestId("amount-suggestion-max"));
      expect(getByTestId("primary-amount")).toHaveTextContent("1,000.00");
      expect(getByTestId("secondary-amount")).toHaveTextContent("0.1");
    });

    it("should call validateAmount when submitting and display error message", () => {
      const history = createMemoryHistory();

      const onSubmit = jest.fn();
      const validateAmount = jest.fn().mockReturnValue("invalid-amount");

      const { queryByText, getByText } = render(
        <MockedProvider>
          <Router history={history}>
            <ChooseAmountScreen asset={testAsset} onSubmit={onSubmit} validateAmount={validateAmount} />
          </Router>
        </MockedProvider>
      );

      userEvent.click(getByText("global.continue"));
      expect(validateAmount).toBeCalled();
      expect(onSubmit).not.toBeCalled();
      expect(queryByText("invalid-amount")).toBeInTheDocument();
    });
  });

  describe("Crypto input mode", () => {
    it("should allow switching to fiat input mode", () => {
      const history = createMemoryHistory();
      const { getByTestId } = render(
        <MockedProvider>
          <Router history={history}>
            <ChooseAmountScreen asset={testAsset} defaultInputMode={InputMode.Crypto} />
          </Router>
        </MockedProvider>
      );

      // enter a sample amount
      // using getAll in the first because there are multiple zeroes at the time
      userEvent.click(screen.getByRole("button", { name: /0/i }));
      enterValueInCalculator(".01000000");

      // primary is crypto, secondary is fiat
      expect(getByTestId("primary-amount")).toHaveTextContent("0.01000000");
      expect(getByTestId("secondary-amount")).toHaveTextContent("100.00");

      // switch the input mode
      userEvent.click(getByTestId("switch-input-mode"));

      // primary is fiat, secondary is crypto
      expect(getByTestId("primary-amount")).toHaveTextContent("100.00");
      expect(getByTestId("secondary-amount")).toHaveTextContent("0.01000000");
    });
  });
});
