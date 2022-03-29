import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StaticRouter } from "react-router";
import i18n from "i18n";
import { MockedProvider } from "@apollo/client/testing";
import { RecoilRoot, MutableSnapshot } from "recoil";
import createApolloMock from "generated/createApolloMock";
import { GetCryptoAssetMetricsDocument } from "generated/graphql";
import { actNextTick, enterValueInCalculator } from "utils/test-helpers";
import { ChooseAmountContainer } from "./ChooseAmountContainer";
import { layersListState } from "components/Layers/atoms";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ currency: "BTC" }),
}));

i18n.options.react = {
  useSuspense: false,
};

const MIN_LIMIT_MESSAGE = "crypto-wallet.buy.choose-amount.min-limit";
const MAX_LIMIT_MESSAGE = "crypto-wallet.buy.choose-amount.max-limit";

const assetMetricsMock = createApolloMock(
  GetCryptoAssetMetricsDocument,
  {
    assetName: "BTC",
  },
  {
    data: {
      getAssetMetrics: {
        price: 32000,
      },
    },
  },
  {
    addTypename: false,
  }
);

function initializeState({ set }: MutableSnapshot) {
  set(layersListState, [{ id: "cryptoWalletBuyingFlow", props: {} }]);
}

const renderWithProviders = (children: React.ReactElement) =>
  render(
    <MockedProvider mocks={[assetMetricsMock]} addTypename={false}>
      <StaticRouter>
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      </StaticRouter>
    </MockedProvider>
  );

describe("ChooseAmountContainer", () => {
  it("should show max limit message when amount < Wyre daily limit", async () => {
    const onComplete = jest.fn();
    const { getByText, queryByText } = renderWithProviders(
      <ChooseAmountContainer onAbort={jest.fn()} onGoBack={jest.fn()} onComplete={onComplete} />
    );

    await actNextTick();

    enterValueInCalculator("150001");

    userEvent.click(getByText("global.continue"));
    expect(onComplete).not.toBeCalled();
    expect(queryByText(MAX_LIMIT_MESSAGE)).toBeInTheDocument();
    expect(queryByText(MIN_LIMIT_MESSAGE)).not.toBeInTheDocument();
  });

  it("should show min limit message when amount > minimum allowed", async () => {
    const onComplete = jest.fn();
    const { getByText, queryByText } = renderWithProviders(
      <ChooseAmountContainer onAbort={jest.fn()} onGoBack={jest.fn()} onComplete={onComplete} />
    );

    await actNextTick();

    enterValueInCalculator("0.99");

    userEvent.click(getByText("global.continue"));
    expect(onComplete).not.toBeCalled();
    expect(queryByText(MIN_LIMIT_MESSAGE)).toBeInTheDocument();
    expect(queryByText(MAX_LIMIT_MESSAGE)).not.toBeInTheDocument();
  });

  it("should show min limit message when user didn't enter amount", async () => {
    const onComplete = jest.fn();
    const { getByText, queryByText } = renderWithProviders(
      <ChooseAmountContainer onAbort={jest.fn()} onGoBack={jest.fn()} onComplete={onComplete} />
    );

    await actNextTick();

    userEvent.click(getByText("global.continue"));
    expect(onComplete).not.toBeCalled();
    expect(queryByText(MIN_LIMIT_MESSAGE)).toBeInTheDocument();
    expect(queryByText(MAX_LIMIT_MESSAGE)).not.toBeInTheDocument();
  });
});
