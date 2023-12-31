import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import createApolloMock from "generated/createApolloMock";
import { GetMarketTopMoversListDocument } from "generated/graphql";
import { Etx } from "./Etx";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { PortfolioCompositionData } from "__fixtures__/etxAssets";

export default {
  title: "Pages/Etx",
  component: Etx,
  decorators: [withPadding],
  parameters: {
    storyshots: false,
  },
} as Meta;

const cryptoCurrencyListMock = createApolloMock(
  GetMarketTopMoversListDocument,
  {
    variables: {
      limit: 4,
    },
  },
  {
    data: {
      getMarketList: {
        assets: [
          {
            currency: "USD",
            name: "USD Coin",
            code: "USDC",
            logoImage:
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0Ljk5OTYgMjkuNTQ1QzIzLjA2MDIgMjkuNTQ1IDI5LjU0NSAyMy4wNjAyIDI5LjU0NSAxNC45OTk2QzI5LjU0NSA2LjkzODkgMjMuMDYwMiAwLjQ1NDEwMiAxNC45OTk2IDAuNDU0MTAyQzYuOTM4OSAwLjQ1NDEwMiAwLjQ1NDEwMiA2LjkzODkgMC40NTQxMDIgMTQuOTk5NkMwLjQ1NDEwMiAyMy4wNjAyIDYuOTM4OSAyOS41NDUgMTQuOTk5NiAyOS41NDVaIiBmaWxsPSIjMjc3NUNBIi8+CjxwYXRoIGQ9Ik0xOS4yNzgzIDE3LjMxMDhDMTkuMjc4MyAxNS4xOTg0IDE4LjAyNDYgMTQuNDc0MiAxNS41MTcxIDE0LjE3MjVDMTMuNzI2IDEzLjkzMSAxMy4zNjc4IDEzLjQ0ODIgMTMuMzY3OCAxMi42MDMxQzEzLjM2NzggMTEuNzU4MSAxMy45NjQ5IDExLjIxNSAxNS4xNTg5IDExLjIxNUMxNi4yMzM1IDExLjIxNSAxNi44MzA2IDExLjU3NzIgMTcuMTI5MSAxMi40ODI1QzE3LjE4ODggMTIuNjYzNiAxNy4zNjc5IDEyLjc4NDIgMTcuNTQ3IDEyLjc4NDJIMTguNTAyMkMxOC43NDEgMTIuNzg0MiAxOC45MjAxIDEyLjYwMzEgMTguOTIwMSAxMi4zNjE4VjEyLjMwMTRDMTguNjgxMyAxMC45NzM2IDE3LjYwNjYgOS45NDc2IDE2LjIzMzUgOS44MjY5NFY4LjM3ODQ0QzE2LjIzMzUgOC4xMzY5NyAxNi4wNTQ0IDcuOTU1OTEgMTUuNzU2IDcuODk1NTFIMTQuODYwNEMxNC42MjE2IDcuODk1NTEgMTQuNDQyNSA4LjA3NjU3IDE0LjM4MjcgOC4zNzg0NFY5Ljc2NjU0QzEyLjU5MTcgMTAuMDA4IDExLjQ1NzQgMTEuMjE1IDExLjQ1NzQgMTIuNzI0QzExLjQ1NzQgMTQuNzE1NiAxMi42NTE0IDE1LjUwMDIgMTUuMTU4OSAxNS44MDJDMTYuODMwNiAxNi4xMDM4IDE3LjM2NzkgMTYuNDY1OSAxNy4zNjc5IDE3LjQzMTZDMTcuMzY3OSAxOC4zOTczIDE2LjUzMiAxOS4wNjEyIDE1LjM5NzcgMTkuMDYxMkMxMy44NDU0IDE5LjA2MTIgMTMuMzA4MSAxOC4zOTcyIDEzLjEyOSAxNy40OTE5QzEzLjA2OTQgMTcuMjUwNSAxMi44OTAzIDE3LjEyOTcgMTIuNzExMiAxNy4xMjk3SDExLjY5NjFDMTEuNDU3NCAxNy4xMjk3IDExLjI3ODMgMTcuMzEwOCAxMS4yNzgzIDE3LjU1MjNWMTcuNjEyN0MxMS41MTcgMTkuMTIxNCAxMi40NzIzIDIwLjIwNzggMTQuNDQyNSAyMC41MDk3VjIxLjk1ODJDMTQuNDQyNSAyMi4xOTk1IDE0LjYyMTYgMjIuMzgwNiAxNC45MiAyMi40NDFIMTUuODE1NkMxNi4wNTQ0IDIyLjQ0MSAxNi4yMzM1IDIyLjI1OTkgMTYuMjkzMyAyMS45NTgyVjIwLjUwOTdDMTguMDg0MyAyMC4yMDc4IDE5LjI3ODMgMTguOTQwNCAxOS4yNzgzIDE3LjMxMDhaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTEuNjYzNSAyMy41OTNDNi45NDg5NyAyMS44ODYzIDQuNTMxMjQgMTYuNTgzMSA2LjI4NDE2IDExLjg4OTNDNy4xOTA3OSA5LjMyOTE1IDkuMTg1MzggNy4zNzg1OSAxMS42NjM1IDYuNDY0MjRDMTEuOTA1MyA2LjM0MjM3IDEyLjAyNjEgNi4xNTk1IDEyLjAyNjEgNS44NTQ2MlY1LjAwMTI4QzEyLjAyNjEgNC43NTc0IDExLjkwNTMgNC41NzQ1MyAxMS42NjM1IDQuNTEzNjdDMTEuNjAzIDQuNTEzNjcgMTEuNDgyMSA0LjUxMzY3IDExLjQyMTYgNC41NzQ1M0M1LjY3OTY5IDYuNDAzMjMgMi41MzY2NSAxMi41NiA0LjM0OTkxIDE4LjM1MDhDNS40Mzc4NyAyMS43NjQzIDguMDM2OTMgMjQuMzg1NSAxMS40MjE2IDI1LjQ4MjdDMTEuNjYzNSAyNS42MDQ2IDExLjkwNTMgMjUuNDgyNyAxMS45NjU2IDI1LjIzODhDMTIuMDI2MSAyNS4xNzggMTIuMDI2MSAyNS4xMTcgMTIuMDI2MSAyNC45OTUxVjI0LjE0MTZDMTIuMDI2MSAyMy45NTg3IDExLjg0NDggMjMuNzE1IDExLjY2MzUgMjMuNTkzWk0xOC4wNzA0IDQuNTc0NTNDMTcuODI4NiA0LjQ1MjY3IDE3LjU4NjcgNC41NzQ1MyAxNy41MjY0IDQuODE4NDFDMTcuNDY1OSA0Ljg3OTQxIDE3LjQ2NTkgNC45NDAyNyAxNy40NjU5IDUuMDYyMjhWNS45MTU2M0MxNy40NjU5IDYuMTU5NSAxNy42NDcyIDYuNDAzMjMgMTcuODI4NiA2LjUyNTI0QzIyLjU0MyA4LjIzMTkzIDI0Ljk2MDggMTMuNTM1MiAyMy4yMDc5IDE4LjIyODlDMjIuMzAxMiAyMC43ODkxIDIwLjMwNjYgMjIuNzM5NyAxNy44Mjg2IDIzLjY1NEMxNy41ODY3IDIzLjc3NTkgMTcuNDY1OSAyMy45NTg4IDE3LjQ2NTkgMjQuMjYzNlYyNS4xMTdDMTcuNDY1OSAyNS4zNjA5IDE3LjU4NjcgMjUuNTQzNyAxNy44Mjg2IDI1LjYwNDZDMTcuODg5IDI1LjYwNDYgMTguMDA5OSAyNS42MDQ2IDE4LjA3MDQgMjUuNTQzN0MyMy44MTIzIDIzLjcxNSAyNi45NTU0IDE3LjU1ODMgMjUuMTQyMSAxMS43Njc1QzI0LjA1NDEgOC4yOTI5NCAyMS4zOTQ2IDUuNjcxNzUgMTguMDcwNCA0LjU3NDUzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==",
            price: 1.0020588253471079,
            percentChangeOverPeriod: -0.053636328518541394,
            __typename: "AssetMetricType",
          },
          {
            currency: "USD",
            name: "Bitcoin",
            code: "BTC",
            logoImage:
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI5LjEwOTYgMTguNTE4MkMyNy4xNjY3IDI2LjMxMDUgMTkuMjczNiAzMS4wNTI3IDExLjQ3OTYgMjkuMTA5NUMzLjY4ODc5IDI3LjE2NjkgLTEuMDUzOTUgMTkuMjc0MSAwLjg4OTc2MyAxMS40ODI0QzIuODMxNzcgMy42ODkyOSAxMC43MjQ5IC0xLjA1MzMgMTguNTE2NSAwLjg4OTM1MUMyNi4zMSAyLjgzMiAzMS4wNTI3IDEwLjcyNTUgMjkuMTA5NiAxOC41MTgyWiIgZmlsbD0iI0Y3OTMxQSIvPgo8cGF0aCBkPSJNMjEuOTA0MyAxMy4wMTYyQzIyLjIgMTEuMTE1MiAyMC42OTQ3IDEwLjA5MzMgMTguNjM2NCA5LjQxMTYyTDE5LjMwNDEgNi44MzY1M0wxNy42NzM4IDYuNDQ1OTRMMTcuMDIzOCA4Ljk1MzIyQzE2LjU5NTEgOC44NTA0NCAxNi4xNTUgOC43NTM2IDE1LjcxNzUgOC42NTc1OUwxNi4zNzIzIDYuMTMzNzZMMTQuNzQzIDUuNzQzMTZMMTQuMDc0OCA4LjMxNzQxQzEzLjcyMDIgOC4yMzk3NyAxMy4zNzE4IDguMTYzMDMgMTMuMDMzOCA4LjA4MjE4TDEzLjAzNTcgOC4wNzQwOEwxMC43ODc1IDcuNTM0MjdMMTAuMzUzOCA5LjIwODVDMTAuMzUzOCA5LjIwODUgMTEuNTYzMyA5LjQ3NTA4IDExLjUzNzggOS40OTE0OUMxMi4xOTggOS42NDk5MiAxMi4zMTc0IDEwLjA3MDEgMTIuMjk3NiAxMC40MDMyTDExLjUzNyAxMy4zMzY4QzExLjU4MjQgMTMuMzQ3OSAxMS42NDE0IDEzLjM2NCAxMS43MDY1IDEzLjM4OTFDMTEuNjUyMSAxMy4zNzYxIDExLjU5NDIgMTMuMzYxOSAxMS41MzQxIDEzLjM0ODFMMTAuNDY4IDE3LjQ1NzdDMTAuMzg3MyAxNy42NTA2IDEwLjE4MjUgMTcuOTQgOS43MjA5NCAxNy44MzAxQzkuNzM3MjggMTcuODUyOCA4LjUzNTk5IDE3LjU0NTggOC41MzU5OSAxNy41NDU4TDcuNzI2NTYgMTkuMzQwMUw5Ljg0ODE4IDE5Ljg0ODZDMTAuMjQyOSAxOS45NDM4IDEwLjYyOTYgMjAuMDQzMyAxMS4wMTA1IDIwLjEzN0wxMC4zMzU5IDIyLjc0MTZMMTEuOTY0MyAyMy4xMzIyTDEyLjYzMjUgMjAuNTU1MkMxMy4wNzczIDIwLjY3MTMgMTMuNTA5MSAyMC43Nzg0IDEzLjkzMTcgMjAuODc5NEwxMy4yNjU5IDIzLjQ0NDJMMTQuODk2MyAyMy44MzQ4TDE1LjU3MDggMjEuMjM1MUMxOC4zNTA5IDIxLjc0MSAyMC40NDEzIDIxLjUzNyAyMS4zMjEyIDE5LjExOTNDMjIuMDMwMiAxNy4xNzI4IDIxLjI4NTkgMTYuMDUgMTkuODIzMyAxNS4zMTc4QzIwLjg4ODYgMTUuMDgxNiAyMS42OTA5IDE0LjQwOCAyMS45MDQ5IDEzLjAxNjRMMjEuOTA0NCAxMy4wMTZMMjEuOTA0MyAxMy4wMTYyWk0xOC4xNzk0IDE4LjAzODNDMTcuNjc1NSAxOS45ODQ4IDE0LjI2NjkgMTguOTMyNiAxMy4xNjE3IDE4LjY2ODdMMTQuMDU3IDE1LjIxODFDMTUuMTYyMSAxNS40ODMzIDE4LjcwNTkgMTYuMDA4MyAxOC4xNzk0IDE4LjAzODNIMTguMTc5NFpNMTguNjgzNiAxMi45ODhDMTguMjI0IDE0Ljc1ODYgMTUuMzg2OSAxMy44NTkgMTQuNDY2NiAxMy42Mzg0TDE1LjI3ODIgMTAuNTA4OUMxNi4xOTg2IDEwLjcyOTUgMTkuMTYyNCAxMS4xNDExIDE4LjY4MzcgMTIuOTg4SDE4LjY4MzZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",
            price: 50658.654452962626,
            percentChangeOverPeriod: -0.860836563460811,
            __typename: "AssetMetricType",
          },
          {
            currency: "USD",
            name: "Ethereum",
            code: "ETH",
            logoImage:
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAxOSAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuNTUyNjEgMC40NTQxMDJMOS4zNTc0MiAxLjExNzEyVjIwLjM1NDZMOS41NTI2MSAyMC41NDk0TDE4LjQ4MjMgMTUuMjcxTDkuNTUyNjEgMC40NTQxMDJaIiBmaWxsPSIjMzQzNDM0Ii8+CjxwYXRoIGQ9Ik05LjU1MjkzIDAuNDU0MTAyTDAuNjIzMDQ3IDE1LjI3MUw5LjU1MjkzIDIwLjU0OTRWMTEuMjEyVjAuNDU0MTAyWiIgZmlsbD0iIzhDOEM4QyIvPgo8cGF0aCBkPSJNOS41NTIzOSAyMi4yMzc2TDkuNDQyMzggMjIuMzcxN1YyOS4yMjQ0TDkuNTUyMzkgMjkuNTQ1NkwxOC40ODc1IDE2Ljk2MTlMOS41NTIzOSAyMi4yMzc2WiIgZmlsbD0iIzNDM0MzQiIvPgo8cGF0aCBkPSJNOS41NTE5NiAyOS41NDU2VjIyLjIzNzZMMC42MjIwNyAxNi45NjE5TDkuNTUxOTYgMjkuNTQ1NloiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTkuNTUyNzMgMjAuNTUyMkwxOC40ODI0IDE1LjI3MzhMOS41NTI3MyAxMS4yMTQ4VjIwLjU1MjJaIiBmaWxsPSIjMTQxNDE0Ii8+CjxwYXRoIGQ9Ik0wLjYyMjA3IDE1LjI3MzhMOS41NTE5NiAyMC41NTIyVjExLjIxNDhMMC42MjIwNyAxNS4yNzM4WiIgZmlsbD0iIzM5MzkzOSIvPgo8L3N2Zz4K",
            price: 4364.224432810412,
            percentChangeOverPeriod: -0.051879723151059,
            __typename: "AssetMetricType",
          },
          {
            currency: "USD",
            name: "Tether",
            code: "USDT",
            logoImage:
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyOCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01LjM1NzQ4IDAuMjk3NzI5TDAuMzg0NzAyIDEwLjcwNDJDMC4zNjU3NzkgMTAuNzQyOSAwLjM1OTc4MyAxMC43ODY3IDAuMzY3NTg5IDEwLjgyOUMwLjM3NTM5NiAxMC44NzEzIDAuMzk2NTk2IDEwLjkxMDEgMC40MjgwOSAxMC45Mzk2TDEzLjg1ODQgMjMuNzYxMkMxMy44OTY1IDIzLjc5NzYgMTMuOTQ3MyAyMy44MTggMTQuMDAwMiAyMy44MThDMTQuMDUzIDIzLjgxOCAxNC4xMDM4IDIzLjc5NzYgMTQuMTQyIDIzLjc2MTJMMjcuNTcyMyAxMC45NDA0QzI3LjYwMzggMTAuOTEwOSAyNy42MjUgMTAuODcyMSAyNy42MzI4IDEwLjgyOThDMjcuNjQwNiAxMC43ODc1IDI3LjYzNDYgMTAuNzQzNyAyNy42MTU3IDEwLjcwNUwyMi42NDI5IDAuMjk4NTI5QzIyLjYyNjggMC4yNjM1OCAyMi42MDEgMC4yMzM5NzMgMjIuNTY4NSAwLjIxMzI0OEMyMi41MzYxIDAuMTkyNTIyIDIyLjQ5ODMgMC4xODE1NTUgMjIuNDU5NyAwLjE4MTY1Nkg1LjU0MjI4QzUuNTAzNTIgMC4xODExNzYgNS40NjU0NSAwLjE5MTg3OSA1LjQzMjY2IDAuMjEyNDc1QzUuMzk5ODcgMC4yMzMwNzEgNS4zNzM3NiAwLjI2MjY3OSA1LjM1NzQ4IDAuMjk3NzI5WiIgZmlsbD0iIzUwQUY5NSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1LjcyNTMgMTEuNzcyMkMxNS42Mjg5IDExLjc3OTQgMTUuMTMwOCAxMS44MDkgMTQuMDE5NSAxMS44MDlDMTMuMTM1NyAxMS44MDkgMTIuNTA4MiAxMS43ODI2IDEyLjI4OCAxMS43NzIyQzguODcyNDIgMTEuNjIyNSA2LjMyMjk1IDExLjAzMDEgNi4zMjI5NSAxMC4zMjA5QzYuMzIyOTUgOS42MTE2NSA4Ljg3MjQyIDkuMDIwMDggMTIuMjg4IDguODY3OThWMTEuMTgyMkMxMi41MTE0IDExLjE5ODIgMTMuMTUxIDExLjIzNTkgMTQuMDM0OCAxMS4yMzU5QzE1LjA5NTQgMTEuMjM1OSAxNS42MjY1IDExLjE5MTggMTUuNzIyMSAxMS4xODNWOC44Njk1OEMxOS4xMzA1IDkuMDIwODggMjEuNjc0NCA5LjYxMzI1IDIxLjY3NDQgMTAuMzIwOUMyMS42NzQ0IDExLjAyODUgMTkuMTMxMyAxMS42MjA5IDE1LjcyMjEgMTEuNzcxNEwxNS43MjUzIDExLjc3MjJaTTE1LjcyNTMgOC42MzAyM1Y2LjU1OTM0SDIwLjQ4MlYzLjQwMTM3SDcuNTMxNFY2LjU1OTM0SDEyLjI4NzJWOC42Mjk0M0M4LjQyMTY2IDguODA2MzQgNS41MTQ2NSA5LjU2OTIyIDUuNTE0NjUgMTAuNDgzNEM1LjUxNDY1IDExLjM5NzYgOC40MjE2NiAxMi4xNTk2IDEyLjI4NzIgMTIuMzM3M1YxOC45NzM1SDE1LjcyNDVWMTIuMzM0OUMxOS41ODEzIDEyLjE1OCAyMi40ODM1IDExLjM5NiAyMi40ODM1IDEwLjQ4MjZDMjIuNDgzNSA5LjU2OTIyIDE5LjU4MzcgOC44MDcxNCAxNS43MjQ1IDguNjI5NDNMMTUuNzI1MyA4LjYzMDIzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==",
            price: 1.0041006537340584,
            percentChangeOverPeriod: -0.014137918359466527,
            __typename: "AssetMetricType",
          },
        ],
        __typename: "AssetMarketMetricList",
      },
    },
  }
);

const Template: Story<{ mocks: ReadonlyArray<MockedResponse> }> = ({ mocks }) => {
  const history = createMemoryHistory();
  history.location.state = {
    totalInvestment: 1234,
    month: 12,
    sixMonth: 33,
    twelveMonth: 44,
    lastRebalance: null,
    portfolioData: PortfolioCompositionData,
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjkiIHZpZXdCb3g9IjAgMCAyOCAyOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4Ljc2NDciIHJ4PSIxNCIgZmlsbD0iIzRBQzZGOCIvPgo8cGF0aCBkPSJNMjIuNTkzIDkuNzE1NjhIMjIuNTMyOEwxNC42NDc4IDUuMTM1NDFDMTQuNDkxOCA1LjA0Njc5IDE0LjMxMzUgNSAxNC4xMzE4IDVDMTMuOTUwMiA1IDEzLjc3MTkgNS4wNDY3OSAxMy42MTU5IDUuMTM1NDFMNS42MDE5MiA5Ljc4MTExTDUuNTE1OTMgOS44MzgzN0M1LjM2MjEyIDkuOTAyMjIgNS4yMzEzMSAxMC4wMDc1IDUuMTM5NjMgMTAuMTQxMkM1LjA0Nzk2IDEwLjI3NDkgNC45OTk0MiAxMC40MzEyIDUuMDAwMDEgMTAuNTkwOFYxOC41ODk5QzUuMDAwNzUgMTguNzY3NiA1LjA0OTM1IDE4Ljk0MiA1LjE0MTE4IDE5LjA5NjdDNS4yMzMwMSAxOS4yNTEzIDUuMzY1IDE5LjM4MSA1LjUyNDUzIDE5LjQ3MzNMMTMuNDE4MSAyNC4wMjlDMTMuNTg4NSAyNC4xMjU1IDEzLjc4MzEgMjQuMTc2NSAxMy45ODE0IDI0LjE3NjVDMTQuMTc5NiAyNC4xNzY1IDE0LjM3NDIgMjQuMTI1NSAxNC41NDQ2IDI0LjAyOUwyMi41ODQ0IDE5LjM4MzNDMjIuNzQ1NSAxOS4yOTIgMjIuODc5MiAxOS4xNjI4IDIyLjk3MjYgMTkuMDA4MUMyMy4wNjU5IDE4Ljg1MzQgMjMuMTE1OSAxOC42Nzg0IDIzLjExNzUgMTguNVYxMC40ODQ1QzIzLjEyMDggMTAuMzIxMiAyMy4wNzI2IDEwLjE2MDcgMjIuOTc5MSAxMC4wMjM2QzIyLjg4NTYgOS44ODY2MiAyMi43NTExIDkuNzc5MzYgMjIuNTkzIDkuNzE1NjhWOS43MTU2OFpNMTMuMTQzIDIxLjk4NDNMNi43MjgzNSAxOC4yNTQ2VjEyLjAzMDRMMTMuMTQzIDE1LjcyNzNWMjEuOTg0M1pNMTQuMDAyOSAxNC4zMzY4TDcuNTI4MDMgMTAuNTgyN0wxNC4xMzE4IDYuNzU0ODdMMjAuNjA2NyAxMC40ODQ1TDE0LjAwMjkgMTQuMzM2OFpNMjEuNDE0OSAxOC4xODkyTDE0Ljg3MTMgMjEuOTY3OVYxNS43NTE4TDIxLjQxNDkgMTEuOTczMVYxOC4xODkyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==",
    blockName: "Block X",
  };
  return (
    <Router history={history}>
      <MockedProvider mocks={mocks ?? [cryptoCurrencyListMock]}>
        <Etx />
      </MockedProvider>
    </Router>
  );
};

export const Primary = Template.bind({});
