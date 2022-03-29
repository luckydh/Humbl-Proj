import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StaticRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { AccountType, CreateCompleteTransactionDocument, GetMyPaymentMethodsDocument } from "generated/graphql";
import { actNextTick } from "utils/test-helpers";
import createApolloMock from "generated/createApolloMock";
import i18n from "../../i18n";

import MerchantPayment from "./MerchantPayment";
import * as stripeHandler from "utils/StripeHandler";
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

// const createTransactionMock = createApolloMock(
const createCompleteTransactionMock = createApolloMock(
  // CreateMerchantTransactionDocument,
  CreateCompleteTransactionDocument,
  {
    currency: "USD",
    amount: 10000,
    tip: 0,
    subtotal: 10000,
    methodUsed: CreditCard.id,
    destinationAccountTag: account.id,
  },
  {
    data: {
      // createChargeCardTransaction: {},
      createCompleteTransaction: {
        intentSecret: "1",
      },
    },
  },
  {
    addTypename: false,
  }
);

const confirmPaymentIntentDummyResponse = {
  status: true,
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/ban-types
    analytics: {};
  }
}

describe("MerchantPayment", () => {
  it("should transition correctly between steps", async () => {
    const { getByText, getByTestId } = render(
      <StaticRouter>
        <MockedProvider addTypename={false} mocks={[createCompleteTransactionMock, paymentMethodsMock]}>
          <MerchantPayment account={account} />
        </MockedProvider>
      </StaticRouter>
    );

    await actNextTick();
    jest
      .spyOn(stripeHandler, "confirmPaymentIntent")
      .mockImplementation(() => Promise.resolve(confirmPaymentIntentDummyResponse));
    // payment info step
    expect(getByText("payment-page.action.pay")).toBeInTheDocument();

    // enter amount
    userEvent.click(getByTestId("amount-input"));
    userEvent.click(screen.getByText("1"));
    userEvent.click(screen.getByText("0"));
    userEvent.click(screen.getByText("0"));
    userEvent.click(screen.getByText("0"));
    userEvent.click(screen.getByText("0"));
    userEvent.click(screen.getByText("Enter"));

    // click continue
    userEvent.click(screen.getByText("payment-page.action.pay"));

    // payment confirm step
    expect(getByText("payment-page.action.confirm-and-pay")).toBeInTheDocument();

    // click confirm
    userEvent.click(getByText("payment-page.action.confirm-and-pay"));

    await actNextTick();

    // payment success step
    expect(getByTestId("checkmark")).toBeInTheDocument();
  });
});
