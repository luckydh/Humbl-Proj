// import React from "react";

// import { MockedProvider } from "@apollo/client/testing";
// import { render, waitFor } from "@testing-library/react";
// import createApolloMock from "generated/createApolloMock";
// import { MyAssetsDocument } from "generated/graphql";

import i18n from "../../../../i18n";
// import { GraphQLError } from "graphql";
// import { MyAssetsWidgetContainer } from "./MyAssetsWidgetContainer";
if (i18n.options) {
  i18n.options.lng = "en";
  i18n.options.react = {
    useSuspense: false,
  };
}

//FIXME: There is currently an issue with babel + jest + D3 // https://github.com/d3/d3/issues/3505

describe("My Assets List Container Widget", () => {
  it.skip("Skip", () => {});
  // it("Render My Assset Container Loading State", async () => {
  //   const mockMyAssets = createApolloMock(
  //     MyAssetsDocument,
  //     {},
  //     { data: { getMarketList: { assets: [] } } },
  //     { addTypename: false }
  //   );
  //   const { getByTestId } = render(
  //     <MockedProvider mocks={[mockMyAssets]}>
  //       <MyAssetsWidgetContainer />
  //     </MockedProvider>
  //   );
  //   expect(getByTestId("crypto-currency-list-skeleton")).toBeInTheDocument();
  // });
  // it("Render My Assets Widget Error State", async () => {
  //   const mockMyAssets = createApolloMock(
  //     MyAssetsDocument,
  //     {},
  //     {
  //       data: { getMarketList: {} },
  //       errors: [new GraphQLError("An error occurred")],
  //     },
  //     { addTypename: false }
  //   );
  //   const { getByText } = render(
  //     <MockedProvider mocks={[mockMyAssets]}>
  //       <MyAssetsWidgetContainer />
  //     </MockedProvider>
  //   );
  //   await waitFor(() => {
  //     expect(getByText("widget.error.generic-loading-error")).toBeInTheDocument();
  //   });
  // });
  //   it("Render My Assets Widget Container with Data", async () => {
  //     const mockMyAssets = createApolloMock(
  //       MyAssetsDocument,
  //       { currency: "USD" },
  //       {
  //         data: {
  //           myAssets: [
  //             {
  //               name: "Bitcoin",
  //               code: "BTC",
  //               logoImage:
  //                 "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIHZpZXdCb3g9IjAgMCA1MSA1MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMV9kKSI+CjxwYXRoIGQ9Ik00Ni4zNTY0IDI5LjcwMUM0My40ODQ2IDQxLjIxODkgMzEuODE3NiA0OC4yMjg1IDIwLjI5NyA0NS4zNTYzQzguNzgxMjcgNDIuNDg0OCAxLjc3MDkyIDMwLjgxODMgNC42NDM5NiAxOS4zMDEyQzcuNTE0NDkgNy43ODIwMSAxOS4xODE2IDAuNzcxODczIDMwLjY5ODUgMy42NDMzNUM0Mi4yMTgzIDYuNTE0ODMgNDkuMjI4NSAxOC4xODI1IDQ2LjM1NjQgMjkuNzAxWiIgZmlsbD0iI0Y3OTMxQSIvPgo8L2c+CjxwYXRoIGQ9Ik0zNS4yMTY1IDIxLjgxODVDMzUuNjYzOCAxOC45NDMzIDMzLjM4NzEgMTcuMzk3NyAzMC4yNzM4IDE2LjM2NjZMMzEuMjgzOCAxMi40NzE4TDI4LjgxNzkgMTEuODgxMUwyNy44MzQ3IDE1LjY3MzNDMjcuMTg2NCAxNS41MTc5IDI2LjUyMDcgMTUuMzcxNCAyNS44NTkgMTUuMjI2MkwyNi44NDkzIDExLjQwODlMMjQuMzg1IDEwLjgxODFMMjMuMzc0NSAxNC43MTE3QzIyLjgzOCAxNC41OTQyIDIyLjMxMTEgMTQuNDc4MiAyMS43OTk5IDE0LjM1NTlMMjEuODAyOCAxNC4zNDM2TDE4LjQwMjMgMTMuNTI3MkwxNy43NDYzIDE2LjA1OTRDMTcuNzQ2MyAxNi4wNTk0IDE5LjU3NTggMTYuNDYyNiAxOS41MzczIDE2LjQ4NzVDMjAuNTM1OCAxNi43MjcxIDIwLjcxNjQgMTcuMzYyNiAyMC42ODY0IDE3Ljg2NjRMMTkuNTM1OSAyMi4zMDM1QzE5LjYwNDcgMjIuMzIwMyAxOS42OTM5IDIyLjM0NDYgMTkuNzkyMyAyMi4zODI2QzE5LjcxIDIyLjM2MyAxOS42MjI1IDIyLjM0MTUgMTkuNTMxNyAyMi4zMjA2TDE3LjkxOTEgMjguNTM2NEMxNy43OTcxIDI4LjgyODEgMTcuNDg3MyAyOS4yNjU4IDE2Ljc4OTIgMjkuMDk5NkMxNi44MTM5IDI5LjEzNCAxNC45OTcgMjguNjY5NSAxNC45OTcgMjguNjY5NUwxMy43NzI3IDMxLjM4MzVMMTYuOTgxNiAzMi4xNTI2QzE3LjU3ODYgMzIuMjk2NSAxOC4xNjM2IDMyLjQ0NzEgMTguNzM5NyAzMi41ODg4TDE3LjcxOTMgMzYuNTI4MkwyMC4xODIzIDM3LjExOUwyMS4xOTI5IDMzLjIyMTNDMjEuODY1NyAzMy4zOTcgMjIuNTE4NyAzMy41NTkgMjMuMTU4IDMzLjcxMTdMMjIuMTUwOSAzNy41OTFMMjQuNjE2OSAzOC4xODE3TDI1LjYzNzIgMzQuMjQ5N0MyOS44NDIgMzUuMDE0OCAzMy4wMDM3IDM0LjcwNjMgMzQuMzM0NSAzMS4wNDk1QzM1LjQwNjkgMjguMTA1NCAzNC4yODExIDI2LjQwNzIgMzIuMDY5IDI1LjI5OThDMzMuNjgwMiAyNC45NDI1IDM0Ljg5MzggMjMuOTIzNiAzNS4yMTc0IDIxLjgxODlMMzUuMjE2NiAyMS44MTgzTDM1LjIxNjUgMjEuODE4NVpNMjkuNTgyNiAyOS40MTQ1QzI4LjgyMDUgMzIuMzU4NiAyMy42NjQ5IDMwLjc2NzEgMjEuOTkzNCAzMC4zNjhMMjMuMzQ3NSAyNS4xNDg5QzI1LjAxODkgMjUuNTUwMSAzMC4zNzkgMjYuMzQ0MSAyOS41ODI3IDI5LjQxNDVIMjkuNTgyNlpNMzAuMzQ1MiAyMS43NzU5QzI5LjY1IDI0LjQ1MzkgMjUuMzU4OSAyMy4wOTMzIDIzLjk2NyAyMi43NTk3TDI1LjE5NDYgMTguMDI2M0MyNi41ODY2IDE4LjM1OTkgMzEuMDY5NCAxOC45ODI2IDMwLjM0NTQgMjEuNzc1OUgzMC4zNDUyWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPGZpbHRlciBpZD0iZmlsdGVyMV9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K",
  //               amount: 0.02704556,
  //               fiatAmount: {
  //                 value: 19418.321738217037,
  //                 display: "$194.18",
  //                 major: 194.18321738217037,
  //                 __typename: "ValueDisplay",
  //               },
  //               __typename: "AssetBalanceType",
  //             },
  //             {
  //               name: "Ethereum",
  //               code: "ETH",
  //               logoImage:
  //                 "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAzNCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBkPSJNMTYuODkzIDNMMTYuNjExMSAzLjk1NzIzVjMxLjczMTRMMTYuODkzIDMyLjAxMjVMMjkuNzg1MSAyNC4zOTE4TDE2Ljg5MyAzWiIgZmlsbD0iIzM0MzQzNCIvPgo8cGF0aCBkPSJNMTYuODkyNSAzTDQgMjQuMzkxOEwxNi44OTI1IDMyLjAxMjVWMTguNTMxN1YzWiIgZmlsbD0iIzhDOEM4QyIvPgo8cGF0aCBkPSJNMTYuODkzIDM0LjQ0OUwxNi43MzQyIDM0LjY0MjdWNDQuNTM2M0wxNi44OTMgNDQuOTk5OUwyOS43OTMxIDI2LjgzMjNMMTYuODkzIDM0LjQ0OVoiIGZpbGw9IiMzQzNDM0IiLz4KPHBhdGggZD0iTTE2Ljg5MjUgNDQuOTk5OVYzNC40NDlMNCAyNi44MzIzTDE2Ljg5MjUgNDQuOTk5OVoiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTE2Ljg5MyAzMi4wMTcyTDI5Ljc4NTIgMjQuMzk2NUwxNi44OTMgMTguNTM2NFYzMi4wMTcyWiIgZmlsbD0iIzE0MTQxNCIvPgo8cGF0aCBkPSJNNCAyNC4zOTY1TDE2Ljg5MjUgMzIuMDE3MlYxOC41MzY0TDQgMjQuMzk2NVoiIGZpbGw9IiMzOTM5MzkiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzMuNzkzMSIgaGVpZ2h0PSI0OS45OTk5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldCBkeT0iMSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==",
  //               amount: 1.3704002768485408,
  //               fiatAmount: {
  //                 value: 58164.952121745235,
  //                 display: "$581.65",
  //                 major: 581.6495212174524,
  //                 __typename: "ValueDisplay",
  //               },
  //               __typename: "AssetBalanceType",
  //             },
  //             {
  //               name: "USD Coin",
  //               code: "USDC",
  //               logoImage:
  //                 "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIHZpZXdCb3g9IjAgMCA1MSA1MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBkPSJNMjUuNSA0NkMzNy40MTQ3IDQ2IDQ3IDM2LjQxNDcgNDcgMjQuNUM0NyAxMi41ODUzIDM3LjQxNDcgMyAyNS41IDNDMTMuNTg1MyAzIDQgMTIuNTg1MyA0IDI0LjVDNCAzNi40MTQ3IDEzLjU4NTMgNDYgMjUuNSA0NloiIGZpbGw9IiMyNzc1Q0EiLz4KPHBhdGggZD0iTTMxLjgyNSAyNy45MTdDMzEuODI1IDI0Ljc5NDYgMjkuOTcxOCAyMy43MjQxIDI2LjI2NTUgMjMuMjc4MUMyMy42MTggMjIuOTIxMiAyMy4wODg2IDIyLjIwNzYgMjMuMDg4NiAyMC45NTg1QzIzLjA4ODYgMTkuNzA5NCAyMy45NzExIDE4LjkwNjcgMjUuNzM2IDE4LjkwNjdDMjcuMzI0NCAxOC45MDY3IDI4LjIwNyAxOS40NDIgMjguNjQ4MSAyMC43ODAxQzI4LjczNjQgMjEuMDQ3OCAyOS4wMDEyIDIxLjIyNjEgMjkuMjY1OSAyMS4yMjYxSDMwLjY3NzdDMzEuMDMwOCAyMS4yMjYxIDMxLjI5NTUgMjAuOTU4NSAzMS4yOTU1IDIwLjYwMThWMjAuNTEyNUMzMC45NDI1IDE4LjU0OTggMjkuMzU0IDE3LjAzMzMgMjcuMzI0NCAxNi44NTQ5VjE0LjcxMzhDMjcuMzI0NCAxNC4zNTY5IDI3LjA1OTcgMTQuMDg5MyAyNi42MTg1IDE0SDI1LjI5NDhDMjQuOTQxNyAxNCAyNC42NzcgMTQuMjY3NiAyNC41ODg3IDE0LjcxMzhWMTYuNzY1NkMyMS45NDEzIDE3LjEyMjUgMjAuMjY0NyAxOC45MDY3IDIwLjI2NDcgMjEuMTM3QzIwLjI2NDcgMjQuMDgxIDIyLjAyOTYgMjUuMjQwNiAyNS43MzYgMjUuNjg2OEMyOC4yMDcgMjYuMTMyOCAyOS4wMDEyIDI2LjY2ODEgMjkuMDAxMiAyOC4wOTU1QzI5LjAwMTIgMjkuNTIzIDI3Ljc2NTYgMzAuNTA0MiAyNi4wODkgMzAuNTA0MkMyMy43OTQ1IDMwLjUwNDIgMjMuMDAwMyAyOS41MjI4IDIyLjczNTUgMjguMTg0NkMyMi42NDc0IDI3LjgyNzkgMjIuMzgyNyAyNy42NDkzIDIyLjExNzkgMjcuNjQ5M0gyMC42MTc2QzIwLjI2NDcgMjcuNjQ5MyAyMCAyNy45MTcgMjAgMjguMjczOVYyOC4zNjMyQzIwLjM1MjggMzAuNTkzMyAyMS43NjQ5IDMyLjE5OTEgMjQuNjc3IDMyLjY0NTNWMzQuNzg2NEMyNC42NzcgMzUuMTQzMSAyNC45NDE4IDM1LjQxMDcgMjUuMzgyOSAzNS41SDI2LjcwNjZDMjcuMDU5NyAzNS41IDI3LjMyNDQgMzUuMjMyNCAyNy40MTI3IDM0Ljc4NjRWMzIuNjQ1M0MzMC4wNjAxIDMyLjE5OTEgMzEuODI1IDMwLjMyNTcgMzEuODI1IDI3LjkxN1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMC41Njg2IDM3LjIwMTZDMTMuNiAzNC42Nzg5IDEwLjAyNjMgMjYuODQwMSAxMi42MTczIDE5LjkwMjFDMTMuOTU3NCAxNi4xMTc5IDE2LjkwNTcgMTMuMjM0NyAyMC41Njg2IDExLjg4MzJDMjAuOTI2IDExLjcwMyAyMS4xMDQ3IDExLjQzMjcgMjEuMTA0NyAxMC45ODIxVjkuNzIwNzRDMjEuMTA0NyA5LjM2MDI2IDIwLjkyNiA5LjA4OTk2IDIwLjU2ODYgOUMyMC40NzkyIDkgMjAuMzAwNiA5IDIwLjIxMTIgOS4wODk5NkMxMS43MjM5IDExLjc5MyA3LjA3ODA1IDIwLjg5MzQgOS43NTgyOCAyOS40NTNDMTEuMzY2NCAzNC40OTg2IDE1LjIwODEgMzguMzczIDIwLjIxMTIgMzkuOTk0OUMyMC41Njg2IDQwLjE3NSAyMC45MjYgMzkuOTk0OSAyMS4wMTUyIDM5LjYzNDRDMjEuMTA0NyAzOS41NDQ0IDIxLjEwNDcgMzkuNDU0MyAyMS4xMDQ3IDM5LjI3NDFWMzguMDEyNkMyMS4xMDQ3IDM3Ljc0MjMgMjAuODM2NiAzNy4zODIgMjAuNTY4NiAzNy4yMDE2Wk0zMC4wMzg4IDkuMDg5OTZDMjkuNjgxNCA4LjkwOTgzIDI5LjMyNCA5LjA4OTk2IDI5LjIzNDggOS40NTA0NEMyOS4xNDUzIDkuNTQwNjEgMjkuMTQ1MyA5LjYzMDU3IDI5LjE0NTMgOS44MTA5MVYxMS4wNzIzQzI5LjE0NTMgMTEuNDMyNyAyOS40MTM0IDExLjc5MyAyOS42ODE0IDExLjk3MzRDMzYuNjUgMTQuNDk2MSA0MC4yMjM3IDIyLjMzNDkgMzcuNjMyNyAyOS4yNzI5QzM2LjI5MjYgMzMuMDU3MSAzMy4zNDQzIDM1Ljk0MDMgMjkuNjgxNCAzNy4yOTE4QzI5LjMyNCAzNy40NzIgMjkuMTQ1MyAzNy43NDIzIDI5LjE0NTMgMzguMTkyOVYzOS40NTQzQzI5LjE0NTMgMzkuODE0NyAyOS4zMjQgNDAuMDg1IDI5LjY4MTQgNDAuMTc1QzI5Ljc3MDggNDAuMTc1IDI5Ljk0OTQgNDAuMTc1IDMwLjAzODggNDAuMDg1QzM4LjUyNjEgMzcuMzgyIDQzLjE3MiAyOC4yODE2IDQwLjQ5MTcgMTkuNzIyQzM4Ljg4MzYgMTQuNTg2MiAzNC45NTI0IDEwLjcxMTggMzAuMDM4OCA5LjA4OTk2WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K",
  //               amount: 1000,
  //               fiatAmount: {
  //                 value: 19355.439250003175,
  //                 display: "$193.55",
  //                 major: 193.55439250003175,
  //                 __typename: "ValueDisplay",
  //               },
  //               __typename: "AssetBalanceType",
  //             },
  //           ],
  //         },
  //       },
  //       {
  //         addTypename: true,
  //       }
  //     );
  //     const { getByText } = render(
  //       <MockedProvider mocks={[mockMyAssets]}>
  //         <MyAssetsWidgetContainer />
  //       </MockedProvider>
  //     );
  //     await waitFor(() => {
  //       // expect(container.querySelector("#cryptocurrencylist")?.childNodes.length).toBe(3);

  //       expect(getByText("USD Coin")).toBeInTheDocument();
  //       expect(getByText("Ethereum")).toBeInTheDocument();
  //       expect(getByText("193.55")).toBeInTheDocument();
  //       // expect(getByText("MXN$")).toBeInTheDocument();
  //       expect(getByText("Bitcoin")).toBeInTheDocument();
  //     });
  //   });
});
