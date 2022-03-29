import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StaticRouter } from "react-router";
import i18n from "i18n";
import { MockedProvider } from "@apollo/client/testing";
import createApolloMock from "generated/createApolloMock";
import { GetMyAssetsAndMetricsDocument } from "generated/graphql";
import { actNextTick, enterValueInCalculator } from "utils/test-helpers";
import { ChooseAmountSend } from "./ChooseAmountSend";
import { MutableSnapshot, RecoilRoot } from "recoil";
import { sendFlowCurrentState } from "../sendFlowUtils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ cryptoId: "BTC" }),
}));

i18n.options.react = {
  useSuspense: false,
};

const MIN_LIMIT_MESSAGE = "crypto-wallet.send.choose-amount.min-limit";
const INSUFFICIENT_BALANCE_MESSAGE = "crypto-wallet.send.choose-amount.insufficient-balance";

const myAssetsAndMetricsMock = createApolloMock(
  GetMyAssetsAndMetricsDocument,
  {
    assetName: "BTC",
    currency: "USD",
  },
  {
    data: {
      myAssets: [
        {
          code: "BTC",
          fiatAmount: {
            major: 1000,
          },
        },
      ],
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
  set(sendFlowCurrentState, {
    currency: "BTC",
    payload: {
      fiatAmount: 0,
      cryptoAmount: "",
      fiatCurrencyCode: "",
    },
    email: "",
    transactionId: "",
  });
}

const renderWithProviders = (children: React.ReactElement) =>
  render(
    <StaticRouter>
      <MockedProvider mocks={[myAssetsAndMetricsMock]} addTypename={false}>
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      </MockedProvider>
    </StaticRouter>
  );

describe("ChooseAmountSend", () => {
  it("should show insufficient balance message when amount available", async () => {
    const onComplete = jest.fn();
    const { getByText, queryByText } = renderWithProviders(<ChooseAmountSend />);

    // wait twice for lazy query
    await actNextTick();
    await actNextTick();

    enterValueInCalculator("1001");

    userEvent.click(getByText("global.continue"));
    expect(onComplete).not.toBeCalled();
    expect(queryByText(INSUFFICIENT_BALANCE_MESSAGE)).toBeInTheDocument();
    expect(queryByText(MIN_LIMIT_MESSAGE)).not.toBeInTheDocument();
  });

  it("should show min limit message when amount > minimum allowed", async () => {
    const onComplete = jest.fn();
    const { getByText, queryByText } = renderWithProviders(<ChooseAmountSend />);

    // wait twice for lazy query
    await actNextTick();
    await actNextTick();

    enterValueInCalculator("0.99");

    userEvent.click(getByText("global.continue"));
    expect(onComplete).not.toBeCalled();
    expect(queryByText(MIN_LIMIT_MESSAGE)).toBeInTheDocument();
    expect(queryByText(INSUFFICIENT_BALANCE_MESSAGE)).not.toBeInTheDocument();
  });

  it("should show min limit message when user didn't enter amount", async () => {
    const onComplete = jest.fn();
    const { getByText, queryByText } = renderWithProviders(<ChooseAmountSend />);

    // wait twice for lazy query
    await actNextTick();
    await actNextTick();

    userEvent.click(getByText("global.continue"));
    expect(onComplete).not.toBeCalled();
    expect(queryByText(MIN_LIMIT_MESSAGE)).toBeInTheDocument();
    expect(queryByText(INSUFFICIENT_BALANCE_MESSAGE)).not.toBeInTheDocument();
  });
});
