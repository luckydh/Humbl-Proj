import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StaticRouter, MemoryRouter } from "react-router-dom";
import { ApolloError } from "@apollo/client";
import { AccountType } from "generated/graphql";
import i18n from "../../i18n";

import PaymentConfirmStep from "./PaymentConfirmStep";

if (i18n.options) {
  i18n.options.react = {
    useSuspense: false,
  };
}

const testAccount: AccountType = {
  id: "test-12345",
  image: "",
  userName: "test",
  displayName: "Test",
};

const defaultProps = {
  loading: false,
  currency: "USD",
  account: testAccount,
  totalAmount: 10000,
  onBack: jest.fn(),
  onComplete: jest.fn(),
};

describe("PaymentConfirmStep", () => {
  it("should display the total amount with correct currency symbol", () => {
    const { getByText, asFragment, rerender } = render(<PaymentConfirmStep {...defaultProps} currency="USD" />, {
      wrapper: MemoryRouter,
    });

    expect(getByText("$100.00 USD")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();

    rerender(<PaymentConfirmStep {...defaultProps} currency="MXN" />);

    expect(getByText("$100.00 MXN")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();

    rerender(<PaymentConfirmStep {...defaultProps} currency="CAD" />);

    expect(getByText("$100.00 CAD")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call onComplete when clicking the CTA", async () => {
    const onComplete = jest.fn();

    const { getByText } = render(
      <StaticRouter>
        <PaymentConfirmStep {...defaultProps} onComplete={onComplete} />
      </StaticRouter>
    );

    userEvent.click(getByText("payment-page.action.confirm-and-pay"));

    expect(onComplete).toBeCalled();
  });

  it("should call onBack when clicking the in-app back button", async () => {
    const onBack = jest.fn();

    const { getByTestId } = render(
      <StaticRouter>
        <PaymentConfirmStep {...defaultProps} onBack={onBack} />
      </StaticRouter>
    );

    userEvent.click(getByTestId("layout-modal-close"));

    expect(onBack).toBeCalled();
  });

  it("should call onBack when clicking the hardware back button", async () => {
    const onBack = jest.fn();

    render(
      <StaticRouter>
        <PaymentConfirmStep {...defaultProps} onBack={onBack} />
      </StaticRouter>
    );

    fireEvent(
      document,
      new CustomEvent("ionBackButton", {
        detail: {
          register: (_: number, callback: () => void) => callback(),
        },
      })
    );

    expect(onBack).toBeCalled();
  });

  it("should display an error message if error object is truthy", async () => {
    const { getByText, asFragment } = render(
      <StaticRouter>
        <PaymentConfirmStep {...defaultProps} error={!!new ApolloError({})} />
      </StaticRouter>
    );

    expect(getByText("payment-page.error.error-processing-transaction")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
