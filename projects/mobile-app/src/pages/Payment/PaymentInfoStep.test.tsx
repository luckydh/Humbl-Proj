import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StaticRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { AccountType, GetMyPaymentMethodsDocument } from "generated/graphql";
import createApolloMock from "generated/createApolloMock";
import i18n from "../../i18n";

import PaymentInfoStep, { PaymentInfo } from "./PaymentInfoStep";
import { actNextTick } from "utils/test-helpers";
import { CreditCard } from "__fixtures__/paymentMethods";

if (i18n.options) {
  i18n.options.react = {
    useSuspense: false,
  };
}

const account: AccountType = {
  id: "test-12345",
  image: "",
  userName: "test",
  displayName: "Test",
};

const paymentMethodsMock = createApolloMock(
  GetMyPaymentMethodsDocument,
  {},
  {
    data: {
      paymentMethods: [CreditCard],
    },
  },
  {
    addTypename: false,
  }
);

function enterTestAmount() {
  userEvent.click(screen.getByTestId("amount-input"));
  userEvent.click(screen.getByText("1"));
  userEvent.click(screen.getByText("0"));
  userEvent.click(screen.getByText("0"));
  userEvent.click(screen.getByText("0"));
  userEvent.click(screen.getByText("0"));
  userEvent.click(screen.getByText("Enter"));
}

const PAY = "payment-page.action.pay";
const ADD_TIP = "payment-page.action.add-tip";
const CUSTOM_AMOUNT = "payment-page.message.custom-amount";

describe("PaymentInfoStep", () => {
  it("should open/close the calculator", () => {
    const { getByText, getByTestId, queryByTestId, asFragment } = render(
      <StaticRouter>
        <MockedProvider mocks={[paymentMethodsMock]}>
          <PaymentInfoStep account={account} currency="USD" onComplete={jest.fn()} />
        </MockedProvider>
      </StaticRouter>
    );

    userEvent.click(getByTestId("amount-input"));
    expect(queryByTestId("calculator")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();

    userEvent.click(getByText("Enter"));
    expect(queryByTestId("calculator")).not.toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should update the total when inserting a new amount", () => {
    const { getByText, getByTestId, asFragment } = render(
      <StaticRouter>
        <MockedProvider mocks={[paymentMethodsMock]}>
          <PaymentInfoStep account={account} currency="USD" onComplete={jest.fn()} />
        </MockedProvider>
      </StaticRouter>
    );

    userEvent.click(getByTestId("amount-input"));

    // 10000 cents should give us $100.00
    userEvent.click(getByText("1"));
    userEvent.click(getByText("0"));
    userEvent.click(getByText("0"));
    userEvent.click(getByText("0"));
    userEvent.click(getByText("0"));

    userEvent.click(getByText("Enter"));

    expect(getByText("$100.00")).toBeInTheDocument();

    userEvent.click(getByTestId("amount-input"));

    // 56789 cents should give us $567.89
    userEvent.click(getByText("5"));
    userEvent.click(getByText("6"));
    userEvent.click(getByText("7"));
    userEvent.click(getByText("8"));
    userEvent.click(getByText("9"));

    userEvent.click(getByText("Enter"));

    expect(getByText("$567.89")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should update the total when adding a tip amount", () => {
    const { getByText, asFragment } = render(
      <StaticRouter>
        <MockedProvider mocks={[paymentMethodsMock]}>
          <PaymentInfoStep account={account} currency="USD" onComplete={jest.fn()} />
        </MockedProvider>
      </StaticRouter>
    );

    // $100.00
    enterTestAmount();

    userEvent.click(getByText(ADD_TIP));

    expect(getByText("5% ($5.00)")).toBeInTheDocument();
    expect(getByText("10% ($10.00)")).toBeInTheDocument();
    expect(getByText("15% ($15.00)")).toBeInTheDocument();
    expect(getByText(CUSTOM_AMOUNT)).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();

    userEvent.click(getByText("5% ($5.00)"));
    expect(getByText("$105.00")).toBeInTheDocument();

    userEvent.click(getByText("5%")); // tip button now shows 5%
    userEvent.click(getByText("10% ($10.00)")); // select 10% tip
    expect(getByText("$110.00")).toBeInTheDocument();

    userEvent.click(getByText("10%")); // tip button now shows 10%
    userEvent.click(getByText("15% ($15.00)")); // select 15% tip
    expect(getByText("$115.00")).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should allow adding a custom tip amount", () => {
    const { getByText, getByTestId, queryByTestId, asFragment } = render(
      <StaticRouter>
        <MockedProvider mocks={[paymentMethodsMock]}>
          <PaymentInfoStep account={account} currency="USD" onComplete={jest.fn()} />
        </MockedProvider>
      </StaticRouter>
    );

    // $100.00
    enterTestAmount();

    userEvent.click(getByText(ADD_TIP));
    userEvent.click(getByText(CUSTOM_AMOUNT));

    expect(queryByTestId("calculator")).toBeInTheDocument();

    userEvent.click(getByText("6"));
    userEvent.click(getByText("3"));
    userEvent.click(getByText("9"));
    userEvent.click(getByText("Enter"));

    expect(queryByTestId("calculator")).not.toBeInTheDocument();
    expect(getByText("$106.39")).toBeInTheDocument();

    userEvent.click(getByTestId("tip-input"));
    expect(queryByTestId("calculator")).toBeInTheDocument();

    userEvent.click(getByText("8"));
    userEvent.click(getByText("5"));
    userEvent.click(getByText("2"));
    userEvent.click(getByText("Enter"));

    expect(getByText("$108.52")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call onComplete with the informed data", async () => {
    const onComplete = jest.fn();

    const { getByText } = render(
      <StaticRouter>
        <MockedProvider mocks={[paymentMethodsMock]}>
          <PaymentInfoStep account={account} currency="USD" onComplete={onComplete} />
        </MockedProvider>
      </StaticRouter>
    );

    await actNextTick();

    enterTestAmount();

    userEvent.click(getByText(ADD_TIP));
    userEvent.click(getByText(CUSTOM_AMOUNT));

    userEvent.click(getByText("9"));
    userEvent.click(getByText("9"));
    userEvent.click(getByText("Enter"));

    userEvent.click(getByText(PAY));

    expect(onComplete).toBeCalledWith({
      tipAmount: 99,
      tipPercentage: "custom",
      total: 10099,
      amount: 10000,
      paymentMethod: { ...CreditCard, status: null },
    });
  });

  it("should raise errors when no data is provided", async () => {
    const emptyPaymentMethodsMock = createApolloMock(
      GetMyPaymentMethodsDocument,
      {},
      { data: { paymentMethods: [] } },
      { addTypename: false }
    );

    const { getByText, queryByText, asFragment } = render(
      <StaticRouter>
        <MockedProvider mocks={[emptyPaymentMethodsMock]}>
          <PaymentInfoStep account={account} currency="USD" onComplete={jest.fn()} />
        </MockedProvider>
      </StaticRouter>
    );

    await actNextTick();

    userEvent.click(getByText(PAY));

    expect(queryByText("payment-page.error.invalid-amount")).toBeInTheDocument();
    expect(queryByText("payment-page.card-selection.error.select-a-card")).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();

    enterTestAmount();
    userEvent.click(getByText(PAY));

    expect(queryByText("payment-page.error.invalid-amount")).not.toBeInTheDocument();
    expect(queryByText("payment-page.card-selection.error.select-a-card")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should use the initial data to populate values", async () => {
    const onComplete = jest.fn();
    const initialData: Omit<PaymentInfo, "total"> = {
      amount: 10000,
      tipAmount: 1500,
      tipPercentage: 15,
      paymentMethod: CreditCard,
    };

    const { getByText, asFragment } = render(
      <StaticRouter>
        <MockedProvider mocks={[paymentMethodsMock]}>
          <PaymentInfoStep account={account} currency="USD" onComplete={onComplete} initialData={initialData} />
        </MockedProvider>
      </StaticRouter>
    );

    await actNextTick();

    expect(getByText("15%")).toBeInTheDocument();
    expect(getByText("$115.00")).toBeInTheDocument();
    expect(getByText(`**** ${CreditCard.lastFour}`)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();

    userEvent.click(getByText(PAY));

    expect(onComplete).toBeCalledWith({
      tipAmount: 1500,
      tipPercentage: 15,
      total: 11500,
      amount: 10000,
      paymentMethod: CreditCard,
    });
  });

  it("should display zero if the value is cleared out", async () => {
    const { getByText, getByTestId, asFragment } = render(
      <StaticRouter>
        <MockedProvider mocks={[paymentMethodsMock]}>
          <PaymentInfoStep account={account} currency="USD" onComplete={jest.fn()} />
        </MockedProvider>
      </StaticRouter>
    );

    userEvent.click(getByTestId("amount-input"));

    // enter amount
    userEvent.click(getByText("1"));
    userEvent.click(getByText("0"));

    // clear it
    userEvent.click(getByTestId("backspace-icon"));
    userEvent.click(getByTestId("backspace-icon"));

    // should display zero, not NaN or something else
    expect(getByText("$0.00")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
