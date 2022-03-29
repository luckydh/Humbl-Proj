import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MutableSnapshot, RecoilRoot, snapshot_UNSTABLE } from "recoil";
import { StaticRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { buyingFlowAmountState, buyingFlowOrderState } from "../atoms";
import createApolloMock from "generated/createApolloMock";
import { CreateCardOrderReservationDocument, GetCryptoPurchaseMethodsDocument } from "generated/graphql";
import PaymentMethodContainer from "./PaymentMethodContainer";
import i18n from "i18n";
import { layersListState } from "components/Layers/atoms";

if (i18n.options) {
  i18n.options.react = {
    useSuspense: false,
  };
}

const purchaseMethodsMock = createApolloMock(
  GetCryptoPurchaseMethodsDocument,
  {},
  {
    data: {
      cards: [
        {
          id: "card-1234",
          expirationDate: "05 / 25",
          lastFour: "1234",
          cardBrand: {
            id: "visa",
            image: "",
            display: "Visa",
          },
        },
      ],
      assets: [
        {
          code: "ETH",
          name: "Ethereum",
          logoImage: "",
          fiatAmount: {
            display: "$50.00",
          },
        },
      ],
    },
  }
);

const createCardOrderReservationMock = createApolloMock(
  CreateCardOrderReservationDocument,
  {
    sourceAmount: 50,
    sourceCurrency: "USD",
    destinationCurrency: "BTC",
  },
  {
    data: {
      createCardOrderReservation: {
        reservationId: "reservation-1234",
      },
    },
  }
);

function renderWithProviders(ui: React.ReactElement) {
  return render(ui, {
    wrapper: ({ children }) => (
      <MockedProvider mocks={[purchaseMethodsMock, createCardOrderReservationMock]}>
        <StaticRouter>
          <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
        </StaticRouter>
      </MockedProvider>
    ),
  });
}

function initializeState({ set }: MutableSnapshot) {
  set(layersListState, [{ id: "cryptoWalletBuyingFlow", props: {} }]);
  set(buyingFlowAmountState, {
    destinationFiatAmount: 50,
    destinationCryptoAmount: "0.00001234",
  });
}

describe("PaymentMethodContainer", () => {
  it("should render the purchase methods from query", () => {
    const { getByText } = renderWithProviders(<PaymentMethodContainer onGoBack={jest.fn()} onComplete={jest.fn()} />);

    waitFor(() => {
      expect(getByText("Visa")).toBeInTheDocument();
      expect(getByText("Ethereum")).toBeInTheDocument();
    });
  });

  it("should create a reservation and save state on submit", () => {
    const onComplete = jest.fn();
    const { getByText, getByTestId, getByRole } = renderWithProviders(
      <PaymentMethodContainer onComplete={onComplete} onGoBack={jest.fn()} />
    );

    // wait for query
    waitFor(() => {
      userEvent.click(getByText("Visa"));
      userEvent.type(getByRole("textbox"), "123");
      userEvent.click(getByText("global.continue"));
      expect(getByTestId("overlay-loading")).toBeInTheDocument();
    });

    // wait for mutation
    waitFor(() => {
      expect(onComplete).toBeCalled();

      const testSnapshot = snapshot_UNSTABLE();
      expect(testSnapshot.getLoadable(buyingFlowOrderState).valueOrThrow()).toBe({
        cvvConfirmation: "123",
        paymentMethodId: "card-1234",
        reservationId: "reservation-1234",
      });
    });
  });

  it("should call onGoBack function when clicking back", () => {
    const onGoBack = jest.fn();
    const { getByTestId } = renderWithProviders(<PaymentMethodContainer onComplete={jest.fn()} onGoBack={onGoBack} />);

    waitFor(() => {
      userEvent.click(getByTestId("layout-modal-close"));
      expect(onGoBack).toBeCalled();
    });
  });
});
