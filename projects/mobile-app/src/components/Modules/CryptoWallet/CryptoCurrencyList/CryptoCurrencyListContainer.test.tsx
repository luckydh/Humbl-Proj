import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import createApolloMock from "generated/createApolloMock";
import { GetMarketListDocument } from "generated/graphql";
import React from "react";
import { CryptoCurrencyListTabContainer } from "./CryptoCurrencyListTabContainer";
import i18n from "../../../../i18n";
import { GraphQLError } from "graphql";

if (i18n.options) {
  i18n.options.lng = "en";
  i18n.options.react = {
    useSuspense: false,
  };
}

describe("Crypo Market List Container Widget", () => {
  it("Render Crypto Currency List Container Loading State", async () => {
    const mockGetMarketList = createApolloMock(
      GetMarketListDocument,
      {},
      { data: { getMarketList: { assets: [] } } },
      { addTypename: false }
    );
    const { getByTestId } = render(
      <MockedProvider mocks={[mockGetMarketList]}>
        <CryptoCurrencyListTabContainer />
      </MockedProvider>
    );
    expect(getByTestId("crypto-currency-list-skeleton")).toBeInTheDocument();
  });
  it("Render Crypto Currency List Container Error State", async () => {
    const mockGetMarketList = createApolloMock(
      GetMarketListDocument,
      {},
      {
        data: { getMarketList: {} },
        errors: [new GraphQLError("An error occurred")],
      },
      { addTypename: false }
    );
    const { getByText } = render(
      <MockedProvider mocks={[mockGetMarketList]}>
        <CryptoCurrencyListTabContainer />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(getByText("widget.error.generic-loading-error")).toBeInTheDocument();
    });
  });

  it("Render Crypto Currency List Container with Data", async () => {
    // Set Feature Flag
    const mockGetMarketList = createApolloMock(
      GetMarketListDocument,
      { limit: 4 },
      {
        data: {
          getMarketList: {
            assets: [
              {
                currency: "USD",
                name: "Bitcoin",
                code: "BTC",
                logoImage:
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIHZpZXdCb3g9IjAgMCA1MSA1MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMV9kKSI+CjxwYXRoIGQ9Ik00Ni4zNTY0IDI5LjcwMUM0My40ODQ2IDQxLjIxODkgMzEuODE3NiA0OC4yMjg1IDIwLjI5NyA0NS4zNTYzQzguNzgxMjcgNDIuNDg0OCAxLjc3MDkyIDMwLjgxODMgNC42NDM5NiAxOS4zMDEyQzcuNTE0NDkgNy43ODIwMSAxOS4xODE2IDAuNzcxODczIDMwLjY5ODUgMy42NDMzNUM0Mi4yMTgzIDYuNTE0ODMgNDkuMjI4NSAxOC4xODI1IDQ2LjM1NjQgMjkuNzAxWiIgZmlsbD0iI0Y3OTMxQSIvPgo8L2c+CjxwYXRoIGQ9Ik0zNS4yMTY1IDIxLjgxODVDMzUuNjYzOCAxOC45NDMzIDMzLjM4NzEgMTcuMzk3NyAzMC4yNzM4IDE2LjM2NjZMMzEuMjgzOCAxMi40NzE4TDI4LjgxNzkgMTEuODgxMUwyNy44MzQ3IDE1LjY3MzNDMjcuMTg2NCAxNS41MTc5IDI2LjUyMDcgMTUuMzcxNCAyNS44NTkgMTUuMjI2MkwyNi44NDkzIDExLjQwODlMMjQuMzg1IDEwLjgxODFMMjMuMzc0NSAxNC43MTE3QzIyLjgzOCAxNC41OTQyIDIyLjMxMTEgMTQuNDc4MiAyMS43OTk5IDE0LjM1NTlMMjEuODAyOCAxNC4zNDM2TDE4LjQwMjMgMTMuNTI3MkwxNy43NDYzIDE2LjA1OTRDMTcuNzQ2MyAxNi4wNTk0IDE5LjU3NTggMTYuNDYyNiAxOS41MzczIDE2LjQ4NzVDMjAuNTM1OCAxNi43MjcxIDIwLjcxNjQgMTcuMzYyNiAyMC42ODY0IDE3Ljg2NjRMMTkuNTM1OSAyMi4zMDM1QzE5LjYwNDcgMjIuMzIwMyAxOS42OTM5IDIyLjM0NDYgMTkuNzkyMyAyMi4zODI2QzE5LjcxIDIyLjM2MyAxOS42MjI1IDIyLjM0MTUgMTkuNTMxNyAyMi4zMjA2TDE3LjkxOTEgMjguNTM2NEMxNy43OTcxIDI4LjgyODEgMTcuNDg3MyAyOS4yNjU4IDE2Ljc4OTIgMjkuMDk5NkMxNi44MTM5IDI5LjEzNCAxNC45OTcgMjguNjY5NSAxNC45OTcgMjguNjY5NUwxMy43NzI3IDMxLjM4MzVMMTYuOTgxNiAzMi4xNTI2QzE3LjU3ODYgMzIuMjk2NSAxOC4xNjM2IDMyLjQ0NzEgMTguNzM5NyAzMi41ODg4TDE3LjcxOTMgMzYuNTI4MkwyMC4xODIzIDM3LjExOUwyMS4xOTI5IDMzLjIyMTNDMjEuODY1NyAzMy4zOTcgMjIuNTE4NyAzMy41NTkgMjMuMTU4IDMzLjcxMTdMMjIuMTUwOSAzNy41OTFMMjQuNjE2OSAzOC4xODE3TDI1LjYzNzIgMzQuMjQ5N0MyOS44NDIgMzUuMDE0OCAzMy4wMDM3IDM0LjcwNjMgMzQuMzM0NSAzMS4wNDk1QzM1LjQwNjkgMjguMTA1NCAzNC4yODExIDI2LjQwNzIgMzIuMDY5IDI1LjI5OThDMzMuNjgwMiAyNC45NDI1IDM0Ljg5MzggMjMuOTIzNiAzNS4yMTc0IDIxLjgxODlMMzUuMjE2NiAyMS44MTgzTDM1LjIxNjUgMjEuODE4NVpNMjkuNTgyNiAyOS40MTQ1QzI4LjgyMDUgMzIuMzU4NiAyMy42NjQ5IDMwLjc2NzEgMjEuOTkzNCAzMC4zNjhMMjMuMzQ3NSAyNS4xNDg5QzI1LjAxODkgMjUuNTUwMSAzMC4zNzkgMjYuMzQ0MSAyOS41ODI3IDI5LjQxNDVIMjkuNTgyNlpNMzAuMzQ1MiAyMS43NzU5QzI5LjY1IDI0LjQ1MzkgMjUuMzU4OSAyMy4wOTMzIDIzLjk2NyAyMi43NTk3TDI1LjE5NDYgMTguMDI2M0MyNi41ODY2IDE4LjM1OTkgMzEuMDY5NCAxOC45ODI2IDMwLjM0NTQgMjEuNzc1OUgzMC4zNDUyWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPGZpbHRlciBpZD0iZmlsdGVyMV9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K",
                price: 34524.10862531295,
                percentChangeOverPeriod: -0.0398514356744713,
                __typename: "AssetMetricType",
              },
              {
                currency: "USD",
                name: "Ethereum",
                code: "ETH",
                logoImage:
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAzNCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBkPSJNMTYuODkzIDNMMTYuNjExMSAzLjk1NzIzVjMxLjczMTRMMTYuODkzIDMyLjAxMjVMMjkuNzg1MSAyNC4zOTE4TDE2Ljg5MyAzWiIgZmlsbD0iIzM0MzQzNCIvPgo8cGF0aCBkPSJNMTYuODkyNSAzTDQgMjQuMzkxOEwxNi44OTI1IDMyLjAxMjVWMTguNTMxN1YzWiIgZmlsbD0iIzhDOEM4QyIvPgo8cGF0aCBkPSJNMTYuODkzIDM0LjQ0OUwxNi43MzQyIDM0LjY0MjdWNDQuNTM2M0wxNi44OTMgNDQuOTk5OUwyOS43OTMxIDI2LjgzMjNMMTYuODkzIDM0LjQ0OVoiIGZpbGw9IiMzQzNDM0IiLz4KPHBhdGggZD0iTTE2Ljg5MjUgNDQuOTk5OVYzNC40NDlMNCAyNi44MzIzTDE2Ljg5MjUgNDQuOTk5OVoiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTE2Ljg5MyAzMi4wMTcyTDI5Ljc4NTIgMjQuMzk2NUwxNi44OTMgMTguNTM2NFYzMi4wMTcyWiIgZmlsbD0iIzE0MTQxNCIvPgo8cGF0aCBkPSJNNCAyNC4zOTY1TDE2Ljg5MjUgMzIuMDE3MlYxOC41MzY0TDQgMjQuMzk2NVoiIGZpbGw9IiMzOTM5MzkiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzMuNzkzMSIgaGVpZ2h0PSI0OS45OTk5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldCBkeT0iMSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==",
                price: 2351.990496304068,
                percentChangeOverPeriod: 2.5393917737152845,
                __typename: "AssetMetricType",
              },
            ],
          },
        },
      },
      {
        addTypename: false,
      }
    );
    const { container, getByText } = render(
      <MockedProvider mocks={[mockGetMarketList]}>
        <CryptoCurrencyListTabContainer />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(container.querySelector("#cryptocurrencylist")?.childNodes.length).toBe(2);
      expect(getByText("button.text.see-all")).toBeInTheDocument();
      expect(getByText("BTC")).toBeInTheDocument();
      expect(getByText("0.04%")).toBeInTheDocument();
      expect(getByText("Bitcoin")).toBeInTheDocument();
    });
  });

  it("Render Crypto Currency and only show first 4 if more passed in.", async () => {
    // Set Feature Flag
    const mockGetMarketList = createApolloMock(
      GetMarketListDocument,
      { limit: 4 },
      {
        data: {
          getMarketList: {
            assets: [
              {
                currency: "USD",
                name: "Bitcoin",
                code: "BTC",
                logoImage:
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIHZpZXdCb3g9IjAgMCA1MSA1MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMV9kKSI+CjxwYXRoIGQ9Ik00Ni4zNTY0IDI5LjcwMUM0My40ODQ2IDQxLjIxODkgMzEuODE3NiA0OC4yMjg1IDIwLjI5NyA0NS4zNTYzQzguNzgxMjcgNDIuNDg0OCAxLjc3MDkyIDMwLjgxODMgNC42NDM5NiAxOS4zMDEyQzcuNTE0NDkgNy43ODIwMSAxOS4xODE2IDAuNzcxODczIDMwLjY5ODUgMy42NDMzNUM0Mi4yMTgzIDYuNTE0ODMgNDkuMjI4NSAxOC4xODI1IDQ2LjM1NjQgMjkuNzAxWiIgZmlsbD0iI0Y3OTMxQSIvPgo8L2c+CjxwYXRoIGQ9Ik0zNS4yMTY1IDIxLjgxODVDMzUuNjYzOCAxOC45NDMzIDMzLjM4NzEgMTcuMzk3NyAzMC4yNzM4IDE2LjM2NjZMMzEuMjgzOCAxMi40NzE4TDI4LjgxNzkgMTEuODgxMUwyNy44MzQ3IDE1LjY3MzNDMjcuMTg2NCAxNS41MTc5IDI2LjUyMDcgMTUuMzcxNCAyNS44NTkgMTUuMjI2MkwyNi44NDkzIDExLjQwODlMMjQuMzg1IDEwLjgxODFMMjMuMzc0NSAxNC43MTE3QzIyLjgzOCAxNC41OTQyIDIyLjMxMTEgMTQuNDc4MiAyMS43OTk5IDE0LjM1NTlMMjEuODAyOCAxNC4zNDM2TDE4LjQwMjMgMTMuNTI3MkwxNy43NDYzIDE2LjA1OTRDMTcuNzQ2MyAxNi4wNTk0IDE5LjU3NTggMTYuNDYyNiAxOS41MzczIDE2LjQ4NzVDMjAuNTM1OCAxNi43MjcxIDIwLjcxNjQgMTcuMzYyNiAyMC42ODY0IDE3Ljg2NjRMMTkuNTM1OSAyMi4zMDM1QzE5LjYwNDcgMjIuMzIwMyAxOS42OTM5IDIyLjM0NDYgMTkuNzkyMyAyMi4zODI2QzE5LjcxIDIyLjM2MyAxOS42MjI1IDIyLjM0MTUgMTkuNTMxNyAyMi4zMjA2TDE3LjkxOTEgMjguNTM2NEMxNy43OTcxIDI4LjgyODEgMTcuNDg3MyAyOS4yNjU4IDE2Ljc4OTIgMjkuMDk5NkMxNi44MTM5IDI5LjEzNCAxNC45OTcgMjguNjY5NSAxNC45OTcgMjguNjY5NUwxMy43NzI3IDMxLjM4MzVMMTYuOTgxNiAzMi4xNTI2QzE3LjU3ODYgMzIuMjk2NSAxOC4xNjM2IDMyLjQ0NzEgMTguNzM5NyAzMi41ODg4TDE3LjcxOTMgMzYuNTI4MkwyMC4xODIzIDM3LjExOUwyMS4xOTI5IDMzLjIyMTNDMjEuODY1NyAzMy4zOTcgMjIuNTE4NyAzMy41NTkgMjMuMTU4IDMzLjcxMTdMMjIuMTUwOSAzNy41OTFMMjQuNjE2OSAzOC4xODE3TDI1LjYzNzIgMzQuMjQ5N0MyOS44NDIgMzUuMDE0OCAzMy4wMDM3IDM0LjcwNjMgMzQuMzM0NSAzMS4wNDk1QzM1LjQwNjkgMjguMTA1NCAzNC4yODExIDI2LjQwNzIgMzIuMDY5IDI1LjI5OThDMzMuNjgwMiAyNC45NDI1IDM0Ljg5MzggMjMuOTIzNiAzNS4yMTc0IDIxLjgxODlMMzUuMjE2NiAyMS44MTgzTDM1LjIxNjUgMjEuODE4NVpNMjkuNTgyNiAyOS40MTQ1QzI4LjgyMDUgMzIuMzU4NiAyMy42NjQ5IDMwLjc2NzEgMjEuOTkzNCAzMC4zNjhMMjMuMzQ3NSAyNS4xNDg5QzI1LjAxODkgMjUuNTUwMSAzMC4zNzkgMjYuMzQ0MSAyOS41ODI3IDI5LjQxNDVIMjkuNTgyNlpNMzAuMzQ1MiAyMS43NzU5QzI5LjY1IDI0LjQ1MzkgMjUuMzU4OSAyMy4wOTMzIDIzLjk2NyAyMi43NTk3TDI1LjE5NDYgMTguMDI2M0MyNi41ODY2IDE4LjM1OTkgMzEuMDY5NCAxOC45ODI2IDMwLjM0NTQgMjEuNzc1OUgzMC4zNDUyWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPGZpbHRlciBpZD0iZmlsdGVyMV9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K",
                price: 34524.10862531295,
                percentChangeOverPeriod: -0.0398514356744713,
                __typename: "AssetMetricType",
              },
              {
                currency: "USD",
                name: "Ethereum",
                code: "ETH1",
                logoImage:
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAzNCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBkPSJNMTYuODkzIDNMMTYuNjExMSAzLjk1NzIzVjMxLjczMTRMMTYuODkzIDMyLjAxMjVMMjkuNzg1MSAyNC4zOTE4TDE2Ljg5MyAzWiIgZmlsbD0iIzM0MzQzNCIvPgo8cGF0aCBkPSJNMTYuODkyNSAzTDQgMjQuMzkxOEwxNi44OTI1IDMyLjAxMjVWMTguNTMxN1YzWiIgZmlsbD0iIzhDOEM4QyIvPgo8cGF0aCBkPSJNMTYuODkzIDM0LjQ0OUwxNi43MzQyIDM0LjY0MjdWNDQuNTM2M0wxNi44OTMgNDQuOTk5OUwyOS43OTMxIDI2LjgzMjNMMTYuODkzIDM0LjQ0OVoiIGZpbGw9IiMzQzNDM0IiLz4KPHBhdGggZD0iTTE2Ljg5MjUgNDQuOTk5OVYzNC40NDlMNCAyNi44MzIzTDE2Ljg5MjUgNDQuOTk5OVoiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTE2Ljg5MyAzMi4wMTcyTDI5Ljc4NTIgMjQuMzk2NUwxNi44OTMgMTguNTM2NFYzMi4wMTcyWiIgZmlsbD0iIzE0MTQxNCIvPgo8cGF0aCBkPSJNNCAyNC4zOTY1TDE2Ljg5MjUgMzIuMDE3MlYxOC41MzY0TDQgMjQuMzk2NVoiIGZpbGw9IiMzOTM5MzkiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzMuNzkzMSIgaGVpZ2h0PSI0OS45OTk5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldCBkeT0iMSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==",
                price: 2351.990496304068,
                percentChangeOverPeriod: 2.5393917737152845,
                __typename: "AssetMetricType",
              },
              {
                currency: "USD",
                name: "Ethereum",
                code: "ETH2",
                logoImage:
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAzNCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBkPSJNMTYuODkzIDNMMTYuNjExMSAzLjk1NzIzVjMxLjczMTRMMTYuODkzIDMyLjAxMjVMMjkuNzg1MSAyNC4zOTE4TDE2Ljg5MyAzWiIgZmlsbD0iIzM0MzQzNCIvPgo8cGF0aCBkPSJNMTYuODkyNSAzTDQgMjQuMzkxOEwxNi44OTI1IDMyLjAxMjVWMTguNTMxN1YzWiIgZmlsbD0iIzhDOEM4QyIvPgo8cGF0aCBkPSJNMTYuODkzIDM0LjQ0OUwxNi43MzQyIDM0LjY0MjdWNDQuNTM2M0wxNi44OTMgNDQuOTk5OUwyOS43OTMxIDI2LjgzMjNMMTYuODkzIDM0LjQ0OVoiIGZpbGw9IiMzQzNDM0IiLz4KPHBhdGggZD0iTTE2Ljg5MjUgNDQuOTk5OVYzNC40NDlMNCAyNi44MzIzTDE2Ljg5MjUgNDQuOTk5OVoiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTE2Ljg5MyAzMi4wMTcyTDI5Ljc4NTIgMjQuMzk2NUwxNi44OTMgMTguNTM2NFYzMi4wMTcyWiIgZmlsbD0iIzE0MTQxNCIvPgo8cGF0aCBkPSJNNCAyNC4zOTY1TDE2Ljg5MjUgMzIuMDE3MlYxOC41MzY0TDQgMjQuMzk2NVoiIGZpbGw9IiMzOTM5MzkiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzMuNzkzMSIgaGVpZ2h0PSI0OS45OTk5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldCBkeT0iMSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==",
                price: 2351.990496304068,
                percentChangeOverPeriod: 2.5393917737152845,
                __typename: "AssetMetricType",
              },
              {
                currency: "USD",
                name: "Ethereum",
                code: "ETH3",
                logoImage:
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAzNCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBkPSJNMTYuODkzIDNMMTYuNjExMSAzLjk1NzIzVjMxLjczMTRMMTYuODkzIDMyLjAxMjVMMjkuNzg1MSAyNC4zOTE4TDE2Ljg5MyAzWiIgZmlsbD0iIzM0MzQzNCIvPgo8cGF0aCBkPSJNMTYuODkyNSAzTDQgMjQuMzkxOEwxNi44OTI1IDMyLjAxMjVWMTguNTMxN1YzWiIgZmlsbD0iIzhDOEM4QyIvPgo8cGF0aCBkPSJNMTYuODkzIDM0LjQ0OUwxNi43MzQyIDM0LjY0MjdWNDQuNTM2M0wxNi44OTMgNDQuOTk5OUwyOS43OTMxIDI2LjgzMjNMMTYuODkzIDM0LjQ0OVoiIGZpbGw9IiMzQzNDM0IiLz4KPHBhdGggZD0iTTE2Ljg5MjUgNDQuOTk5OVYzNC40NDlMNCAyNi44MzIzTDE2Ljg5MjUgNDQuOTk5OVoiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTE2Ljg5MyAzMi4wMTcyTDI5Ljc4NTIgMjQuMzk2NUwxNi44OTMgMTguNTM2NFYzMi4wMTcyWiIgZmlsbD0iIzE0MTQxNCIvPgo8cGF0aCBkPSJNNCAyNC4zOTY1TDE2Ljg5MjUgMzIuMDE3MlYxOC41MzY0TDQgMjQuMzk2NVoiIGZpbGw9IiMzOTM5MzkiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzMuNzkzMSIgaGVpZ2h0PSI0OS45OTk5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldCBkeT0iMSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==",
                price: 2351.990496304068,
                percentChangeOverPeriod: 2.5393917737152845,
                __typename: "AssetMetricType",
              },
              {
                currency: "USD",
                name: "Ethereum",
                code: "ETH4",
                logoImage:
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAzNCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBkPSJNMTYuODkzIDNMMTYuNjExMSAzLjk1NzIzVjMxLjczMTRMMTYuODkzIDMyLjAxMjVMMjkuNzg1MSAyNC4zOTE4TDE2Ljg5MyAzWiIgZmlsbD0iIzM0MzQzNCIvPgo8cGF0aCBkPSJNMTYuODkyNSAzTDQgMjQuMzkxOEwxNi44OTI1IDMyLjAxMjVWMTguNTMxN1YzWiIgZmlsbD0iIzhDOEM4QyIvPgo8cGF0aCBkPSJNMTYuODkzIDM0LjQ0OUwxNi43MzQyIDM0LjY0MjdWNDQuNTM2M0wxNi44OTMgNDQuOTk5OUwyOS43OTMxIDI2LjgzMjNMMTYuODkzIDM0LjQ0OVoiIGZpbGw9IiMzQzNDM0IiLz4KPHBhdGggZD0iTTE2Ljg5MjUgNDQuOTk5OVYzNC40NDlMNCAyNi44MzIzTDE2Ljg5MjUgNDQuOTk5OVoiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTE2Ljg5MyAzMi4wMTcyTDI5Ljc4NTIgMjQuMzk2NUwxNi44OTMgMTguNTM2NFYzMi4wMTcyWiIgZmlsbD0iIzE0MTQxNCIvPgo8cGF0aCBkPSJNNCAyNC4zOTY1TDE2Ljg5MjUgMzIuMDE3MlYxOC41MzY0TDQgMjQuMzk2NVoiIGZpbGw9IiMzOTM5MzkiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzMuNzkzMSIgaGVpZ2h0PSI0OS45OTk5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldCBkeT0iMSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==",
                price: 2351.990496304068,
                percentChangeOverPeriod: 2.5393917737152845,
                __typename: "AssetMetricType",
              },
              {
                currency: "USD",
                name: "Ethereum",
                code: "ETH5",
                logoImage:
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAzNCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBkPSJNMTYuODkzIDNMMTYuNjExMSAzLjk1NzIzVjMxLjczMTRMMTYuODkzIDMyLjAxMjVMMjkuNzg1MSAyNC4zOTE4TDE2Ljg5MyAzWiIgZmlsbD0iIzM0MzQzNCIvPgo8cGF0aCBkPSJNMTYuODkyNSAzTDQgMjQuMzkxOEwxNi44OTI1IDMyLjAxMjVWMTguNTMxN1YzWiIgZmlsbD0iIzhDOEM4QyIvPgo8cGF0aCBkPSJNMTYuODkzIDM0LjQ0OUwxNi43MzQyIDM0LjY0MjdWNDQuNTM2M0wxNi44OTMgNDQuOTk5OUwyOS43OTMxIDI2LjgzMjNMMTYuODkzIDM0LjQ0OVoiIGZpbGw9IiMzQzNDM0IiLz4KPHBhdGggZD0iTTE2Ljg5MjUgNDQuOTk5OVYzNC40NDlMNCAyNi44MzIzTDE2Ljg5MjUgNDQuOTk5OVoiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTE2Ljg5MyAzMi4wMTcyTDI5Ljc4NTIgMjQuMzk2NUwxNi44OTMgMTguNTM2NFYzMi4wMTcyWiIgZmlsbD0iIzE0MTQxNCIvPgo8cGF0aCBkPSJNNCAyNC4zOTY1TDE2Ljg5MjUgMzIuMDE3MlYxOC41MzY0TDQgMjQuMzk2NVoiIGZpbGw9IiMzOTM5MzkiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzMuNzkzMSIgaGVpZ2h0PSI0OS45OTk5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldCBkeT0iMSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==",
                price: 2351.990496304068,
                percentChangeOverPeriod: 2.5393917737152845,
                __typename: "AssetMetricType",
              },
            ],
          },
        },
      },
      {
        addTypename: false,
      }
    );
    const { container, getByText } = render(
      <MockedProvider mocks={[mockGetMarketList]}>
        <CryptoCurrencyListTabContainer />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(container.querySelector("#cryptocurrencylist")?.childNodes.length).toBe(4);
      expect(getByText("0.04%")).toBeInTheDocument();
      expect(getByText("BTC")).toBeInTheDocument();
      expect(getByText("Bitcoin")).toBeInTheDocument();
      expect(getByText("ETH1")).toBeInTheDocument();
    });
  });
});
