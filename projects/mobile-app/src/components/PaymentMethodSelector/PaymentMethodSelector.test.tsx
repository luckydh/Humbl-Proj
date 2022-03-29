import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router, StaticRouter } from "react-router-dom";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { CreditCard } from "__fixtures__/paymentMethods";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => ({
    t: (string: string) => string,
  }),
  initReactI18next: { type: "3rdParty", init: jest.fn() },
}));

const ADD_A_NEW_CARD = "payment-page.action.add-a-new-card";

describe("PaymentMethodSelector", () => {
  it('should redirect to /cards/add when "Add a New Card" is clicked', () => {
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <PaymentMethodSelector useLegacyPaymentMethodScreen />
      </Router>
    );

    userEvent.click(getByText(ADD_A_NEW_CARD)); // click to add new card

    expect(history.location.pathname).toBe("/cards/add");
  });

  it('should redirect to /cards/add when "Add a New Card" from modal is clicked', () => {
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <PaymentMethodSelector redirectTo="/test" useLegacyPaymentMethodScreen selectedPaymentMethod={CreditCard} />
      </Router>
    );

    userEvent.click(getByText(`**** ${CreditCard.lastFour}`)); // open modal
    userEvent.click(getByText(ADD_A_NEW_CARD)); // click to add new card

    expect(history.location.pathname).toBe("/cards/add");
    expect(history.location.search).toBe("?redirect=/test");
  });

  it("should call onSelect when selecting a new card", () => {
    const onSelect = jest.fn();
    const targetCard = { ...CreditCard, id: "4567", lastFour: "4567" };

    const { getByText } = render(
      <StaticRouter>
        <PaymentMethodSelector
          onSelect={onSelect}
          useLegacyPaymentMethodScreen
          selectedPaymentMethod={CreditCard}
          paymentMethods={[CreditCard, targetCard]}
        />
      </StaticRouter>
    );

    userEvent.click(getByText(`**** ${CreditCard.lastFour}`)); // open modal
    userEvent.click(getByText("Credit - 4567")); // select new card

    expect(onSelect).toBeCalledWith(targetCard);
  });
});
